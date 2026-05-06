const chapters = [
  {
    id: 'k01', label: 'Kapitola 01', title: 'Zmizení archiváře', caseNo: 'CZ-POL/1847-09', status: 'aktivní vyšetřování',
    intro: 'Bezpečnostní kamera zachytila poslední pohyb správce archivu ve 22:13. V databázi zůstaly tři neuzavřené záznamy.',
    videoTitle: 'ZÁZNAM 01-A: Příjezd hlídky', audioTitle: 'DISPEČINK: šum rádiové stanice',
    slides: [
      { type: 'single', badge: 'Výpověď svědka', question: 'Který údaj z výpovědi se neshoduje s časovou osou případu?', options: ['Svědek slyšel sirénu ve 22:06', 'Archivář odešel bočním východem ve 22:13', 'Ostraha kontrolovala patro ve 22:40'], correct: 'Svědek slyšel sirénu ve 22:06', hint: 'Porovnej výpověď s časem příjezdu hlídky v úvodním záznamu.' },
      { type: 'text', badge: 'Terminál evidence', question: 'Zadej třípísmenný kód složky, která se objevuje v poznámce „Modrý klíč otevírá A7“.', answer: 'A7M', placeholder: 'např. X9B', hint: 'První dvě pozice jsou v poznámce doslova, třetí odkazuje na barvu.' },
      { type: 'multi', badge: 'Stopa z místa činu', question: 'Vyber předměty, které patří do zapečetěného důkazního sáčku.', options: ['Magnetická karta', 'Sklenice se rtěnkou', 'Neoznačený USB disk', 'Mapa metra'], correct: ['Magnetická karta', 'Neoznačený USB disk'], hint: 'Důkazy musí souviset s přístupem do archivu nebo datovým únikem.' },
    ],
  },
  {
    id: 'k02', label: 'Kapitola 02', title: 'Tichá frekvence', caseNo: 'CZ-POL/1847-10', status: 'utajeno',
    intro: 'V rádiové komunikaci se objevuje opakovaný impuls. Analytici žádají hráče o ověření vzoru a identifikaci volacího znaku.',
    videoTitle: 'ZÁZNAM 02-C: Noční vysílač', audioTitle: 'AUDIOSTOPA: 4 krátké pulzy',
    slides: [
      { type: 'order', badge: 'Rekonstrukce', question: 'Seřaď kroky vyšetřování v logickém pořadí.', options: ['Zajistit vysílač', 'Porovnat frekvenci', 'Vyslechnout technika'], correct: ['Zajistit vysílač', 'Porovnat frekvenci', 'Vyslechnout technika'], hint: 'Nejdřív se zajišťuje fyzická stopa, pak analýza a nakonec výslech.' },
      { type: 'single', badge: 'Volací znak', question: 'Který volací znak odpovídá čtyřem krátkým pulzům?', options: ['ECHO-4', 'RAVEN-2', 'DELTA-7'], correct: 'ECHO-4', hint: 'Hledej označení, které přímo připomíná počet pulzů.' },
    ],
  },
];

const state = {
  chapterIndex: 0,
  slideIndex: 0,
  responses: {},
  hintVisible: false,
  accessLog: ['LOGIN OK: vyšetřovatel_host', 'DB SYNC: evidence načtena'],
};

const icon = {
  shield: '🛡️', db: '▦', lock: '🔒', siren: '🚨', video: '▣', play: '▶', audio: '≋', book: '📖', help: '?', ok: '✓', radio: '◉', search: '⌕', fingerprint: '◎', terminal: '⌁', alert: '⚠', next: '›',
};

function playTone(kind = 'beep') {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = kind === 'siren' ? 'sawtooth' : 'square';
  oscillator.frequency.setValueAtTime(kind === 'siren' ? 420 : 760, audioContext.currentTime);
  if (kind === 'siren') oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.22);
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.32);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.34);
}

function normalize(value) {
  return String(value || '').trim().toLocaleUpperCase('cs-CZ').replace(/\s+/g, '');
}

function isCorrect(slide, response) {
  if (slide.type === 'text') return normalize(response) === normalize(slide.answer);
  if (slide.type === 'multi') return JSON.stringify([...(Array.isArray(response) ? response : [])].sort()) === JSON.stringify([...slide.correct].sort());
  if (slide.type === 'order') return JSON.stringify(response || slide.options) === JSON.stringify(slide.correct);
  return response === slide.correct;
}

function responseKey() {
  return `${chapters[state.chapterIndex].id}-${state.slideIndex}`;
}

function setResponse(value) {
  state.responses[responseKey()] = value;
  render();
}

function totalProgress() {
  const total = chapters.reduce((sum, chapter) => sum + chapter.slides.length, 0);
  const done = chapters.reduce((sum, chapter) => sum + chapter.slides.filter((slide, index) => isCorrect(slide, state.responses[`${chapter.id}-${index}`])).length, 0);
  return Math.round((done / total) * 100);
}

function renderQuestion(slide, response) {
  if (slide.type === 'text') {
    return `<input class="answer-input" value="${escapeHtml(response || '')}" placeholder="${slide.placeholder}" aria-label="Odpověď" data-action="text-answer" />`;
  }
  if (slide.type === 'order') {
    const order = Array.isArray(response) && response.length ? response : slide.options;
    return `<ol class="timeline-list">${order.map((option, index) => `<li><span>${option}</span><div><button data-action="move" data-index="${index}" data-direction="-1" aria-label="Posunout nahoru">↑</button><button data-action="move" data-index="${index}" data-direction="1" aria-label="Posunout dolů">↓</button></div></li>`).join('')}</ol>`;
  }
  const current = Array.isArray(response) ? response : [];
  return `<div class="option-grid">${slide.options.map((option) => {
    const selected = slide.type === 'multi' ? current.includes(option) : response === option;
    return `<button class="option ${selected ? 'selected' : ''}" data-action="${slide.type === 'multi' ? 'toggle' : 'select'}" data-value="${escapeHtml(option)}"><span>${slide.type === 'multi' ? icon.fingerprint : icon.search}</span>${option}</button>`;
  }).join('')}</div>`;
}

function render() {
  const chapter = chapters[state.chapterIndex];
  const slide = chapter.slides[state.slideIndex];
  const response = state.responses[responseKey()];
  const solved = isCorrect(slide, response);
  const progress = totalProgress();
  document.querySelector('#app').innerHTML = `
    <aside class="sidebar">
      <div class="seal"><span class="seal-icon">${icon.shield}</span><div><strong>POL-DB</strong><span>Kriminální archiv</span></div></div>
      <nav>${chapters.map((item, index) => `<button class="${index === state.chapterIndex ? 'active' : ''}" data-action="chapter" data-index="${index}"><span>${icon.db}</span><span>${item.label}</span></button>`).join('')}</nav>
      <section class="progress-card"><span>Stav spisu</span><strong>${progress}%</strong><div class="progress"><i style="width:${progress}%"></i></div></section>
      <section class="terminal-log"><header>${icon.terminal} auditní log</header>${state.accessLog.map((entry) => `<code>${entry}</code>`).join('')}</section>
    </aside>
    <section class="workspace">
      <header class="topbar"><div><span class="eyebrow">${icon.lock} přístup úroveň 3</span><h1>${chapter.title}</h1><p>Spis ${chapter.caseNo} · ${chapter.status}</p></div><button class="sound" data-action="sound">${icon.siren} test zvuku</button></header>
      <section class="intro-grid">
        <article class="video-card"><div class="video-frame"><span class="big-icon">${icon.video}</span><button data-action="intro">${icon.play} přehrát intro</button><span>${chapter.videoTitle}</span></div></article>
        <article class="brief-card"><span>${icon.book} shrnutí kapitoly</span><p>${chapter.intro}</p><button data-action="audio">${icon.audio} ${chapter.audioTitle}</button></article>
      </section>
      <section class="case-panel">
        <div class="panel-header"><span class="case-badge">${slide.badge}</span><span>Slide ${state.slideIndex + 1}/${chapter.slides.length}</span></div>
        <h2>${slide.question}</h2>${renderQuestion(slide, response)}
        <div class="actions"><button class="hint" data-action="hint">${icon.help} nápověda</button><button class="primary" data-action="next">pokračovat ${icon.next}</button></div>
        ${state.hintVisible ? `<aside class="hint-box">${icon.alert} ${slide.hint}</aside>` : ''}
        <div class="verdict ${solved ? 'ok' : 'pending'}">${solved ? icon.ok : icon.radio} ${solved ? 'Odpověď odpovídá databázi.' : 'Čeká se na správné vyhodnocení.'}</div>
      </section>
    </section>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const chapter = chapters[state.chapterIndex];
  const slide = chapter.slides[state.slideIndex];
  const response = state.responses[responseKey()];
  const action = target.dataset.action;

  if (action === 'chapter') {
    state.chapterIndex = Number(target.dataset.index);
    state.slideIndex = 0;
    state.hintVisible = false;
    playTone('beep');
  }
  if (action === 'sound' || action === 'intro') playTone('siren');
  if (action === 'audio') playTone('beep');
  if (action === 'hint') state.hintVisible = !state.hintVisible;
  if (action === 'select') setResponse(target.dataset.value);
  if (action === 'toggle') {
    const current = Array.isArray(response) ? response : [];
    const value = target.dataset.value;
    setResponse(current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  }
  if (action === 'move') {
    const order = Array.isArray(response) && response.length ? [...response] : [...slide.options];
    const index = Number(target.dataset.index);
    const nextIndex = index + Number(target.dataset.direction);
    if (nextIndex >= 0 && nextIndex < order.length) [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
    setResponse(order);
  }
  if (action === 'next') {
    const solved = isCorrect(slide, response);
    state.accessLog = [`CHECK: ${slide.badge} ${solved ? 'ověřeno' : 'čeká'}`, ...state.accessLog].slice(0, 5);
    state.hintVisible = false;
    if (state.slideIndex < chapter.slides.length - 1) state.slideIndex += 1;
    else {
      state.chapterIndex = (state.chapterIndex + 1) % chapters.length;
      state.slideIndex = 0;
    }
    playTone('beep');
  }
  render();
});

document.addEventListener('input', (event) => {
  if (event.target.matches('[data-action="text-answer"]')) setResponse(event.target.value);
});

render();
