/* ═══════════════════════════════════════════════════════════
   Tabsy — popup.js (Free Version)
   Features: command palette, capture tabs, omnibar, crud
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ─── Constants ──────────────────────────────────────────────────────────────
const EMOJI_DATA = [
  { cat: 'frequent', icon: '⭐', label: 'Frequent', emojis: [
    { e: '🚀', k: 'rocket launch' }, { e: '🎨', k: 'art palette paint' }, { e: '💼', k: 'briefcase work business' },
    { e: '🔧', k: 'wrench tool fix' }, { e: '📊', k: 'chart graph data' }, { e: '📝', k: 'note write memo' },
    { e: '🎯', k: 'target goal focus' }, { e: '🌐', k: 'globe web internet' }, { e: '⚡', k: 'lightning bolt flash' },
    { e: '🔥', k: 'fire hot trending' }, { e: '💡', k: 'light bulb idea' }, { e: '🛠️', k: 'tools hammer build' },
    { e: '📌', k: 'pin pushpin' }, { e: '🗂️', k: 'folder files organize' }, { e: '🤖', k: 'robot ai bot' },
    { e: '✍️', k: 'write hand pen' },
  ]},
  { cat: 'smileys', icon: '😊', label: 'Smileys', emojis: [
    { e: '😀', k: 'grin happy' }, { e: '😊', k: 'smile blush' }, { e: '😎', k: 'cool sunglasses' },
    { e: '🤩', k: 'star struck excited' }, { e: '😍', k: 'love heart eyes' }, { e: '🤔', k: 'thinking hmm' },
    { e: '😂', k: 'laugh cry joy' }, { e: '🥳', k: 'party celebrate' }, { e: '😇', k: 'angel halo' },
    { e: '🤓', k: 'nerd glasses smart' }, { e: '😏', k: 'smirk' }, { e: '🫡', k: 'salute' },
    { e: '🙌', k: 'hands raised' }, { e: '👋', k: 'wave hello' }, { e: '👍', k: 'thumbs up good' },
    { e: '👏', k: 'clap applause' }, { e: '💪', k: 'muscle strong flex' }, { e: '🧠', k: 'brain smart think' },
    { e: '👀', k: 'eyes look see' }, { e: '❤️', k: 'heart love red' }, { e: '💜', k: 'purple heart' },
    { e: '💙', k: 'blue heart' }, { e: '💚', k: 'green heart' }, { e: '💛', k: 'yellow heart' },
  ]},
  { cat: 'objects', icon: '💻', label: 'Objects', emojis: [
    { e: '💻', k: 'laptop computer' }, { e: '🖥️', k: 'desktop monitor screen' }, { e: '📱', k: 'phone mobile' },
    { e: '⌨️', k: 'keyboard type' }, { e: '🖱️', k: 'mouse click' }, { e: '💾', k: 'floppy save disk' },
    { e: '📷', k: 'camera photo' }, { e: '🎬', k: 'movie film clapper' }, { e: '🎮', k: 'game controller play' },
    { e: '🎧', k: 'headphone audio music' }, { e: '🎵', k: 'music note song' }, { e: '🎤', k: 'microphone sing' },
    { e: '📚', k: 'books read study' }, { e: '📖', k: 'book open read' }, { e: '📰', k: 'newspaper news' },
    { e: '✏️', k: 'pencil draw edit' }, { e: '🖊️', k: 'pen write' }, { e: '📎', k: 'paperclip attach' },
    { e: '🔑', k: 'key password unlock' }, { e: '🔒', k: 'lock secure' }, { e: '🔓', k: 'unlock open' },
    { e: '📦', k: 'package box ship' }, { e: '💰', k: 'money bag rich' }, { e: '💳', k: 'credit card payment' },
    { e: '⏰', k: 'alarm clock time' }, { e: '📡', k: 'satellite antenna' }, { e: '🔋', k: 'battery power' },
    { e: '💎', k: 'gem diamond jewel' }, { e: '🧲', k: 'magnet attract' }, { e: '🧪', k: 'test tube lab science' },
    { e: '🔬', k: 'microscope science' }, { e: '🔭', k: 'telescope space' },
  ]},
  { cat: 'symbols', icon: '⚙️', label: 'Symbols', emojis: [
    { e: '⚙️', k: 'gear settings cog' }, { e: '🔗', k: 'link chain url' }, { e: '📈', k: 'chart up growth' },
    { e: '📉', k: 'chart down decline' }, { e: '✅', k: 'check done complete' }, { e: '❌', k: 'cross cancel no' },
    { e: '⚠️', k: 'warning alert caution' }, { e: '🚫', k: 'prohibited stop ban' }, { e: '♻️', k: 'recycle' },
    { e: '💬', k: 'speech bubble chat' }, { e: '💭', k: 'thought bubble think' }, { e: '🏷️', k: 'tag label' },
    { e: '🔔', k: 'bell notification alert' }, { e: '🕐', k: 'clock one time' }, { e: '⏳', k: 'hourglass timer' },
    { e: '🏆', k: 'trophy winner cup' }, { e: '🎖️', k: 'medal award' }, { e: '🏅', k: 'medal sports' },
    { e: '⭐', k: 'star favorite' }, { e: '🌟', k: 'glowing star sparkle' }, { e: '✨', k: 'sparkles magic' },
    { e: '🎉', k: 'party confetti celebrate' }, { e: '🎊', k: 'confetti ball' }, { e: '🎁', k: 'gift present' },
  ]},
  { cat: 'nature', icon: '🌿', label: 'Nature', emojis: [
    { e: '🌍', k: 'earth globe world' }, { e: '🌎', k: 'earth americas' }, { e: '🌏', k: 'earth asia' },
    { e: '☀️', k: 'sun sunny bright' }, { e: '🌙', k: 'moon crescent night' }, { e: '⛅', k: 'cloud sun weather' },
    { e: '🌈', k: 'rainbow color' }, { e: '🌊', k: 'wave ocean sea' }, { e: '🌿', k: 'herb plant leaf' },
    { e: '🌱', k: 'seedling sprout grow' }, { e: '🌻', k: 'sunflower flower' }, { e: '🍀', k: 'clover luck' },
    { e: '🐶', k: 'dog puppy' }, { e: '🐱', k: 'cat kitten' }, { e: '🦊', k: 'fox' },
    { e: '🦋', k: 'butterfly' }, { e: '🐝', k: 'bee honey' }, { e: '🦅', k: 'eagle bird' },
    { e: '🐙', k: 'octopus' }, { e: '🦈', k: 'shark' },
  ]},
  { cat: 'food', icon: '🍕', label: 'Food', emojis: [
    { e: '☕', k: 'coffee hot drink' }, { e: '🍵', k: 'tea green cup' }, { e: '🧃', k: 'juice box' },
    { e: '🍕', k: 'pizza slice' }, { e: '🍔', k: 'burger hamburger' }, { e: '🌮', k: 'taco' },
    { e: '🍜', k: 'noodles ramen soup' }, { e: '🍣', k: 'sushi' }, { e: '🍰', k: 'cake dessert' },
    { e: '🍩', k: 'donut doughnut' }, { e: '🍎', k: 'apple red fruit' }, { e: '🍋', k: 'lemon citrus' },
    { e: '🥑', k: 'avocado' }, { e: '🧁', k: 'cupcake' }, { e: '🍪', k: 'cookie' },
    { e: '🥤', k: 'cup straw drink' },
  ]},
  { cat: 'travel', icon: '✈️', label: 'Travel', emojis: [
    { e: '✈️', k: 'airplane plane travel fly' }, { e: '🚗', k: 'car automobile drive' },
    { e: '🚀', k: 'rocket space launch' }, { e: '🚂', k: 'train locomotive' },
    { e: '🚢', k: 'ship cruise boat' }, { e: '🏠', k: 'house home' },
    { e: '🏢', k: 'office building work' }, { e: '🏗️', k: 'construction build crane' },
    { e: '🏖️', k: 'beach vacation' }, { e: '⛰️', k: 'mountain climb' },
    { e: '🗺️', k: 'map world' }, { e: '🧭', k: 'compass direction navigate' },
    { e: '🚲', k: 'bike bicycle cycle' }, { e: '🛒', k: 'cart shopping' },
    { e: '🎪', k: 'circus tent' }, { e: '🏟️', k: 'stadium arena' },
  ]},
  { cat: 'flags', icon: '🏁', label: 'Flags', emojis: [
    { e: '🏁', k: 'checkered flag finish race' }, { e: '🚩', k: 'flag red triangular' },
    { e: '🏳️', k: 'white flag surrender' }, { e: '🏴', k: 'black flag' },
    { e: '🎌', k: 'crossed flags japan' }, { e: '🏴‍☠️', k: 'pirate flag' },
    { e: '🇺🇸', k: 'usa america flag' }, { e: '🇬🇧', k: 'uk britain flag' },
    { e: '🇯🇵', k: 'japan flag' }, { e: '🇩🇪', k: 'germany flag' },
    { e: '🇫🇷', k: 'france flag' }, { e: '🇪🇸', k: 'spain flag' },
    { e: '🇮🇹', k: 'italy flag' }, { e: '🇧🇷', k: 'brazil flag' },
    { e: '🇨🇳', k: 'china flag' }, { e: '🇰🇷', k: 'korea flag' },
  ]},
];

const COLORS = [
  { hex: '#141414', label: 'Noir'    },
  { hex: '#7B6EF6', label: 'Violet'  },
  { hex: '#F59E0B', label: 'Amber'   },
  { hex: '#10B981', label: 'Emerald' },
  { hex: '#F43F5E', label: 'Rose'    },
  { hex: '#0EA5E9', label: 'Sky'     },
  { hex: '#F97316', label: 'Orange'  },
  { hex: '#8B5CF6', label: 'Purple'  },
];

const TAB_GROUP_COLORS = ['grey','blue','red','yellow','green','pink','purple','cyan','orange'];
const TRANSITION_MS    = 250;

// ─── State ──────────────────────────────────────────────────────────────────
const state = {
  view:               'home',
  groups:             [],
  currentGroupId:     null,
  editingToolId:      null,
  theme:              'light',
  settings: {
    tabGroupEnabled:  true,
    dedupEnabled:     true,
  },
  undoStack:          [], 
  modal: {
    emoji: '🚀',
    color: '#141414',
  },
};

// ─── DOM Cache ───────────────────────────────────────────────────────────────
const DOM = {};

function cacheDOM() {
  DOM.viewHome            = document.getElementById('view-home');
  DOM.viewGroup           = document.getElementById('view-group');
  DOM.groupsGrid          = document.getElementById('groups-grid');
  DOM.homeEmpty           = document.getElementById('home-empty');
  DOM.toolsList           = document.getElementById('tools-list');
  DOM.groupEmpty          = document.getElementById('group-empty');
  DOM.groupTitleWrap      = document.getElementById('group-title-wrap');

  DOM.btnAddGroup         = document.getElementById('btn-add-group');
  DOM.btnBack             = document.getElementById('btn-back');
  DOM.btnAddTool          = document.getElementById('btn-add-tool');
  DOM.btnCaptureTabs      = document.getElementById('btn-capture-tabs');

  DOM.modalGroup          = document.getElementById('modal-group');
  DOM.modalGroupTitle     = document.getElementById('modal-group-title');
  DOM.modalTool           = document.getElementById('modal-tool');
  DOM.modalToolTitle      = document.getElementById('modal-tool-title');

  DOM.groupNameInput      = document.getElementById('group-name-input');
  DOM.emojiPickerWrap     = document.getElementById('emoji-picker-wrap');
  DOM.emojiPickerTrigger  = document.getElementById('emoji-picker-trigger');
  DOM.emojiPickerPreview  = document.getElementById('emoji-picker-preview');
  DOM.emojiDropdown       = document.getElementById('emoji-dropdown');
  DOM.emojiDdSearch       = document.getElementById('emoji-dd-search');
  DOM.emojiDdCategories   = document.getElementById('emoji-dd-categories');
  DOM.emojiDdGrid         = document.getElementById('emoji-dd-grid');
  DOM.emojiDdEmpty        = document.getElementById('emoji-dd-empty');
  DOM.colorPicker         = document.getElementById('color-picker');
  DOM.colorCustomBtn      = document.getElementById('color-custom-btn');
  DOM.colorCustomInput    = document.getElementById('color-custom-input');

  DOM.toolUrlInput        = document.getElementById('tool-url-input');
  DOM.toolNameInput       = document.getElementById('tool-name-input');
  DOM.toolDescInput       = document.getElementById('tool-desc-input');
  DOM.toolEditFields      = document.getElementById('tool-edit-fields');
  DOM.fetchIndicator      = document.getElementById('fetch-indicator');

  DOM.btnSaveGroup        = document.getElementById('btn-save-group');
  DOM.btnSaveTool         = document.getElementById('btn-save-tool');

  DOM.cmdPalette          = document.getElementById('cmd-palette');
  DOM.cmdSearch           = document.getElementById('cmd-search');
  DOM.cmdResults          = document.getElementById('cmd-results');
  DOM.cmdEmpty            = document.getElementById('cmd-empty');

  DOM.groupNotes          = document.getElementById('group-notes');
  DOM.notesToggle         = document.getElementById('notes-toggle');
  DOM.notesToggleLabel    = document.getElementById('notes-toggle-label');
  DOM.notesChevron        = document.getElementById('notes-chevron');
  DOM.notesBody           = document.getElementById('notes-body');
  DOM.notesTextarea       = document.getElementById('notes-textarea');
  DOM.notesCharcount      = document.getElementById('notes-charcount');

  DOM.toggleDedup         = document.getElementById('toggle-dedup');
  DOM.btnSettings         = document.getElementById('btn-settings');
  DOM.settingsOverlay     = document.getElementById('settings-overlay');
  DOM.btnCloseSettings    = document.getElementById('btn-close-settings');
  DOM.themeToggle         = document.getElementById('theme-toggle');
  DOM.themeToggleThumb    = document.getElementById('theme-toggle-thumb');
  DOM.toggleTabGroup      = document.getElementById('toggle-tab-group');

  DOM.btnResetData        = document.getElementById('btn-reset-data');
  DOM.resetConfirm        = document.getElementById('reset-confirm');
  DOM.btnResetCancel      = document.getElementById('btn-reset-cancel');
  DOM.btnResetConfirm     = document.getElementById('btn-reset-confirm');
}

// ─── Utilities ──────────────────────────────────────────────────────────────
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

function escHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function getDomain(url) {
  try { return new URL(url).hostname; } catch { return null; }
}

function normalizeUrl(url) {
  if (!url) return '';
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  return url;
}

function showToast(msg, type = 'default') {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

function shakeInput(el) {
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
  el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
}

// ─── Storage ────────────────────────────────────────────────────────────────
function loadData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['groups'], res => {
      if (chrome.runtime.lastError) { reject(chrome.runtime.lastError); return; }
      const raw = res.groups;
      if (!Array.isArray(raw)) { state.groups = []; }
      else {
        state.groups = raw.filter(w =>
          w && typeof w === 'object' && typeof w.id === 'string' && typeof w.name === 'string'
        ).map(w => ({
          ...w,
          emoji: typeof w.emoji === 'string' ? w.emoji : '🚀',
          color: typeof w.color === 'string' ? w.color : '#141414',
          tools: Array.isArray(w.tools)
            ? w.tools.filter(t => t && typeof t === 'object' && typeof t.id === 'string'
                && typeof t.name === 'string' && typeof t.url === 'string')
            : [],
        }));
      }
      resolve();
    });
  });
}

function saveData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ groups: state.groups }, () => {
      if (chrome.runtime.lastError) {
        showToast('⚠️ Save failed', 'error');
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}

// ─── Navigation ─────────────────────────────────────────────────────────────
let isTransitioning = false;

function navigateTo(view, groupId = null) {
  if (isTransitioning) return;
  if (state.view === view && groupId === null) return;

  isTransitioning = true;
  const from = state.view;
  const to   = view;

  const views = {
    home:      DOM.viewHome,
    group:     DOM.viewGroup,
  };

  state.view = to;
  if (groupId !== null) state.currentGroupId = groupId;

  if (to === 'home')      renderHome();
  if (to === 'group')     renderGroup();

  const order = ['home', 'group'];
  const fromIdx = order.indexOf(from);
  const toIdx   = order.indexOf(to);
  const goingRight = toIdx > fromIdx;

  const fromEl = views[from];
  const toEl   = views[to];

  if (fromEl && toEl && fromEl !== toEl) {
    Object.values(views).forEach(v => {
      if (v !== fromEl && v !== toEl) {
        v.classList.remove('active', 'enter-right', 'enter-left', 'exit-left', 'exit-right');
      }
    });

    fromEl.classList.remove('active');
    fromEl.classList.add(goingRight ? 'exit-left' : 'exit-right');

    toEl.classList.remove('active', 'exit-left', 'exit-right');
    toEl.classList.add(goingRight ? 'enter-right' : 'enter-left');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      toEl.classList.remove('enter-right', 'enter-left');
      toEl.classList.add('active');
    }));

    setTimeout(() => {
      fromEl.classList.remove('exit-left', 'exit-right');
      isTransitioning = false;
    }, TRANSITION_MS);
  } else {
    Object.entries(views).forEach(([name, el]) => {
      el.classList.toggle('active', name === to);
      el.classList.remove('enter-right', 'enter-left', 'exit-left', 'exit-right');
    });
    isTransitioning = false;
  }
}

// ─── Render: Home ────────────────────────────────────────────────────────────
function renderHome() {
  const grid  = DOM.groupsGrid;
  const empty = DOM.homeEmpty;

  if (!state.groups.length) {
    grid.innerHTML = '';
    grid.style.display = 'none';
    empty.classList.add('visible');
    return;
  }

  empty.classList.remove('visible');
  grid.style.display = 'grid';

  grid.innerHTML = state.groups.map((w, idx) => `
    <div class="group-card" data-id="${w.id}" data-index="${idx}"
         style="--card-accent:${escHtml(w.color)}" draggable="true">
      <div class="gc-top">
        <div class="gc-drag-handle" title="Drag to reorder">
          <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
            <circle cx="2.5" cy="2.5" r="1.5"/><circle cx="7.5" cy="2.5" r="1.5"/>
            <circle cx="2.5" cy="7" r="1.5"/><circle cx="7.5" cy="7" r="1.5"/>
            <circle cx="2.5" cy="11.5" r="1.5"/><circle cx="7.5" cy="11.5" r="1.5"/>
          </svg>
        </div>
        <span class="gc-emoji">${w.emoji}</span>
        <button class="gc-pin${w.pinned ? ' pinned' : ''}" data-id="${w.id}" title="${w.pinned ? 'Unpin' : 'Pin to top'}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="${w.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M12 2L15 9H21L16 14L18 21L12 17L6 21L8 14L3 9H9L12 2Z"/>
          </svg>
        </button>
        <button class="gc-delete" data-id="${w.id}" title="Delete group">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="gc-name" title="${escHtml(w.name)}">${escHtml(w.name)}</div>
      <div class="gc-count">${w.tools.length} tool${w.tools.length !== 1 ? 's' : ''}</div>
      ${w.tools.length > 0 ? `
        <button class="gc-open-all" data-id="${w.id}" title="Launch all tools as a tab group">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          Open All Tabs
        </button>
      ` : ''}
    </div>`).join('');

  grid.querySelectorAll('.group-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.gc-delete') || e.target.closest('.gc-open-all') || e.target.closest('.gc-drag-handle') || e.target.closest('.gc-pin')) return;
      navigateTo('group', card.dataset.id);
    });
  });

  grid.querySelectorAll('.gc-pin').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); togglePin(btn.dataset.id); });
  });

  grid.querySelectorAll('.gc-delete').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); deleteGroup(btn.dataset.id); });
  });

  grid.querySelectorAll('.gc-open-all').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); openGroupAsTabs(btn.dataset.id); });
  });

  bindGroupDrag(grid);
}

// ─── Render: Group ────────────────────────────────────────────────────────
function renderGroup() {
  const group = state.groups.find(w => w.id === state.currentGroupId);
  if (!group) {
    state.currentGroupId = null;
    setTimeout(() => navigateTo('home'), 0);
    return;
  }

  renderGroupTitle(group);
  loadGroupNotes(group);

  const list  = DOM.toolsList;
  const empty = DOM.groupEmpty;

  if (!group.tools.length) {
    list.innerHTML = '';
    list.style.display = 'none';
    empty.classList.add('visible');
    return;
  }

  empty.classList.remove('visible');
  list.style.display = 'flex';

  list.innerHTML = group.tools.map((t, idx) => {
    const domain  = getDomain(t.url);
    const favicon = domain
      ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`
      : '';

    return `
      <div class="tool-card" data-id="${t.id}" data-index="${idx}" draggable="true">
        <div class="tool-drag-handle" title="Drag to reorder">
          <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
            <circle cx="2" cy="2" r="1.5"/><circle cx="6" cy="2" r="1.5"/>
            <circle cx="2" cy="6" r="1.5"/><circle cx="6" cy="6" r="1.5"/>
            <circle cx="2" cy="10" r="1.5"/><circle cx="6" cy="10" r="1.5"/>
          </svg>
        </div>
        <div class="tool-icon">
          ${favicon
            ? `<img src="${escHtml(favicon)}" alt="" width="20" height="20" class="tool-favicon">
               <div class="tool-icon-fallback" style="display:none">🔗</div>`
            : `<div class="tool-icon-fallback">🔗</div>`}
        </div>
        <div class="tool-info">
          <div class="tool-name" title="${escHtml(t.name)}">${escHtml(t.name)}</div>
          ${t.description ? `<div class="tool-desc" title="${escHtml(t.description)}">${escHtml(t.description)}</div>` : ''}
        </div>
        <div class="tool-actions">
          <a href="${escHtml(t.url)}" target="_blank" rel="noopener noreferrer" class="link-btn" title="Open">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
          <button class="tool-edit" data-id="${t.id}" title="Edit tool">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="tool-delete" data-id="${t.id}" title="Remove">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>`;
  }).join('');

  list.querySelectorAll('.tool-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditToolModal(btn.dataset.id));
  });
  list.querySelectorAll('.tool-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteTool(btn.dataset.id));
  });

  bindToolDrag(list);
}

// ─── Group Header: Inline Rename ─────────────────────────────────────────
function renderGroupTitle(group) {
  const wrap = DOM.groupTitleWrap;
  wrap.innerHTML = '';

  const titleSpan = document.createElement('span');
  titleSpan.className   = 'group-header-title';
  titleSpan.textContent = `${group.emoji} ${group.name}`;
  titleSpan.title       = 'Click to rename';

  const editBtn = document.createElement('button');
  editBtn.className = 'grp-rename-btn';
  editBtn.title     = 'Rename group';
  editBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>`;

  const activateRename = () => startInlineRename(wrap, group);
  titleSpan.addEventListener('click', activateRename);
  editBtn.addEventListener('click', activateRename);

  wrap.appendChild(titleSpan);
  wrap.appendChild(editBtn);
}

function startInlineRename(wrap, group) {
  wrap.innerHTML = '';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'group-rename-input';
  input.value = group.name;
  input.maxLength = 32;
  input.autocomplete = 'off';

  const commit = async () => {
    const newName = input.value.trim();
    if (!newName) { shakeInput(input); input.focus(); return; }
    if (newName === group.name) { renderGroupTitle(group); return; }
    group.name = newName;
    try {
      await saveData();
      renderGroupTitle(group);
      showToast('Renamed ✓');
    } catch (_) {
      await loadData();
      renderGroupTitle(state.groups.find(w => w.id === group.id) || group);
    }
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { renderGroupTitle(group); }
  });
  input.addEventListener('blur', commit);
  wrap.appendChild(input);
  input.focus();
  input.select();
}

// ─── Auto-Fetch Page Meta ────────────────────────────────────────────────────
let fetchAbortId = 0;

async function fetchPageMeta(url) {
  let meta = null;
  try {
    meta = await chrome.runtime.sendMessage({ type: 'FETCH_PAGE_META', url });
  } catch (e) {
    console.warn('[Tabsy] sendMessage error:', e);
  }
  return (meta && (meta.name || meta.description)) ? meta : null;
}

async function autoFetchMetaForEdit() {
  const url = normalizeUrl(DOM.toolUrlInput.value);
  if (!url || !getDomain(url)) return;
  DOM.toolUrlInput.value = url;
  const myId = ++fetchAbortId;
  setFetchState('fetching');
  const meta = await fetchPageMeta(url);
  if (myId !== fetchAbortId) return;
  if (!meta) { setFetchState('idle'); return; }
  setFetchState('success');
  if (meta.name && !DOM.toolNameInput.value.trim()) DOM.toolNameInput.value = meta.name;
  if (meta.description && !DOM.toolDescInput.value.trim()) DOM.toolDescInput.value = meta.description;
  setTimeout(() => setFetchState('idle'), 2000);
}

function setFetchState(fetchState) {
  const el = DOM.fetchIndicator;
  el.className = `fetch-indicator fetch-indicator--${fetchState}`;
  if (fetchState === 'fetching') {
    el.innerHTML = `<span class="fetch-spinner"></span>`;
  } else if (fetchState === 'success') {
    el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  } else {
    el.innerHTML = '';
  }
}

// ─── Capture Current Tabs ────────────────────────────────────────────────────
async function captureCurrentTabs() {
  const grp = state.groups.find(w => w.id === state.currentGroupId);
  if (!grp) return;

  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const validTabs = tabs.filter(t =>
      t.url &&
      !t.url.startsWith('chrome://') &&
      !t.url.startsWith('chrome-extension://') &&
      !t.url.startsWith('about:') &&
      !t.url.startsWith('edge://') &&
      getDomain(t.url)
    );

    if (!validTabs.length) {
      showToast('No capturable tabs found', 'error');
      return;
    }

    const existingUrls = new Set(grp.tools.map(t => t.url));
    let added = 0;

    for (const tab of validTabs) {
      const url = tab.url;
      if (existingUrls.has(url)) continue;

      const name = tab.title
        ? tab.title.replace(/\s*[\|–—\-]\s*.{2,40}$/, '').trim().slice(0, 40)
        : getDomain(url).replace(/^www\./, '');

      grp.tools.push({ id: uid(), name, description: '', url });
      existingUrls.add(url);
      added++;
    }

    if (added === 0) {
      showToast('All tabs already in group');
      return;
    }

    await saveData();
    renderGroup();
    showToast(`Captured ${added} tab${added > 1 ? 's' : ''} ✓`);
  } catch (err) {
    console.warn('[Tabsy] Capture tabs error:', err);
    showToast('Could not capture tabs', 'error');
  }
}

// ─── Tab Group Launcher ──────────────────────────────────────────────────────
async function openGroupAsTabs(groupId) {
  const group = state.groups.find(w => w.id === groupId);
  if (!group?.tools.length) return;

  const urls = group.tools.map(t => t.url).filter(u => getDomain(u));
  if (!urls.length) { showToast('No valid URLs to open', 'error'); return; }

  try {
    let reusedCount = 0;
    let openedCount = 0;
    const tabIds = [];

    // Duplicate detection: check for already-open tabs
    if (state.settings.dedupEnabled) {
      const existingTabs = await chrome.tabs.query({ currentWindow: true });
      const existingUrls = new Map();
      for (const t of existingTabs) {
        try { existingUrls.set(new URL(t.url).hostname + new URL(t.url).pathname, t.id); } catch (_) {}
      }

      for (const url of urls) {
        try {
          const key = new URL(url).hostname + new URL(url).pathname;
          if (existingUrls.has(key)) {
            tabIds.push(existingUrls.get(key));
            reusedCount++;
          } else {
            const tab = await chrome.tabs.create({ url, active: false });
            tabIds.push(tab.id);
            openedCount++;
          }
        } catch (_) {
          const tab = await chrome.tabs.create({ url, active: false });
          tabIds.push(tab.id);
          openedCount++;
        }
      }
    } else {
      const tabs = await Promise.all(urls.map(url => chrome.tabs.create({ url, active: false })));
      tabs.forEach(t => tabIds.push(t.id));
      openedCount = tabs.length;
    }

    if (state.settings.tabGroupEnabled) {
      try {
        const tabGroupId = await chrome.tabs.group({ tabIds });
        const colorIdx = group.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % TAB_GROUP_COLORS.length;
        await chrome.tabGroups.update(tabGroupId, {
          title: `${group.emoji} ${group.name}`,
          color: TAB_GROUP_COLORS[colorIdx],
          collapsed: false,
        });
      } catch (_) { /* grouping optional */ }
    }

    if (tabIds[0] != null) await chrome.tabs.update(tabIds[0], { active: true });

    if (reusedCount > 0 && openedCount > 0) {
      showToast(`Opened ${openedCount} new, reused ${reusedCount} existing ✓`);
    } else if (reusedCount > 0) {
      showToast(`${reusedCount} tab${reusedCount > 1 ? 's' : ''} already open ✓`);
    } else {
      showToast(`Opened ${openedCount} tab${openedCount > 1 ? 's' : ''} ✓`);
    }
    setTimeout(() => window.close(), 350);
  } catch (err) {
    console.warn('[Tabsy] Could not open tabs:', err);
    showToast('Could not open tabs', 'error');
  }
}

// ─── Command Palette ────────────────────────────────────────────────────────
let cmdOpen      = false;
let cmdActiveIdx = -1;

function openCommandPalette() {
  cmdOpen = true;
  cmdActiveIdx = -1;
  DOM.cmdPalette.style.display = 'flex';
  DOM.cmdSearch.value = '';
  renderCmdResults('');
  setTimeout(() => DOM.cmdSearch.focus(), 50);
}

function closeCommandPalette() {
  cmdOpen = false;
  DOM.cmdPalette.style.display = 'none';
}

function renderCmdResults(query) {
  const q = query.toLowerCase().trim();
  const results = [];

  for (const w of state.groups) {
    const wMatch = !q || w.name.toLowerCase().includes(q) || w.emoji.includes(q);

    if (wMatch) {
      results.push({
        type: 'group',
        id: w.id,
        name: w.name,
        emoji: w.emoji,
        hint: `${w.tools.length} tool${w.tools.length !== 1 ? 's' : ''} — open all`,
        icon: w.emoji,
        favicon: null,
      });
    }

    for (const t of w.tools) {
      if (!q || t.name.toLowerCase().includes(q) || t.url.toLowerCase().includes(q)) {
        const domain = getDomain(t.url);
        results.push({
          type: 'tool',
          id: t.id,
          url: t.url,
          name: t.name,
          hint: `in ${w.emoji} ${w.name}`,
          icon: null,
          favicon: domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32` : null,
        });
      }
    }
  }

  const seen = new Set();
  const deduped = results.filter(r => {
    if (r.type === 'tool') {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
    }
    return true;
  });

  const limited = deduped.slice(0, 12);

  if (!limited.length) {
    DOM.cmdResults.innerHTML = '';
    DOM.cmdResults.style.display = 'none';
    DOM.cmdEmpty.style.display = 'block';
    return;
  }

  DOM.cmdEmpty.style.display = 'none';
  DOM.cmdResults.style.display = 'block';

  DOM.cmdResults.innerHTML = limited.map((r, i) => `
    <div class="cmd-result${i === cmdActiveIdx ? ' active' : ''}" data-idx="${i}">
      <div class="cmd-result-icon">
        ${r.favicon
          ? `<img src="${escHtml(r.favicon)}" alt="" width="16" height="16" class="cmd-favicon">`
          : r.icon || '🔗'}
      </div>
      <div class="cmd-result-info">
        <div class="cmd-result-name">${escHtml(r.name)}</div>
        <div class="cmd-result-hint">${escHtml(r.hint)}</div>
      </div>
      <span class="cmd-result-badge cmd-result-badge--${r.type}">${r.type}</span>
    </div>
  `).join('');

  DOM.cmdResults._items = limited;

  DOM.cmdResults.querySelectorAll('.cmd-result').forEach(el => {
    el.addEventListener('click', () => {
      const idx = Number(el.dataset.idx);
      activateCmdResult(limited[idx]);
    });
  });
}

function activateCmdResult(item) {
  if (!item) return;
  closeCommandPalette();

  if (item.type === 'group') {
    openGroupAsTabs(item.id);
  } else if (item.type === 'tool') {
    chrome.tabs.create({ url: item.url, active: true });
    setTimeout(() => window.close(), 200);
  }
}

function handleCmdKeydown(e) {
  const items = DOM.cmdResults._items;
  if (!items || !items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    cmdActiveIdx = Math.min(cmdActiveIdx + 1, items.length - 1);
    renderCmdResults(DOM.cmdSearch.value);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    cmdActiveIdx = Math.max(cmdActiveIdx - 1, 0);
    renderCmdResults(DOM.cmdSearch.value);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (e.shiftKey && items.length > 0) {
      const grpItem = items.find(i => i.type === 'group');
      if (grpItem) activateCmdResult(grpItem);
    } else if (cmdActiveIdx >= 0 && cmdActiveIdx < items.length) {
      activateCmdResult(items[cmdActiveIdx]);
    } else if (items.length > 0) {
      activateCmdResult(items[0]);
    }
  }
}

// ─── Drag-to-Reorder: Groups ──────────────────────────────────────────────
function bindGroupDrag(grid) {
  let dragFromIndex = null;
  grid.querySelectorAll('.group-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      dragFromIndex = Number(card.dataset.index);
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', dragFromIndex);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      grid.querySelectorAll('.group-card').forEach(c => c.classList.remove('drag-over'));
    });
    card.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      grid.querySelectorAll('.group-card').forEach(c => c.classList.remove('drag-over'));
      if (Number(card.dataset.index) !== dragFromIndex) card.classList.add('drag-over');
    });
    card.addEventListener('drop', async e => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const toIndex = Number(card.dataset.index);
      if (dragFromIndex === null || dragFromIndex === toIndex) return;
      const items = [...state.groups];
      const [moved] = items.splice(dragFromIndex, 1);
      items.splice(toIndex, 0, moved);
      state.groups = items;
      try { await saveData(); renderHome(); } catch (_) { await loadData(); renderHome(); }
      dragFromIndex = null;
    });
  });
}

// ─── Drag-to-Reorder: Tools ──────────────────────────────────────────────────
function bindToolDrag(list) {
  const group = state.groups.find(w => w.id === state.currentGroupId);
  if (!group) return;
  let dragFromIndex = null;
  list.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      dragFromIndex = Number(card.dataset.index);
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      list.querySelectorAll('.tool-card').forEach(c => c.classList.remove('drag-over'));
    });
    card.addEventListener('dragover', e => {
      e.preventDefault();
      list.querySelectorAll('.tool-card').forEach(c => c.classList.remove('drag-over'));
      if (Number(card.dataset.index) !== dragFromIndex) card.classList.add('drag-over');
    });
    card.addEventListener('drop', async e => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const toIndex = Number(card.dataset.index);
      if (dragFromIndex === null || dragFromIndex === toIndex) return;
      const items = [...group.tools];
      const [moved] = items.splice(dragFromIndex, 1);
      items.splice(toIndex, 0, moved);
      group.tools = items;
      try { await saveData(); renderGroup(); } catch (_) { await loadData(); renderGroup(); }
      dragFromIndex = null;
    });
  });
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────
async function deleteGroup(id) {
  const idx = state.groups.findIndex(w => w.id === id);
  if (idx === -1) return;
  const grp = state.groups[idx];
  pushUndo('delete_group', { group: JSON.parse(JSON.stringify(grp)), index: idx });
  state.groups.splice(idx, 1);
  try { await saveData(); renderHome(); showToast(`"${grp.name}" deleted · Ctrl+Z to undo`); }
  catch (_) { await loadData(); renderHome(); }
}

async function deleteTool(id) {
  const grp = state.groups.find(w => w.id === state.currentGroupId);
  if (!grp) return;
  const idx = grp.tools.findIndex(t => t.id === id);
  if (idx === -1) return;
  const tool = grp.tools[idx];
  pushUndo('delete_tool', { tool: JSON.parse(JSON.stringify(tool)), index: idx, groupId: grp.id });
  grp.tools.splice(idx, 1);
  try { await saveData(); renderGroup(); showToast(`"${tool.name}" removed · Ctrl+Z to undo`); }
  catch (_) { await loadData(); renderGroup(); }
}

// ─── Modal: Group ──────────────────────────────────────────────────────────
function openAddGroupModal() {
  state.modal.emoji = '🚀';
  state.modal.color = '#141414';
  DOM.modalGroupTitle.textContent = 'New Group';
  DOM.btnSaveGroup.textContent    = 'Create Group';
  DOM.groupNameInput.value        = '';
  closeEmojiDropdown();
  renderEmojiPicker();
  renderColorPicker();
  DOM.modalGroup.style.display = 'flex';
  setTimeout(() => DOM.groupNameInput.focus(), 80);
}

function closeGroupModal() {
  closeEmojiDropdown();
  DOM.modalGroup.style.display = 'none';
}

async function saveGroup() {
  const name = DOM.groupNameInput.value.trim();
  if (!name) { shakeInput(DOM.groupNameInput); DOM.groupNameInput.focus(); return; }
  state.groups.push({ id: uid(), name, emoji: state.modal.emoji, color: state.modal.color, tools: [] });
  try { await saveData(); closeGroupModal(); renderHome(); showToast(`"${name}" created ✓`); }
  catch (_) { state.groups.pop(); }
}

// ─── Modal: Tool (Add + Edit) ─────────────────────────────────────────────────
function openAddToolModal() {
  state.editingToolId = null;
  DOM.modalToolTitle.textContent = 'Add Tool';
  DOM.btnSaveTool.textContent    = 'Add Tool';
  DOM.toolUrlInput.value = '';
  DOM.toolNameInput.value = '';
  DOM.toolDescInput.value = '';
  DOM.toolEditFields.style.display = 'none';
  setFetchState('idle');
  DOM.modalTool.style.display = 'flex';
  setTimeout(() => DOM.toolUrlInput.focus(), 80);
}

function openEditToolModal(toolId) {
  const grp   = state.groups.find(w => w.id === state.currentGroupId);
  const tool = grp?.tools.find(t => t.id === toolId);
  if (!tool) return;
  state.editingToolId = toolId;
  DOM.modalToolTitle.textContent   = 'Edit Tool';
  DOM.btnSaveTool.textContent      = 'Save Changes';
  DOM.toolUrlInput.value           = tool.url;
  DOM.toolNameInput.value          = tool.name;
  DOM.toolDescInput.value          = tool.description || '';
  DOM.toolEditFields.style.display = 'block';
  setFetchState('idle');
  DOM.modalTool.style.display = 'flex';
  setTimeout(() => DOM.toolNameInput.focus(), 80);
}

function closeToolModal() {
  DOM.modalTool.style.display = 'none';
  state.editingToolId = null;
  fetchAbortId++;
  setFetchState('idle');
}

async function saveTool() {
  const url = normalizeUrl(DOM.toolUrlInput.value);
  if (!url || !getDomain(url)) { shakeInput(DOM.toolUrlInput); return; }

  const grp = state.groups.find(w => w.id === state.currentGroupId);
  if (!grp) return;

  if (state.editingToolId) {
    const name = DOM.toolNameInput.value.trim();
    const desc = DOM.toolDescInput.value.trim();
    if (!name) { shakeInput(DOM.toolNameInput); DOM.toolNameInput.focus(); return; }
    const tool = grp.tools.find(t => t.id === state.editingToolId);
    if (!tool) return;
    if (grp.tools.some(t => t.id !== state.editingToolId && t.url === url)) {
      shakeInput(DOM.toolUrlInput); showToast('URL already exists in this group', 'error'); return;
    }
    const prev = { ...tool };
    Object.assign(tool, { name, description: desc, url });
    try { await saveData(); closeToolModal(); renderGroup(); showToast(`"${name}" updated ✓`); }
    catch (_) { Object.assign(tool, prev); }
  } else {
    if (grp.tools.some(t => t.url === url)) {
      shakeInput(DOM.toolUrlInput); showToast('URL already exists in this group', 'error'); return;
    }
    DOM.btnSaveTool.disabled = true;
    DOM.btnSaveTool.textContent = 'Fetching…';
    setFetchState('fetching');

    const meta = await fetchPageMeta(url);
    const domain = getDomain(url);
    const name   = meta?.name || (domain ? domain.replace(/^www\./, '') : url);
    const desc   = meta?.description || '';
    const tool   = { id: uid(), name, description: desc, url };
    grp.tools.push(tool);

    try {
      await saveData();
      setFetchState('idle');
      DOM.btnSaveTool.disabled = false;
      DOM.btnSaveTool.textContent = 'Add Tool';
      closeToolModal(); renderGroup();
      showToast(`"${name}" added ✓`);
    } catch (_) {
      grp.tools.pop();
      setFetchState('idle');
      DOM.btnSaveTool.disabled = false;
      DOM.btnSaveTool.textContent = 'Add Tool';
    }
  }
}

// ─── Emoji Picker ───────────────────────────────────────────────────────────
let emojiDropdownOpen = false;
let emojiActiveCat    = 'frequent';

function renderEmojiPicker() {
  DOM.emojiPickerPreview.textContent = state.modal.emoji;
  DOM.emojiDdCategories.innerHTML = EMOJI_DATA.map(cat => `
    <button class="emoji-dd-cat-btn${cat.cat === emojiActiveCat ? ' active' : ''}"
            data-cat="${cat.cat}" title="${cat.label}">${cat.icon}</button>
  `).join('');
  DOM.emojiDdCategories.querySelectorAll('.emoji-dd-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      emojiActiveCat = btn.dataset.cat;
      DOM.emojiDdCategories.querySelectorAll('.emoji-dd-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      DOM.emojiDdSearch.value = '';
      renderEmojiGrid();
    });
  });
  renderEmojiGrid();
}

function renderEmojiGrid(filter = '') {
  const query = filter.toLowerCase().trim();
  let emojis;
  if (query) {
    emojis = [];
    for (const cat of EMOJI_DATA) {
      for (const em of cat.emojis) {
        if (em.e.includes(query) || em.k.includes(query)) {
          if (!emojis.some(x => x.e === em.e)) emojis.push(em);
        }
      }
    }
  } else {
    const cat = EMOJI_DATA.find(c => c.cat === emojiActiveCat) || EMOJI_DATA[0];
    emojis = cat.emojis;
  }
  if (!emojis.length) {
    DOM.emojiDdGrid.style.display = 'none';
    DOM.emojiDdEmpty.style.display = 'block';
    return;
  }
  DOM.emojiDdGrid.style.display = 'grid';
  DOM.emojiDdEmpty.style.display = 'none';
  DOM.emojiDdGrid.innerHTML = emojis.map(em => `
    <button class="emoji-dd-item${em.e === state.modal.emoji ? ' selected' : ''}"
            data-emoji="${em.e}" title="${em.k}">${em.e}</button>
  `).join('');
  DOM.emojiDdGrid.querySelectorAll('.emoji-dd-item').forEach(btn => {
    btn.addEventListener('click', () => {
      state.modal.emoji = btn.dataset.emoji;
      DOM.emojiPickerPreview.textContent = btn.dataset.emoji;
      DOM.emojiDdGrid.querySelectorAll('.emoji-dd-item').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      closeEmojiDropdown();
    });
  });
}

function openEmojiDropdown() {
  if (emojiDropdownOpen) { closeEmojiDropdown(); return; }
  emojiDropdownOpen = true;
  DOM.emojiPickerTrigger.classList.add('open');
  DOM.emojiDropdown.style.display = 'block';
  DOM.emojiDdSearch.value = '';
  emojiActiveCat = 'frequent';
  renderEmojiPicker();
  setTimeout(() => DOM.emojiDdSearch.focus(), 60);
}

function closeEmojiDropdown() {
  emojiDropdownOpen = false;
  DOM.emojiPickerTrigger.classList.remove('open');
  DOM.emojiDropdown.style.display = 'none';
}

function handleEmojiClickOutside(e) {
  if (!emojiDropdownOpen) return;
  if (!DOM.emojiPickerWrap.contains(e.target)) closeEmojiDropdown();
}

// ─── Color Picker ───────────────────────────────────────────────────────────
function renderColorPicker() {
  const picker = DOM.colorPicker;
  const customWrap = picker.querySelector('.color-custom-wrap');
  picker.querySelectorAll('.color-swatch').forEach(s => s.remove());
  const html = COLORS.map(c => `
    <button class="color-swatch${c.hex === state.modal.color ? ' selected' : ''}"
            data-color="${c.hex}" style="background:${c.hex}" title="${c.label}"></button>
  `).join('');
  customWrap.insertAdjacentHTML('beforebegin', html);
  const isCustom = !COLORS.some(c => c.hex === state.modal.color);
  DOM.colorCustomBtn.classList.toggle('selected', isCustom);
  if (isCustom) DOM.colorCustomInput.value = state.modal.color;
  picker.querySelectorAll('.color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      state.modal.color = btn.dataset.color;
      picker.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
      DOM.colorCustomBtn.classList.remove('selected');
      btn.classList.add('selected');
    });
  });
  DOM.colorCustomInput.oninput = () => {
    state.modal.color = DOM.colorCustomInput.value;
    picker.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('selected'));
    DOM.colorCustomBtn.classList.add('selected');
  };
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function openSettings() {
  DOM.resetConfirm.style.display = 'none';
  syncSettingsUI();
  DOM.settingsOverlay.style.display = 'flex';
}

function closeSettings() { DOM.settingsOverlay.style.display = 'none'; }

function syncSettingsUI() {
  setToggleState(DOM.toggleTabGroup, state.settings.tabGroupEnabled);
  setToggleState(DOM.toggleDedup, state.settings.dedupEnabled);
}

function setToggleState(toggleEl, isOn) {
  toggleEl.classList.toggle('active', isOn);
  toggleEl.setAttribute('aria-checked', String(isOn));
}

function saveSetting(key, value) {
  state.settings[key] = value;
  chrome.storage.local.set({ settings: state.settings });
}

// Theme
const SVG_SUN = `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const SVG_MOON = `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

function applyTheme(theme) {
  state.theme = theme;
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  DOM.themeToggle.classList.toggle('active', isDark);
  DOM.themeToggle.setAttribute('aria-checked', String(isDark));
  DOM.themeToggleThumb.innerHTML = isDark ? SVG_MOON : SVG_SUN;
}

function toggleTheme() {
  const next = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  chrome.storage.local.set({ theme: next });
}

function loadTheme() {
  return new Promise(resolve => {
    chrome.storage.local.get(['theme'], res => {
      applyTheme(res.theme === 'dark' ? 'dark' : 'light');
      resolve();
    });
  });
}

function loadSettings() {
  return new Promise(resolve => {
    chrome.storage.local.get(['settings'], res => {
      if (res.settings && typeof res.settings === 'object') {
        state.settings.tabGroupEnabled = res.settings.tabGroupEnabled !== false;
        state.settings.dedupEnabled = res.settings.dedupEnabled !== false;
      }
      resolve();
    });
  });
}

// Reset Data
function showResetConfirm() { DOM.resetConfirm.style.display = 'block'; }
function hideResetConfirm() { DOM.resetConfirm.style.display = 'none'; }

async function resetAllData() {
  try {
    state.groups = [];
    await chrome.storage.local.set({ groups: [] });
    hideResetConfirm();
    if (state.view === 'group') { state.currentGroupId = null; navigateTo('home'); }
    else renderHome();
    showToast('All data cleared');
  } catch (err) {
    console.error('[Tabsy] Reset failed:', err);
    showToast('Reset failed', 'error');
  }
}

// ─── Group Pinning ──────────────────────────────────────────────────────
async function togglePin(grpId) {
  const grp = state.groups.find(w => w.id === grpId);
  if (!grp) return;
  grp.pinned = !grp.pinned;

  state.groups.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  try {
    await saveData();
    renderHome();
    showToast(grp.pinned ? `"${grp.name}" pinned` : `"${grp.name}" unpinned`);
  } catch (_) { await loadData(); renderHome(); }
}

// ─── Group Notes ──────────────────────────────────────────────────────────
let notesOpen = false;
let notesSaveTimer = null;

function loadGroupNotes(group) {
  notesOpen = false;
  DOM.notesBody.style.display = 'none';
  DOM.notesChevron.style.transform = '';

  const notes = group.notes || '';
  DOM.notesTextarea.value = notes;
  DOM.notesCharcount.textContent = `${notes.length} / 2000`;
  DOM.notesToggleLabel.textContent = notes ? `Notes (${notes.length})` : 'Notes';
}

function toggleNotesPanel() {
  notesOpen = !notesOpen;
  DOM.notesBody.style.display = notesOpen ? 'block' : 'none';
  DOM.notesChevron.style.transform = notesOpen ? 'rotate(180deg)' : '';
  if (notesOpen) DOM.notesTextarea.focus();
}

function handleNotesInput() {
  const grp = state.groups.find(w => w.id === state.currentGroupId);
  if (!grp) return;

  const text = DOM.notesTextarea.value;
  DOM.notesCharcount.textContent = `${text.length} / 2000`;
  DOM.notesToggleLabel.textContent = text ? `Notes (${text.length})` : 'Notes';

  clearTimeout(notesSaveTimer);
  notesSaveTimer = setTimeout(async () => {
    grp.notes = text;
    try { await saveData(); } catch (_) {}
  }, 500);
}

// ─── Undo Stack ─────────────────────────────────────────────────────────────
function pushUndo(action, data) {
  state.undoStack.push({ action, data, timestamp: Date.now() });
  if (state.undoStack.length > 10) state.undoStack.shift();
}

async function performUndo() {
  const entry = state.undoStack.pop();
  if (!entry) { showToast('Nothing to undo'); return; }

  if (entry.action === 'delete_group') {
    state.groups.splice(entry.data.index, 0, entry.data.group);
    try {
      await saveData();
      renderHome();
      showToast(`"${entry.data.group.name}" restored ✓`);
    } catch (_) { state.groups.splice(entry.data.index, 1); }
  }
  else if (entry.action === 'delete_tool') {
    const grp = state.groups.find(w => w.id === entry.data.groupId);
    if (grp) {
      grp.tools.splice(entry.data.index, 0, entry.data.tool);
      try {
        await saveData();
        renderGroup();
        showToast(`"${entry.data.tool.name}" restored ✓`);
      } catch (_) { grp.tools.splice(entry.data.index, 1); }
    }
  }
}

// ─── Event Bindings ───────────────────────────────────────────────────────────
function bindEvents() {
  DOM.btnAddGroup.addEventListener('click', openAddGroupModal);
  DOM.btnBack.addEventListener('click', () => navigateTo('home'));

  document.getElementById('btn-cancel-group').addEventListener('click', closeGroupModal);
  document.getElementById('btn-cancel-group-2').addEventListener('click', closeGroupModal);
  DOM.btnSaveGroup.addEventListener('click', saveGroup);
  DOM.groupNameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveGroup();
    if (e.key === 'Escape') closeGroupModal();
  });
  DOM.modalGroup.addEventListener('click', e => {
    if (e.target === DOM.modalGroup) closeGroupModal();
  });

  DOM.emojiPickerTrigger.addEventListener('click', openEmojiDropdown);
  DOM.emojiDdSearch.addEventListener('input', () => renderEmojiGrid(DOM.emojiDdSearch.value));
  DOM.emojiDdSearch.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.stopPropagation(); closeEmojiDropdown(); }
  });
  document.addEventListener('mousedown', handleEmojiClickOutside);

  DOM.btnAddTool.addEventListener('click', openAddToolModal);
  document.getElementById('btn-cancel-tool').addEventListener('click', closeToolModal);
  document.getElementById('btn-cancel-tool-2').addEventListener('click', closeToolModal);
  DOM.btnSaveTool.addEventListener('click', saveTool);
  
  DOM.toolUrlInput.addEventListener('blur', () => {
    if (!state.editingToolId) return;
    const url = normalizeUrl(DOM.toolUrlInput.value);
    if (url && getDomain(url)) autoFetchMetaForEdit();
  });
  DOM.toolUrlInput.addEventListener('paste', () => {
    if (!state.editingToolId) return;
    setTimeout(() => {
      const url = normalizeUrl(DOM.toolUrlInput.value);
      if (url && getDomain(url)) autoFetchMetaForEdit();
    }, 120);
  });
  DOM.toolUrlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveTool();
    if (e.key === 'Escape') closeToolModal();
  });
  DOM.toolNameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveTool();
    if (e.key === 'Escape') closeToolModal();
  });
  DOM.toolDescInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveTool();
    if (e.key === 'Escape') closeToolModal();
  });
  DOM.modalTool.addEventListener('click', e => {
    if (e.target === DOM.modalTool) closeToolModal();
  });

  DOM.btnCaptureTabs.addEventListener('click', captureCurrentTabs);

  DOM.notesToggle.addEventListener('click', toggleNotesPanel);
  DOM.notesTextarea.addEventListener('input', handleNotesInput);

  DOM.toggleDedup.addEventListener('click', () => {
    saveSetting('dedupEnabled', !state.settings.dedupEnabled);
    syncSettingsUI();
  });

  DOM.cmdSearch.addEventListener('input', () => {
    cmdActiveIdx = -1;
    renderCmdResults(DOM.cmdSearch.value);
  });
  DOM.cmdSearch.addEventListener('keydown', handleCmdKeydown);
  DOM.cmdPalette.addEventListener('click', e => {
    if (e.target === DOM.cmdPalette) closeCommandPalette();
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdOpen) closeCommandPalette();
      else openCommandPalette();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      e.preventDefault();
      performUndo();
      return;
    }

    if (e.key === 'Escape') {
      if (cmdOpen) closeCommandPalette();
      else if (emojiDropdownOpen) closeEmojiDropdown();
      else if (DOM.settingsOverlay.style.display !== 'none') closeSettings();
      else if (DOM.modalGroup.style.display !== 'none') closeGroupModal();
      else if (DOM.modalTool.style.display !== 'none') closeToolModal();
    }
  });

  DOM.btnSettings.addEventListener('click', openSettings);
  DOM.btnCloseSettings.addEventListener('click', closeSettings);
  DOM.settingsOverlay.addEventListener('click', e => {
    if (e.target === DOM.settingsOverlay) closeSettings();
  });
  DOM.themeToggle.addEventListener('click', toggleTheme);
  DOM.themeToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
  });
  DOM.toggleTabGroup.addEventListener('click', () => {
    saveSetting('tabGroupEnabled', !state.settings.tabGroupEnabled);
    syncSettingsUI();
  });
  DOM.toggleTabGroup.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); DOM.toggleTabGroup.click(); }
  });

  DOM.btnResetData.addEventListener('click', showResetConfirm);
  DOM.btnResetCancel.addEventListener('click', hideResetConfirm);
  DOM.btnResetConfirm.addEventListener('click', resetAllData);
}

// ─── Injected CSS ─────────────────────────────────────────────────────────────
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .view {
      position: absolute; inset: 0;
      display: flex; flex-direction: column;
      opacity: 0; pointer-events: none; transform: translateX(0);
    }
    .view.active {
      opacity: 1; pointer-events: all; transform: translateX(0);
      transition: opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1),
                  transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1);
    }
    .view.enter-right  { opacity:0; pointer-events:none; transform:translateX(28px); }
    .view.enter-left   { opacity:0; pointer-events:none; transform:translateX(-28px); }
    .view.exit-left    { opacity:0; pointer-events:none; transform:translateX(-28px);
      transition: opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1),
                  transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1); }
    .view.exit-right   { opacity:0; pointer-events:none; transform:translateX(28px);
      transition: opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1),
                  transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1); }

    .gc-top { display:flex; align-items:center; justify-content:space-between; gap:4px; margin-bottom:10px; }
    .gc-drag-handle {
      color:var(--ink-4); cursor:grab; flex-shrink:0; padding:2px; border-radius:4px;
      opacity:0; transition:opacity .15s,color .15s; display:flex; align-items:center;
    }
    .group-card:hover .gc-drag-handle { opacity:1; }
    .gc-drag-handle:hover { color:var(--ink-3); }
    .gc-emoji { font-size:22px; line-height:1; flex:1; }
    .gc-delete {
      display:flex; align-items:center; justify-content:center;
      width:22px; height:22px; border:none; border-radius:6px;
      cursor:pointer; background:transparent; color:var(--ink-4);
      padding:0; opacity:0; transition:opacity .15s,color .15s,background .15s;
    }
    .group-card:hover .gc-delete { opacity:1; }
    .gc-delete:hover { color:var(--danger); background:var(--danger-dim); }
    .gc-name {
      font-size:13.5px; font-weight:600; color:var(--ink);
      letter-spacing:-0.2px; margin-bottom:4px;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .gc-count { font-size:11.5px; color:var(--ink-3); font-weight:400; }
    .gc-open-all {
      display:flex; align-items:center; justify-content:center; gap:6px;
      width:calc(100% + 2px); margin:10px -1px -1px;
      padding:8px 10px; border:none;
      border-top:1px solid var(--border);
      border-radius:0 0 calc(var(--radius) - 1px) calc(var(--radius) - 1px);
      background:transparent; color:var(--ink-2);
      font-family:inherit; font-size:11.5px; font-weight:600;
      cursor:pointer; opacity:0; transform:translateY(3px);
      transition:opacity .18s,background .15s,color .15s,transform .18s;
    }
    .group-card:hover .gc-open-all { opacity:1; transform:translateY(0); }
    .gc-open-all:hover { background:var(--subtle-bg); color:var(--ink); }
    .gc-open-all:active { background:var(--subtle-bg-hover); }

    .dragging { opacity:0.38; }
    .group-card.drag-over {
      border-color:var(--ink) !important;
      box-shadow:0 0 0 2px var(--input-focus-ring),0 4px 16px rgba(0,0,0,0.12) !important;
    }
    .tool-card.drag-over {
      border-color:var(--ink) !important;
      box-shadow:0 0 0 2px var(--input-focus-ring) !important;
    }

    .tool-drag-handle {
      color:var(--ink-4); cursor:grab; flex-shrink:0;
      padding:4px 2px; opacity:0; transition:opacity .15s;
      display:flex; align-items:center;
    }
    .tool-card:hover .tool-drag-handle { opacity:1; }

    .tool-edit {
      display:flex; align-items:center; justify-content:center;
      width:28px; height:28px; background:transparent; border:none;
      color:var(--ink-4); font-size:14px; cursor:pointer;
      border-radius:6px; opacity:0;
      transition:opacity .15s,color .15s,background .15s;
    }
    .tool-card:hover .tool-edit { opacity:1; }
    .tool-edit:hover { color:var(--ink-2); background:var(--subtle-bg); }

    .group-header-title-wrap {
      flex:1; display:flex; align-items:center; justify-content:center;
      gap:6px; min-width:0; overflow:hidden;
    }
    .grp-rename-btn {
      display:flex; align-items:center; justify-content:center;
      width:24px; height:24px; background:transparent; border:none;
      color:var(--ink-4); cursor:pointer; border-radius:5px;
      flex-shrink:0; opacity:0; transition:opacity .15s,color .15s,background .15s;
    }
    .header:hover .grp-rename-btn { opacity:1; }
    .grp-rename-btn:hover { color:var(--ink-2); background:var(--subtle-bg); }
    .group-rename-input {
      flex:1; min-width:0; max-width:200px;
      background:var(--input-bg); border:1.5px solid var(--input-focus-border);
      border-radius:7px; color:var(--ink);
      font-family:inherit; font-size:14px; font-weight:600;
      padding:5px 10px; outline:none; text-align:center;
      box-shadow:0 0 0 3px var(--input-focus-ring);
    }

    .url-input-row { position:relative; margin-bottom:0; }
    .input--url { padding-right:38px; margin-bottom:18px; }
    .fetch-indicator {
      position:absolute; right:12px; top:50%; transform:translateY(-50%);
      width:18px; height:18px; display:flex; align-items:center; justify-content:center;
      margin-top:-9px; pointer-events:none;
    }
    .fetch-indicator--fetching { color:var(--ink-3); }
    .fetch-indicator--success  { color:#10B981; }
    .fetch-spinner {
      width:14px; height:14px; border-radius:50%;
      border:2px solid var(--border);
      border-top-color:var(--ink-2);
      animation:spin .7s linear infinite;
    }

    @keyframes spin { to { transform:rotate(360deg); } }
    .toast--error { background:rgba(170,28,18,0.92) !important; }

    .gc-pin {
      display:flex; align-items:center; justify-content:center;
      width:22px; height:22px; border:none; border-radius:6px;
      cursor:pointer; background:transparent; color:var(--ink-4);
      padding:0; opacity:0; transition:opacity .15s,color .15s;
    }
    .group-card:hover .gc-pin { opacity:1; }
    .gc-pin.pinned { opacity:1; color:#F59E0B; }
    .gc-pin:hover { color:#F59E0B; }

    .group-notes { margin-bottom:12px; }
    .notes-toggle {
      display:flex; align-items:center; gap:7px; padding:8px 12px;
      border-radius:9px; cursor:pointer; font-size:12px; font-weight:500;
      color:var(--ink-3); transition:all .15s;
      background:rgba(0,0,0,0.03); border:1px solid transparent;
    }
    [data-theme="dark"] .notes-toggle { background:rgba(255,255,255,0.04); }
    .notes-toggle:hover { color:var(--ink-2); background:rgba(0,0,0,0.06); }
    [data-theme="dark"] .notes-toggle:hover { background:rgba(255,255,255,0.07); }
    .notes-chevron { transition:transform .2s; margin-left:auto; }
    .notes-body { margin-top:8px; }
    .notes-textarea {
      width:100%; min-height:80px; max-height:150px; padding:10px 12px;
      border-radius:9px; border:1.5px solid var(--border);
      background:var(--input-bg,rgba(0,0,0,0.04)); color:var(--ink);
      font-family:inherit; font-size:12px; line-height:1.6;
      resize:vertical; outline:none;
      transition:border-color .15s, box-shadow .15s;
    }
    .notes-textarea:focus {
      border-color:var(--input-focus-border,rgba(0,0,0,0.30));
      box-shadow:0 0 0 3px var(--input-focus-ring,rgba(0,0,0,0.06));
    }
    .notes-footer { display:flex; justify-content:flex-end; padding:4px 2px; }
    .notes-charcount { font-size:10px; color:var(--ink-4); }

  `;
  document.head.appendChild(style);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  document.addEventListener('error', e => {
    if (e.target.tagName !== 'IMG') return;
    if (e.target.classList.contains('tool-favicon')) {
      e.target.style.display = 'none';
      const fallback = e.target.nextElementSibling;
      if (fallback) fallback.style.display = 'flex';
    }
    if (e.target.classList.contains('cmd-favicon')) {
      e.target.parentElement.textContent = '🔗';
    }
  }, true);

  injectStyles();
  cacheDOM();

  try { await loadTheme(); } catch (_) { applyTheme('light'); }
  try { await loadSettings(); } catch (_) {}
  try { await loadData(); } catch (err) {
    console.error('[Tabsy] Failed to load data:', err);
    showToast('Could not load your data', 'error');
  }

  bindEvents();

  DOM.viewHome.classList.add('active');
  DOM.viewGroup.classList.remove('active', 'enter-right', 'enter-left', 'exit-left', 'exit-right');
  renderHome();
}

document.addEventListener('DOMContentLoaded', init);