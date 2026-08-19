(function () {
  'use strict';

  let currentVideo = null;
  let isSeeking = false;
  let updateIntervalId = null;
  let hideTimeout = null;
  
  let globalVolume = 1;
  let lastVolume = 1; 
  let globalMuted = false;

  function injectNativeOverride() {
    if (document.getElementById('ig-ctrl-override')) return;
    const style = document.createElement('style');
    style.id = 'ig-ctrl-override';
    style.textContent = `
      button[aria-label="Toggle audio"],
      button[aria-label="Audio is muted"],
      button[aria-label="Audio is playing"],
      svg[aria-label="Audio is muted"],
      svg[aria-label="Audio is playing"],
      div[role="slider"][aria-label="Volume"],
      div[role="slider"][aria-orientation="vertical"],
      div[role="slider"][aria-label="Adjust volume"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
      }
    `;
    document.head.appendChild(style);
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s}` : `${m}:${s}`;
  }

  function createSvgIcon(pathData, viewBox = "0 0 24 24") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "ig-ctrl-icon");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    return svg;
  }

  const ICONS = {
    play: "M8 5v14l11-7z",
    pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
    volumeOn: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
    volumeOff: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z",
    capture: "M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
  };

  function buildControlBar() {
    if (document.getElementById('ig-ctrl-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'ig-ctrl-bar';
    bar.className = 'ig-ctrl-hidden ig-ctrl-wide';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Media Controls');

    function createButton(id, label, iconPath, onClick) {
      const btn = document.createElement('button');
      btn.id = id;
      btn.type = 'button'; 
      btn.className = 'ig-ctrl-btn';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      btn.appendChild(createSvgIcon(iconPath));
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        e.currentTarget.blur();
        onClick();
      });
      return btn;
    }

    const playBtn = createButton('ig-ctrl-play', 'Play / Pause', ICONS.play, togglePlay);

    const volContainer = document.createElement('div');
    volContainer.className = 'ig-ctrl-vol-container';
    
    const volBtn = createButton('ig-ctrl-mute', 'Mute / Unmute', ICONS.volumeOn, toggleMute);
    
    const volPopup = document.createElement('div');
    volPopup.className = 'ig-ctrl-vol-popup';

    const volSlider = document.createElement('input');
    volSlider.type = 'range';
    volSlider.id = 'ig-ctrl-vol-slider';
    volSlider.min = '0';
    volSlider.max = '1';
    volSlider.step = '0.01';
    volSlider.value = globalMuted ? '0' : globalVolume.toString();
    volSlider.className = 'ls-track';
    volSlider.setAttribute('aria-label', 'Volume Control');

    volSlider.addEventListener('input', (e) => {
      e.stopPropagation();
      const val = parseFloat(volSlider.value);
      
      globalVolume = val;
      globalMuted = (val === 0);
      if (val > 0) lastVolume = val;
      
      if (currentVideo) {
        currentVideo.volume = globalVolume;
        currentVideo.muted = globalMuted;
      }
      updateVolumeIcon();
      wakeUpBar();
    });

    volPopup.appendChild(volSlider);
    volContainer.appendChild(volBtn);
    volContainer.appendChild(volPopup);

    const seek = document.createElement('input');
    seek.type = 'range';
    seek.id = 'ig-ctrl-seek';
    seek.min = '0';
    seek.max = '100';
    seek.value = '0';
    seek.step = '0.01';
    seek.className = 'ls-track';
    seek.setAttribute('aria-label', 'Video timeline slider');

    const timeDisplay = document.createElement('span');
    timeDisplay.id = 'ig-ctrl-time';
    timeDisplay.className = 'ig-ctrl-time-text';
    timeDisplay.textContent = '0:00 / 0:00';

    seek.addEventListener('input', (e) => {
      e.stopPropagation();
      if (!currentVideo || !currentVideo.duration) return;
      isSeeking = true;
      const targetTime = (seek.value / 100) * currentVideo.duration;
      timeDisplay.textContent = `${formatTime(targetTime)} / ${formatTime(currentVideo.duration)}`;
      wakeUpBar();
    });

    seek.addEventListener('change', (e) => {
      e.stopPropagation();
      if (currentVideo && currentVideo.duration) {
        currentVideo.currentTime = (seek.value / 100) * currentVideo.duration;
      }
      isSeeking = false;
      e.currentTarget.blur();
    });

    // Expandable Interactive Upsell Pill
    const proWrapper = document.createElement('button');
    proWrapper.id = 'ig-ctrl-pro-btn'; 
    proWrapper.type = 'button';
    proWrapper.className = 'ig-ctrl-pro-wrapper';
    proWrapper.setAttribute('title', 'Get Lifetime Access (Auto-Scroll, Speed, 4K Capture)');
    
    proWrapper.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); 
      e.currentTarget.blur();
      window.open('https://payhip.com/b/uqh4z', '_blank');
    });

    const proLabel = document.createElement('span');
    proLabel.className = 'ig-ctrl-pro-label';
    proLabel.textContent = 'UNLOCK PRO';

    const proFeatures = document.createElement('div');
    proFeatures.className = 'ig-ctrl-pro-features';

    // Mock 1: Auto-Scroll (Miniature Liquid Switch)
    const mockSwitchTrack = document.createElement('div');
    mockSwitchTrack.className = 'ig-ctrl-mock-switch-track';
    const mockSwitchThumb = document.createElement('div');
    mockSwitchThumb.className = 'ig-ctrl-mock-switch-thumb';
    mockSwitchTrack.appendChild(mockSwitchThumb);

    // Mock 2: Speed (Text)
    const mockSpeed = document.createElement('div');
    mockSpeed.className = 'ig-ctrl-mock-text';
    mockSpeed.textContent = '2x';

    // Mock 3: 4K Capture (Camera)
    const mockCap = document.createElement('div');
    mockCap.className = 'ig-ctrl-mock-icon';
    mockCap.appendChild(createSvgIcon(ICONS.capture));

    proFeatures.appendChild(mockSwitchTrack);
    proFeatures.appendChild(mockSpeed);
    proFeatures.appendChild(mockCap);

    proWrapper.appendChild(proLabel);
    proWrapper.appendChild(proFeatures);

    bar.addEventListener('mouseenter', wakeUpBar);
    bar.addEventListener('mousemove', wakeUpBar);

    bar.appendChild(playBtn);
    bar.appendChild(seek);
    bar.appendChild(timeDisplay);
    bar.appendChild(volContainer);
    bar.appendChild(proWrapper);

    document.body.appendChild(bar);
  }

  function wakeUpBar() {
    const bar = document.getElementById('ig-ctrl-bar');
    if (!bar) return;
    
    bar.classList.add('ig-ctrl-visible');
    bar.classList.remove('ig-ctrl-hidden');
    
    if (hideTimeout) clearTimeout(hideTimeout);
    
    hideTimeout = setTimeout(() => {
      if (!isSeeking && !document.querySelector('.ig-ctrl-vol-container:hover')) {
        bar.classList.remove('ig-ctrl-visible');
        bar.classList.add('ig-ctrl-hidden');
      }
    }, 2500); 
  }

  document.addEventListener('mousemove', (e) => {
    if (!currentVideo) return;
    const rect = currentVideo.getBoundingClientRect();
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      wakeUpBar();
    }
  });

  function togglePlay() {
    if (!currentVideo) return;
    if (currentVideo.paused) {
      currentVideo.play().catch(() => {});
    } else {
      currentVideo.pause();
    }
    updatePlayButtonIcon();
    wakeUpBar();
  }

  function toggleMute() {
    globalMuted = !globalMuted;
    
    if (!globalMuted && globalVolume === 0) {
      globalVolume = lastVolume > 0 ? lastVolume : 1;
    }
    
    if (currentVideo) {
      currentVideo.muted = globalMuted;
      currentVideo.volume = globalMuted ? 0 : globalVolume;
    }
    
    const volSlider = document.getElementById('ig-ctrl-vol-slider');
    if (volSlider) {
      volSlider.value = globalMuted ? 0 : globalVolume;
    }
    
    updateVolumeIcon();
    wakeUpBar();
  }

  function updatePlayButtonIcon() {
    const playBtn = document.getElementById('ig-ctrl-play');
    if (!playBtn) return;
    const isPaused = !currentVideo || currentVideo.paused;
    const path = playBtn.querySelector('path');
    if (path) {
      path.setAttribute('d', isPaused ? ICONS.play : ICONS.pause);
    }
    playBtn.setAttribute('aria-label', isPaused ? 'Play' : 'Pause');
  }

  function updateVolumeIcon() {
    const muteBtn = document.getElementById('ig-ctrl-mute');
    if (!muteBtn) return;
    
    const isMuted = globalMuted || globalVolume === 0;
    const path = muteBtn.querySelector('path');
    if (path) {
      path.setAttribute('d', isMuted ? ICONS.volumeOff : ICONS.volumeOn);
    }
    muteBtn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
  }

  document.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
    if (isInput || !currentVideo) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      currentVideo.currentTime = Math.max(0, currentVideo.currentTime - 5);
      wakeUpBar();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      currentVideo.currentTime = Math.min(currentVideo.duration || Infinity, currentVideo.currentTime + 5);
      wakeUpBar();
    } else if (e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleMute();
    }
  }, true);

  function syncState() {
    if (!currentVideo) return;
    
    updatePlayButtonIcon();
    
    if (currentVideo.muted !== globalMuted) {
        currentVideo.muted = globalMuted;
    }
    if (currentVideo.volume !== globalVolume) {
        currentVideo.volume = globalVolume;
    }
    
    const volSlider = document.getElementById('ig-ctrl-vol-slider');
    if (volSlider && !document.querySelector('.ig-ctrl-vol-container:hover')) {
      const expectedUIValue = globalMuted ? 0 : globalVolume;
      if (parseFloat(volSlider.value) !== expectedUIValue) {
        volSlider.value = expectedUIValue;
        updateVolumeIcon();
      }
    }

    const seek = document.getElementById('ig-ctrl-seek');
    const timeDisplay = document.getElementById('ig-ctrl-time');
    const bar = document.getElementById('ig-ctrl-bar');

    if (!isSeeking && currentVideo.duration) {
      const currentTime = currentVideo.currentTime;
      const duration = currentVideo.duration;

      const progress = (currentTime / duration) * 100;
      if (seek) seek.value = progress.toString();
      if (timeDisplay) timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }

    if (bar) {
      const rect = currentVideo.getBoundingClientRect();
      const isNarrow = rect.width < 500;
      if (isNarrow) {
        bar.classList.add('ig-ctrl-narrow');
        bar.classList.remove('ig-ctrl-wide');
      } else {
        bar.classList.add('ig-ctrl-wide');
        bar.classList.remove('ig-ctrl-narrow');
      }

      bar.style.left = `${rect.left + (rect.width / 2)}px`;
      const safeWidth = Math.max(280, rect.width - 24);
      bar.style.width = isNarrow ? `${safeWidth}px` : 'max-content';
      bar.style.maxWidth = `${safeWidth}px`; 

      const barHeight = bar.offsetHeight || (isNarrow ? 74 : 52); 
      bar.style.top = `${rect.bottom - barHeight - 16}px`;
    }
  }

  const observerOptions = { threshold: [0.5, 0.75, 0.95] };
  const intersectionObserver = new IntersectionObserver((entries) => {
    let bestCandidate = null;
    let maxRatio = 0;
    entries.forEach((entry) => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        bestCandidate = entry.target;
      }
    });

    if (bestCandidate && maxRatio > 0.5) {
      currentVideo = bestCandidate;
      wakeUpBar(); 
      syncState();
    }
  }, observerOptions);

  const observedVideos = new WeakSet();
  function scanForVideos() {
    document.querySelectorAll('video').forEach((video) => {
      if (!observedVideos.has(video)) {
        observedVideos.add(video);
        intersectionObserver.observe(video);
        if (!currentVideo) currentVideo = video;
      }
    });
  }

  const mutationObserver = new MutationObserver(scanForVideos);

  function init() {
    injectNativeOverride();
    buildControlBar();
    scanForVideos();
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    if (updateIntervalId) clearInterval(updateIntervalId);
    updateIntervalId = setInterval(syncState, 30); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();