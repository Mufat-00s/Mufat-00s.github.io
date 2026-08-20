import { projects } from './data.js';
import { Track } from './Track.js';
import { Deck } from './Deck.js';
import { App } from './App.js';
import { ProjectPanel } from './ProjectPanel.js';
import { FalloutTerminal } from './FalloutTerminal.js';

const track = new Track(document.getElementById('track'));
const deck = new Deck(document.getElementById('deck'));
const skillsPanel = document.getElementById('skills-panel');
const projectPanel = new ProjectPanel(document.getElementById('project-panel'));

track.render(projects);
track.setupDrag();

const app = new App({ track, deck, skillsPanel, projectPanel });

const falloutMemory = new FalloutTerminal(document.getElementById('fallout-memory'));
falloutMemory.generateMemory();
falloutMemory.initSysInfo(document.getElementById('fallout-sysinfo'));



// the background animation
const canvas = document.getElementById('dispmap');
const ctx = canvas.getContext('2d');
const size = 256;
const img = ctx.createImageData(size, size);
const strength = 0.35;

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const nx = (x / size) * 2 - 1; // -1 to 1
    const ny = (y / size) * 2 - 1;
    const r2 = nx * nx + ny * ny;
    const factor = strength * r2;

    const dx = nx * factor;
    const dy = ny * factor;

    const i = (y * size + x) * 4;
    img.data[i]     = 128 + dx * 127;
    img.data[i + 1] = 128 + dy * 127;
    img.data[i + 2] = 0;
    img.data[i + 3] = 255;
  }
}
ctx.putImageData(img, 0, 0);
document.getElementById('dispImage')
  .setAttribute('xlink:href', canvas.toDataURL());






// Skills button
document.getElementById('scroll-to-skills').addEventListener('click', () => {
  if (app.state === 'BROWSE') {
    document.getElementsByClassName("skill-btn")[0].classList.add('active');
    app.filterBySkill('all');
  }
  else {
    app.state = 'BROWSE';
    app.flyAllToTrack();
  }
});

// Filter buttons
document.querySelectorAll('.skill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    const isActive = btn.classList.contains('active');
    document.querySelectorAll('.skill-btn').forEach(b => b.classList.remove('active'));
    if (isActive) {
      app.flyAllToTrack();
    } else {
      btn.classList.add('active');
      app.filterBySkill(filter);
    }
  });
});

// Main Menu destination buttons
document.querySelectorAll('.main-menu__item').forEach(item => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;
    app.navigateTo(page);
  });
});

// Top-left Back button
document.getElementById('back-btn').addEventListener('click', () => {
  app.navigateTo('home');
});

//project buttons
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    if (track.hasDragged && track.hasDragged()) return; // suppress click after drag
    console.log("card clicked", card.dataset.id);
    app.openProject(card.dataset.id);
  })
})

// glowing line on left of about me
function initPanelGlowLine() {
  const contentPanels = document.querySelectorAll('.content-panel');

  contentPanels.forEach(panel => {
    let track = panel.querySelector('.panel-left-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'panel-left-track';
      const line = document.createElement('div');
      line.className = 'hover-glow-line';
      track.appendChild(line);
      panel.prepend(track);
    }

    const glowLine = track.querySelector('.hover-glow-line');
    if (!glowLine) return;

    let isHovering = false;
    let lastClientY = 0;
    const lineHeight = 40;

    function updateTrackHeight() {
      const fullHeight = Math.max(panel.scrollHeight, panel.clientHeight);
      track.style.height = `${fullHeight}px`;
    }

    function updateLinePosition() {
      if (!isHovering) return;
      updateTrackHeight();
      const rect = panel.getBoundingClientRect();
      const relativeY = lastClientY - rect.top + panel.scrollTop;
      const targetY = relativeY - (lineHeight / 2);
      
      const fullHeight = Math.max(panel.scrollHeight, panel.clientHeight);
      const maxY = fullHeight - lineHeight;
      const clampedY = Math.max(0, Math.min(targetY, maxY));

      glowLine.style.transform = `translateY(${clampedY}px)`;
    }

    panel.addEventListener('mouseenter', (e) => {
      isHovering = true;
      glowLine.style.opacity = '1';
      lastClientY = e.clientY;
      updateLinePosition();
    });

    panel.addEventListener('mousemove', (e) => {
      isHovering = true;
      glowLine.style.opacity = '1';
      lastClientY = e.clientY;
      updateLinePosition();
    });

    panel.addEventListener('mouseleave', () => {
      isHovering = false;
      glowLine.style.opacity = '0';
    });

    panel.addEventListener('scroll', () => {
      if (isHovering) {
        updateLinePosition();
      }
    });

    updateTrackHeight();
    window.addEventListener('resize', updateTrackHeight);
  });
}

initPanelGlowLine();





















































































// import { projects } from './data.js'

// const horizScrollContainer = document.getElementById("horiz-scroll-container");
// const originalCards = Array.from(horizScrollContainer.children);
// const openSkillsButton = document.getElementById("scroll-to-skills");

// function renderTrack() {
//     horizScrollContainer.innerHTML = projects.map(p =>
//         `<div class="card" data-id="${p.id}" data-skill="${p.skill}" style="background:${p.color}">${p.title}</div>`
//     ).join('')
// }

// let scrollStart = 0;
// let scrollingState = false;
// let scrollMultiplier = 5;

// let mouseDownAt = 0;
// let isDragging = false;
// let leftScrollStart = 0;
// let singleSetWidth = 0;

// function initCards() {
//     let clonedBefore = originalCards.map(card => card.cloneNode(true));
//     let clonedAfter = originalCards.map(card => card.cloneNode(true));
//     horizScrollContainer.prepend(...clonedBefore);
//     horizScrollContainer.append(...clonedAfter);

//     const allCards = Array.from(horizScrollContainer.children);
//     allCards.forEach(card => card.classList.add("on-track"));

//     singleSetWidth = horizScrollContainer.scrollWidth / 3;
//     horizScrollContainer.scrollLeft = singleSetWidth;
// }

// function handleWheel(e) {
//     if (e.deltaY !== 0) {
//         e.preventDefault();
//         horizScrollContainer.scrollBy({
//             left: e.deltaY * scrollMultiplier, // Adjust multiplier for scroll speed
//             behavior: 'smooth'
//         });
//     }
// }

// function handleMouseDown(e) {
//     e.preventDefault();
//     mouseDownAt = e.clientX;
//     isDragging = true;
//     leftScrollStart = horizScrollContainer.scrollLeft;
//     horizScrollContainer.style.scrollSnapType = "none";
//     horizScrollContainer.style.scrollBehavior = "auto";
// }

// function handleMouseUp(e) {
//     if (!isDragging) return;
//     isDragging = false;
//     horizScrollContainer.style.scrollSnapType = "x mandatory";
//     horizScrollContainer.style.scrollBehavior = "smooth";
// }

// function handleMouseMove(e) {
//     if (!isDragging) return;
//     e.preventDefault();
//     const mouseDelta = mouseDownAt - e.clientX;
//     horizScrollContainer.scrollLeft = leftScrollStart + mouseDelta;
// }

// function handleMouseLeave(e) {
//     isDragging = false;
//     horizScrollContainer.style.scrollSnapType = "x mandatory";
//     horizScrollContainer.style.scrollBehavior = "smooth";
// }

// function handleResize(e) {
//     singleSetWidth = horizScrollContainer.scrollWidth / 3;
// }

// function calculateFlyAngle(cards) {
//     const DECK_MARGIN = 32;          // 2rem right/top margin
//     const DECK_CARD_W = 180;         // 300 * 0.6
//     const DECK_CARD_H = 288;         // 480 * 0.6
//     const deckX = window.innerWidth - DECK_MARGIN - DECK_CARD_W / 2;   // center x of deck card
//     const deckY = DECK_MARGIN + DECK_CARD_H / 2;                        // center y of deck card
//     const deckYRotation = window.innerHeight - DECK_CARD_H / 2;
//     const cardLift = 200;
//     cards.forEach((card, idx) => {
//         const rect = card.getBoundingClientRect();
//         const cardX = rect.left + rect.width / 2;
//         const cardY = rect.top + rect.height / 2;
//         // Angle from card (after lift) toward deck corner
//         const angle = -1 * (Math.atan2(deckYRotation - (cardY - cardLift), deckX - cardX) * (180 / Math.PI) - 90);
//         const dstX = deckX - cardX;
//         const dstY = deckY - cardY;
//         card.style.setProperty("--card-angle", angle + "deg");
//         card.style.setProperty("--card-idx", idx);
//         card.style.setProperty("--card-x", cardX + "px");
//         card.style.setProperty("--card-y", cardY + "px");
//         card.style.setProperty("--dst-x", dstX + "px");
//         card.style.setProperty("--dst-y", dstY + "px");
//         card.style.setProperty("--lift-y", -cardLift + "px");
//     });
// }

// function attachCardAnimationListeners() {
//     const allCards = Array.from(horizScrollContainer.children);
//     allCards.forEach(card => {
//         card.addEventListener("animationend", (e) => {
//             if (e.animationName === "fly-to-deck") {
//                 if (card.classList.contains("flying")) {
//                     card.classList.remove("flying");
//                     card.classList.remove("on-track");
//                     card.classList.add("in-deck");
//                 }
//             } else if (e.animationName === "fly-from-deck") {
//                 card.classList.remove("returning");
//                 card.classList.remove("in-deck");
//                 card.classList.remove("flying");
//                 card.classList.add("on-track");
//             }
//         });
//     });
// }

// const skillsPanel = document.getElementById("skills-panel");
// const skillButtons = document.querySelectorAll(".skill-btn");

// let deckVisible = false;

// function handleSkillFilter(filterCategory, clickedBtn) {
//     const isAlreadyActive = clickedBtn.classList.contains("active");
//     skillButtons.forEach(btn => btn.classList.remove("active"));

//     let targetFilter = filterCategory;
//     if (isAlreadyActive) {
//         targetFilter = null;
//     } else {
//         clickedBtn.classList.add("active");
//     }

//     const allCards = Array.from(horizScrollContainer.children);

//     // 1. Determine which cards will be on track vs in deck
//     const matchingCards = [];
//     const nonMatchingCards = [];

//     allCards.forEach(card => {
//         const cardSkill = card.getAttribute("data-skill");
//         const matches = targetFilter !== null && (targetFilter === "all" || cardSkill === targetFilter);

//         if (matches) {
//             matchingCards.push(card);
//         } else {
//             nonMatchingCards.push(card);
//         }
//     });

//     // 2. Place all matching cards into track layout and remove in-deck class
//     matchingCards.forEach(card => {
//         card.classList.remove("in-deck");
//         card.classList.remove("flying");
//         card.classList.remove("returning");
//     });

//     // Force layout reflow so getBoundingClientRect retrieves accurate track positions
//     void horizScrollContainer.offsetHeight;

//     // 3. Compute fly coordinates for all cards
//     calculateFlyAngle(allCards);

//     // 4. Trigger fly animations
//     matchingCards.forEach(card => {
//         card.classList.remove("on-track");
//         void card.offsetWidth;
//         card.classList.add("returning");
//     });

//     nonMatchingCards.forEach(card => {
//         if (!card.classList.contains("in-deck")) {
//             card.classList.remove("returning");
//             card.classList.remove("on-track");
//             void card.offsetWidth;
//             card.classList.add("flying");
//         } else {
//             card.classList.remove("returning");
//             card.classList.remove("flying");
//             card.classList.remove("on-track");
//             card.classList.add("in-deck");
//         }
//     });
// }

// function handleOpenSkills(e) {
//     e.preventDefault();
//     const allCards = Array.from(horizScrollContainer.children);

//     if (deckVisible) {
//         // Close Skills view -> return all cards to track
//         deckVisible = false;
//         horizScrollContainer.classList.remove("track-up");
//         skillsPanel.classList.remove("active");
//         skillButtons.forEach(btn => btn.classList.remove("active"));

//         allCards.forEach(card => {
//             card.classList.remove("in-deck");
//             card.classList.remove("flying");
//             card.classList.remove("returning");
//         });
//         void horizScrollContainer.offsetHeight;
//         calculateFlyAngle(allCards);
//         allCards.forEach(card => {
//             card.classList.remove("on-track");
//             void card.offsetWidth;
//             card.classList.add("returning");
//         });
//     } else {
//         // Open Skills view -> initially NO skill button is selected
//         deckVisible = true;
//         horizScrollContainer.classList.add("track-up");
//         skillsPanel.classList.add("active");
//         skillButtons.forEach(btn => btn.classList.remove("active"));

//         calculateFlyAngle(allCards);
//         allCards.forEach(card => {
//             card.classList.remove("returning");
//             card.classList.remove("in-deck");
//             card.classList.remove("on-track");
//             void card.offsetWidth;
//             card.classList.add("flying");
//         });
//     }
// }
// renderTrack();
// initCards();
// attachCardAnimationListeners();
// horizScrollContainer.addEventListener("wheel", e => handleWheel(e));
// horizScrollContainer.addEventListener("mousedown", e => handleMouseDown(e));
// openSkillsButton.addEventListener("click", e => handleOpenSkills(e));
// skillButtons.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//         const filter = btn.getAttribute("data-filter");
//         handleSkillFilter(filter, btn);
//     });
// });
// window.addEventListener("mouseup", e => handleMouseUp(e));
// window.addEventListener("mousemove", e => handleMouseMove(e));
// window.addEventListener("resize", e => handleResize(e));


































// let targetScroll = horizScrollContainer.scrollLeft;
// let startScroll = targetScroll;
// let isScrolling = false;
// let snapTimer = null;
// let animationFrameId = null;

// function animate() {
//     const current = horizScrollContainer.scrollLeft;
//     const diff = targetScroll - current;
    
//     if (Math.abs(diff) > 0.5) {
//         horizScrollContainer.scrollLeft += diff * 0.12; // Easing speed (lower = smoother)
//         animationFrameId = requestAnimationFrame(animate);
//     } else {
//         horizScrollContainer.scrollLeft = targetScroll;
//         animationFrameId = null;
//     }
// }

// function snapToCard() {
//     isScrolling = false;
//     if (cards.length === 0) return;

//     const cardWidth = cards[0].offsetWidth;
//     const gap = parseFloat(getComputedStyle(horizScrollContainer).gap) || 0;
//     const cardSpacing = cardWidth + gap;
    
//     // Find where we would naturally land based on current targetScroll
//     let targetIndex = Math.round(targetScroll / cardSpacing);
//     const startIndex = Math.round(startScroll / cardSpacing);
    
//     // Force at least 1 card change if we scrolled in that direction
//     if (targetScroll > startScroll) {
//         if (targetIndex <= startIndex) {
//             targetIndex = startIndex + 1;
//         }
//     } else if (targetScroll < startScroll) {
//         if (targetIndex >= startIndex) {
//             targetIndex = startIndex - 1;
//         }
//     }
    
//     // Clamp to valid card index range
//     targetIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));
    
//     // Calculate centering scrollLeft position
//     const card = cards[targetIndex];
//     const containerWidth = horizScrollContainer.clientWidth;
//     const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    
//     const maxScroll = horizScrollContainer.scrollWidth - horizScrollContainer.clientWidth;
//     targetScroll = cardCenter - containerWidth / 2;
//     targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    
//     // Smoothly animate to the snapped position
//     if (!animationFrameId) {
//         animate();
//     }
// }

// horizScrollContainer.addEventListener("wheel", (evt) => {
//     evt.preventDefault();
    
//     if (!isScrolling) {
//         isScrolling = true;
//         startScroll = horizScrollContainer.scrollLeft;
//     }
    
//     const maxScroll = horizScrollContainer.scrollWidth - horizScrollContainer.clientWidth;
//     targetScroll += evt.deltaY;
//     targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    
//     if (!animationFrameId) {
//         animate();
//     }
    
//     clearTimeout(snapTimer);
//     snapTimer = setTimeout(snapToCard, 150); // Snaps 150ms after scroll input stops
// });