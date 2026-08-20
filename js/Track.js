export class Track {
    
    constructor(el) {
        this.el = el;
        this.cards = [];
    }

    render(projects) {
        this.el.innerHTML = projects.map(p => `
            <div class="card on-track" data-id="${p.id}" data-skills="${p.skills.join(' ')}">
                <!-- Media / Image Container -->
                <div class="card-media">
                    ${p.img ? `<img class="card__img" src="${p.img}" alt="${p.title}" onerror="this.remove()" />` : ''}
                </div>

                <!-- Card Main Content -->
                <div class="card-body">
                    <div class="card__header">
                        <span class="card__main-color" style="background-color: ${p.colour}; color: ${p.colour};"></span>
                        <h3 class="card__title">${p.title}</h3>
                    </div>

                    <p class="card__desc">${p.shortDescription}</p>

                    <!-- Skill Tags -->
                    <ul class="card__skills">
                        ${p.skills.map(s => `<li class="card__skill">${s}</li>`).join('')}
                    </ul>

                    <!-- Footer Actions -->
                    <div class="card__footer">
                        <a class="card__link" href="${p.repo}" target="_blank" rel="noopener">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        this.cards = Array.from(this.el.children);
    }
    
    getCards() { return Array.from(this.el.children); }
    getCardById(id) { return this.el.querySelector(`[data-id="${id}"]`); }

    add(cardEl, index) {
      this.el.appendChild(cardEl);
      cardEl.classList.remove('in-deck');
      cardEl.classList.add('on-track');

      let cardContent = cardEl.querySelector(".card-body")
      cardContent.style.visibility = "visible";
    }

    setupDrag() {
        let isDragging = false;
        let startX;
        let scrollLeft;
        let dragMoved = false;
        let mouseDownX = 0;
        const DRAG_THRESHOLD = 5;

        this.el.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            dragMoved = false;
            mouseDownX = e.pageX;
            startX = e.pageX - this.el.offsetLeft;
            scrollLeft = this.el.scrollLeft;
            this.el.classList.add("is-dragging");
        });

        this.el.addEventListener('mouseleave', () => {
            isDragging = false;
            this.el.classList.remove("is-dragging");
        });

        this.el.addEventListener('mouseup', () => {
            isDragging = false;
            this.el.classList.remove("is-dragging");
        });

        this.el.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const mouseDelta = startX - e.clientX;
            this.el.scrollLeft = scrollLeft + mouseDelta;
            if (Math.abs(e.pageX - mouseDownX) > DRAG_THRESHOLD) {
                dragMoved = true;
            }
        });

        this.el.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.el.scrollBy({
                    left: e.deltaY * 5,
                    behavior: 'smooth'
                });
            }
        });

        this.hasDragged = () => dragMoved;
    }

    setupCards() {
        
    }
}


    