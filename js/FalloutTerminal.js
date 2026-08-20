export class FalloutTerminal {
  constructor(containerEl) {
    this.container = containerEl;
    this.symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', '\\', '|', ';', ':', '\'', '"', ',', '.', '/', '<', '>', '?'];
    this.words = ['ABOUT_ME', 'PROJECTS', 'FUTURE_ITEM', 'TIMUR_MUKMINOV', 'PORTFOLIO'];
    this.timer = null;
    this.cycleInterval = null;
  }

  getRandomSymbol() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  generateMemory() {
    if (!this.container) return;
    if (this.timer) clearInterval(this.timer);
    if (this.cycleInterval) clearInterval(this.cycleInterval);

    let baseAddr = 0xF7D0;
    const rows = 14;
    let html = '';

    const wordPositions = [
      { row: 2, col: 0, word: 'ABOUT_ME' },
      { row: 5, col: 1, word: 'PROJECTS' },
      { row: 8, col: 0, word: 'FUTURE_ITEM' },
      { row: 11, col: 1, word: 'TIMUR_MUKMINOV' }
    ];

    const targets = [];

    for (let r = 0; r < rows; r++) {
      const addr1 = '0x' + (baseAddr).toString(16).toUpperCase();
      baseAddr += 12;
      const addr2 = '0x' + (baseAddr).toString(16).toUpperCase();
      baseAddr += 12;

      let rawStr1 = this.generateChunk(12);
      let rawStr2 = this.generateChunk(12);

      const match1 = wordPositions.find(wp => wp.row === r && wp.col === 0);
      let chunk1 = { plain: rawStr1, html: rawStr1 };
      if (match1) {
        const startIdx1 = Math.floor(Math.random() * (12 - match1.word.length));
        chunk1 = this.embedWord(rawStr1, match1.word, startIdx1);
      }

      const match2 = wordPositions.find(wp => wp.row === r && wp.col === 1);
      let chunk2 = { plain: rawStr2, html: rawStr2 };
      if (match2) {
        const startIdx2 = Math.floor(Math.random() * (12 - match2.word.length));
        chunk2 = this.embedWord(rawStr2, match2.word, startIdx2);
      }

      targets.push({
        plainStr1: chunk1.plain,
        htmlStr1: chunk1.html,
        plainStr2: chunk2.plain,
        htmlStr2: chunk2.html
      });

      // gen initial html
      const initStr1 = this.generateChunk(12);
      const initStr2 = this.generateChunk(12);

      html += `<div class="memory-row">` +
        `<span class="memory-addr">${addr1}</span> <span class="memory-chars" data-row="${r}" data-col="1">${initStr1}</span>` +
        `<span class="memory-spacer"></span>` +
        `<span class="memory-addr">${addr2}</span> <span class="memory-chars" data-row="${r}" data-col="2">${initStr2}</span>` +
        `</div>`;
    }

    this.container.innerHTML = html;

    this.animateCycle(targets);
  }

  embedWord(chunk, word, startIdx) {
    if (word.length >= chunk.length) {
      const trimmed = word.substring(0, chunk.length);
      return {
        plain: trimmed,
        html: `<span class="memory-word">${trimmed}</span>`
      };
    }
    const plain = chunk.substring(0, startIdx) + word + chunk.substring(startIdx + word.length);
    const html = chunk.substring(0, startIdx) + `<span class="memory-word">${word}</span>` + chunk.substring(startIdx + word.length);
    return { plain, html };
  }

  generateChunk(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.getRandomSymbol();
    }
    return result;
  }

  animateCycle(targets) {
    const totalSteps = 22; 
    let currentStep = 0;

    const charNodes = this.container.querySelectorAll('.memory-chars');

    this.cycleInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;

      charNodes.forEach(node => {
        const row = parseInt(node.dataset.row);
        const col = parseInt(node.dataset.col);
        const targetObj = targets[row];
        const targetPlain = col === 1 ? targetObj.plainStr1 : targetObj.plainStr2;
        const targetHtml = col === 1 ? targetObj.htmlStr1 : targetObj.htmlStr2;

        if (currentStep >= totalSteps) {
          node.innerHTML = targetHtml;
        } else {
          const numLocked = Math.floor(progress * targetPlain.length);
          let currentDisplay = '';

          for (let i = 0; i < targetPlain.length; i++) {
            if (i < numLocked) {
              currentDisplay += targetPlain[i];
            } else {
              currentDisplay += this.getRandomSymbol();
            }
          }
          node.textContent = currentDisplay;
        }
      });

      if (currentStep >= totalSteps) {
        clearInterval(this.cycleInterval);
        this.cycleInterval = null;
        this.startFlicker();
      }
    }, 40);
  }

  startFlicker() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      const chars = this.container.querySelectorAll('.memory-chars');
      if (chars.length === 0) return;
      const randomTarget = chars[Math.floor(Math.random() * chars.length)];
      
      const textNodes = [];
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
          textNodes.push(node);
        } else {
          node.childNodes.forEach(walk);
        }
      };
      walk(randomTarget);

      if (textNodes.length > 0) {
        const selectedNode = textNodes[Math.floor(Math.random() * textNodes.length)];
        const str = selectedNode.nodeValue;
        const idx = Math.floor(Math.random() * str.length);
        const newSymbol = this.getRandomSymbol();
        selectedNode.nodeValue = str.substring(0, idx) + newSymbol + str.substring(idx + 1);
      }
    }, 400);
  }

  initSysInfo(sysinfoEl) {
    if (!sysinfoEl) return;

    const ua = navigator.userAgent;
    let browser = "UNKNOWN";
    if (ua.includes("Edg/")) browser = "MS Edge";
    else if (ua.includes("Chrome/")) browser = "Chrome";
    else if (ua.includes("Firefox/")) browser = "Firefox";
    else if (ua.includes("Safari/")) browser = "Safari";
    else if (ua.includes("OPR/") || ua.includes("Opera/")) browser = "Opera";

    let os = "UNKNOWN";
    if (navigator.platform && navigator.platform.startsWith("Win")) os = "Windows";
    else if (navigator.platform && navigator.platform.startsWith("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const viewportRes = `${window.innerWidth}x${window.innerHeight}`;
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} THREADS` : "N/A";
    const lang = (navigator.language || "en-US").toUpperCase();
    const netStatus = navigator.onLine ? "ONLINE" : "OFFLINE";
    const mem = navigator.deviceMemory ? `${navigator.deviceMemory}GB RAM` : null;

    const getTime = () => new Date().toLocaleTimeString();

    sysinfoEl.innerHTML = `
      <div class="fallout-sysinfo__line">> SYSTEM DIAGNOSTICS:</div>
      <div class="fallout-sysinfo__line">BROWSER:   ${browser} (${lang})</div>
      <div class="fallout-sysinfo__line">PLATFORM:  ${os}</div>
      <div class="fallout-sysinfo__line">DISPLAY:   ${screenRes}</div>
      <div class="fallout-sysinfo__line">VIEWPORT:  ${viewportRes}</div>
      <div class="fallout-sysinfo__line">CPU_LOGIC: ${cores}${mem ? ` | ${mem}` : ''}</div>
      <div class="fallout-sysinfo__line">NET_STATE: ${netStatus}</div>
      <div class="fallout-sysinfo__prompt">> TIME_STAMP: <span id="sysinfo-time">${getTime()}</span> <span class="blinking-cursor">&#9608;</span></div>
    `;

    if (this.sysinfoTimer) clearInterval(this.sysinfoTimer);
    this.sysinfoTimer = setInterval(() => {
      const timeEl = sysinfoEl.querySelector('#sysinfo-time');
      if (timeEl) timeEl.textContent = getTime();
    }, 1000);

    window.addEventListener('resize', () => {
      const lines = sysinfoEl.querySelectorAll('.fallout-sysinfo__line');
      if (lines.length > 4) {
        lines[4].textContent = `VIEWPORT:  ${window.innerWidth}x${window.innerHeight}`;
      }
    });
  }
}
