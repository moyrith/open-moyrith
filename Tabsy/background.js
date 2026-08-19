/* ═══════════════════════════════════════════════════
   Tabsy — background.js (Free Version)
   Service worker: meta-fetch, omnibox, commands
   ═══════════════════════════════════════════════════ */

'use strict';

const TAB_GROUP_COLORS = ['grey','blue','red','yellow','green','pink','purple','cyan','orange'];

// ─── Message Handlers ────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'FETCH_PAGE_META') {
    fetchPageMeta(msg.url).then(sendResponse).catch(err => {
      console.warn('[Tabsy] Meta fetch failed:', err.message);
      sendResponse(null);
    });
    return true;
  }
});

// ─── Omnibox ─────────────────────────────────────────────────────────────────
chrome.omnibox.onInputStarted.addListener(() => {
  chrome.omnibox.setDefaultSuggestion({ description: 'Search Tabsy groups and tools…' });
});

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  const query = text.toLowerCase().trim();
  if (!query) { suggest([]); return; }

  try {
    const { groups = [] } = await chrome.storage.local.get(['groups']);
    const results = [];
    for (const w of groups) {
      if (w.name.toLowerCase().includes(query)) {
        const count = w.tools?.length || 0;
        results.push({
          content: `group:${w.id}`,
          description: `${w.emoji} <match>${escXml(w.name)}</match> — ${count} tool${count !== 1 ? 's' : ''} <dim>(open all)</dim>`,
        });
      }
      if (Array.isArray(w.tools)) {
        for (const t of w.tools) {
          if (t.name.toLowerCase().includes(query) || t.url.toLowerCase().includes(query)) {
            results.push({
              content: t.url,
              description: `${escXml(t.name)} <dim>in ${w.emoji} ${escXml(w.name)}</dim> — <url>${escXml(t.url)}</url>`,
            });
          }
        }
      }
    }
    suggest(results.slice(0, 8));
  } catch (_) { suggest([]); }
});

chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
  if (text.startsWith('group:')) {
    const grpId = text.slice(9);
    try {
      const { groups = [], settings = {} } = await chrome.storage.local.get(['groups', 'settings']);
      const grp = groups.find(w => w.id === grpId);
      if (!grp?.tools?.length) return;

      const urls   = grp.tools.map(t => t.url).filter(Boolean);
      const tabs   = await Promise.all(urls.map(url => chrome.tabs.create({ url, active: false })));
      const tabIds = tabs.map(t => t.id);

      if (settings.tabGroupEnabled !== false) {
        try {
          const tabGroupId = await chrome.tabs.group({ tabIds });
          const ci = grp.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % TAB_GROUP_COLORS.length;
          await chrome.tabGroups.update(tabGroupId, { title: `${grp.emoji} ${grp.name}`, color: TAB_GROUP_COLORS[ci], collapsed: false });
        } catch (_) {}
      }
      if (tabIds[0]) await chrome.tabs.update(tabIds[0], { active: true });
    } catch (_) {}
    return;
  }
  try {
    const url = text.startsWith('http') ? text : `https://${text}`;
    if (disposition === 'currentTab') {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) await chrome.tabs.update(tab.id, { url });
    } else await chrome.tabs.create({ url });
  } catch (_) {}
});

// ─── Meta Fetch ──────────────────────────────────────────────────────────────
async function fetchPageMeta(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let html = '';
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const reader = res.body.getReader();
    const chunks = [];
    let bytesRead = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      bytesRead += value.length;
      if (bytesRead >= 50 * 1024) { reader.cancel(); break; }
    }
    html = chunks.map(c => new TextDecoder('utf-8', { fatal: false }).decode(c, { stream: true })).join('');
  } finally { clearTimeout(timeout); }
  return parseMeta(html);
}

function parseMeta(html) {
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,120})["']/i)
    || html.match(/<meta[^>]+content=["']([^"']{1,120})["'][^>]+property=["']og:title["']/i);
  const titleTag = html.match(/<title[^>]*>([\s\S]{1,200}?)<\/title>/i);
  let rawTitle = ogTitle?.[1] ?? titleTag?.[1] ?? '';
  rawTitle = decodeHtmlEntities(rawTitle.trim()).replace(/\s*[\|–—\-]\s*.{2,40}$/, '').trim();
  const name = rawTitle.slice(0, 40);

  const descPatterns = [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,300})["']/i,
    /<meta[^>]+content=["']([^"']{1,300})["'][^>]+name=["']description["']/i,
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{1,300})["']/i,
    /<meta[^>]+content=["']([^"']{1,300})["'][^>]+property=["']og:description["']/i,
  ];
  let rawDesc = '';
  for (const p of descPatterns) { const m = html.match(p); if (m?.[1]?.trim()) { rawDesc = m[1].trim(); break; } }
  rawDesc = decodeHtmlEntities(rawDesc);
  let description = rawDesc.slice(0, 60);
  if (rawDesc.length > 60) {
    const ls = description.lastIndexOf(' ');
    if (ls > 40) description = description.slice(0, ls);
    description += '…';
  }
  return { name, description };
}

function decodeHtmlEntities(str) {
  return str.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"')
    .replace(/&#39;/g,"'").replace(/&apos;/g,"'").replace(/&#x27;/g,"'")
    .replace(/&ndash;/g,'–').replace(/&mdash;/g,'—').replace(/&nbsp;/g,' ')
    .replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi,(_,h)=>String.fromCharCode(parseInt(h,16)));
}

function escXml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ─── Commands ────────────────────────────────────────────────────────────────
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-tabsy') {
    if (chrome.action && chrome.action.openPopup) {
      chrome.action.openPopup().catch(err => console.warn('[Tabsy] openPopup failed:', err));
    }
  }
});