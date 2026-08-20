import { animateFlyToDeck, animateFlyToTrack } from './Animation.js';
import { projects } from './data.js';

export class App {
  constructor({ track, deck, skillsPanel, projectPanel }) {
    this.projects = projects;
    this.track = track;
    this.deck = deck;
    this.skillsPanel = skillsPanel;
    this.projectPanel = projectPanel;
    this.state = 'BROWSE'; // BROWSE | SKILLS | PROJECT
    this.currentPage = 'home';

    this.backBtn = document.getElementById('back-btn');
    this.pages = {
      home: document.getElementById('main-menu'),
      about: document.getElementById('about-page'),
      projects: document.getElementById('projects-page'),
      future: document.getElementById('future-page')
    };
  }

  navigateTo(pageName) {
    if (!this.pages[pageName]) return;
    this.currentPage = pageName;

    Object.values(this.pages).forEach(page => {
      if (page) page.classList.add('hidden');
    });

    this.pages[pageName].classList.remove('hidden');
    if (pageName === 'home') {
      this.backBtn.classList.add('hidden');
    } else {
      this.backBtn.classList.remove('hidden');
    }

    if (pageName !== 'projects') {
      this.closeProject();
    }
  }

  flyAllToDeck() {
    document.getElementById('track').classList.add('track-up');

    const cards = this.track.getCards();
    const cardsRects = cards.map(card => card.getBoundingClientRect());
    cards.forEach((card, i) => {
      setTimeout(() => {
        animateFlyToDeck(card, cardsRects[i], () => {
          this.deck.add(card, i);
        });
      }, i * 50);
    });
    this.state = 'SKILLS';
    this.skillsPanel.classList.add('active');
  }

  flyAllToTrack() {
    const cards = this.deck.getCards().reverse();
    const cardsRects = cards.map(card => card.getBoundingClientRect());
    cards.forEach((card, i) => {
      setTimeout(() => {
        animateFlyToTrack(card, cardsRects[i], () => {
          this.track.add(card, i);
        });
      }, i * 40);
    });
    this.state = 'BROWSE';
    this.skillsPanel.classList.remove('active');
    document.getElementById('track').classList.remove('track-up');
    document.querySelectorAll('.skill-btn').forEach(b => b.classList.remove('active'));
  }

  filterBySkill(skill) {
    document.getElementById('track').classList.add('track-up');
    this.state = "SKILLS";
    this.skillsPanel.classList.add('active');

    setTimeout(() => {
      const deckCards = this.deck.getCards();
      const allCards = [...deckCards, ...this.track.getCards()];
      const cardsRects = allCards.map(card => card.getBoundingClientRect());
      allCards.forEach((card, i) => {
        const skills = card.dataset.skills.split(' ');
        const matches = skill === 'all' || skills.includes(skill);
        if (card.classList.contains('on-track') && matches) {
          return;
        } else if (card.classList.contains('on-track') && !matches) {
          animateFlyToDeck(card, cardsRects[i], () => {
            this.deck.add(card, i);
          });
        } else if (card.classList.contains('in-deck') && !matches) {
          return;
        } else if (card.classList.contains('in-deck') && matches) {
          animateFlyToTrack(card, cardsRects[i], () => {
            this.track.add(card, i);
          });
        } else {
          console.log("matches = " + matches + ", " + card.classList);
        }
      });
      this.state = 'FILTERED';
    }, 300);
  }

  openProject(id) {
    const project = this.projects.find(p => p.id === id);
    if (!project) {
      console.log("No project found with id: " + id);
      return;
    }
    this.projectPanel.fill(project);
    this.projectPanel.show();
    this.state = 'PROJECT';
  }

  closeProject() {
    this.projectPanel.hide();
    this.state = 'BROWSE';
  }
}