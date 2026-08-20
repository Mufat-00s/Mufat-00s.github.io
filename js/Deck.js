export class Deck {
  constructor(el) {
    this.el = el;
  }


  // not in use i think anymore
  getStackStyle(index) {
    const rot = (index % 3 === 0 ? -4 : index % 3 === 1 ? 3 : -2);
    const x = index * -6;
    const y = index * 6;
    // const rot = 0;
    // const x = 0;
    // const y = 0;
    return `--deck-rot:${rot}deg; --stack-x:${x}px; --stack-y:${y}px; --deck-index:${index}`;
  }

  add(cardEl, index) {
    // cardEl.style.cssText += this.getStackStyle(index);
    this.el.prepend(cardEl);
    cardEl.classList.remove('on-track');
    cardEl.classList.add('in-deck');

    let cardContent = cardEl.querySelector(".card-body")
    cardContent.style.visibility = "hidden";
  }

  getCards() { return Array.from(this.el.children); }
  clear() { this.el.innerHTML = ''; }
}