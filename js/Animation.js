export function animateFlyToDeck(cardEl, firstRect, onFirst) {
  const clone = cardEl.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = firstRect.left + 'px';
  clone.style.top = firstRect.top + 'px';
  clone.style.width = firstRect.width + 'px';
  clone.style.margin = '0';
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  onFirst();
  cardEl.style.visibility = 'hidden';

  const last = cardEl.getBoundingClientRect();

  const dx = last.left - firstRect.left - (last.width / 2);
  const dy = last.top - firstRect.top - 60;
  
  const deckYRotation = window.innerHeight - last.top;
  const angle = -1 * (Math.atan2(deckYRotation, dx) * (180 / Math.PI) - 90);

  const keyframes = [
    { 
      transform: `translate3d(0, 0, 0) scale(1) rotate(0deg)`, 
      opacity: 1, 
      offset: 0, 
      easing: 'ease-in' 
    },
    { 
      transform: `translate3d(0, -20px, 0) scale(1.02) rotate(0deg)`, 
      opacity: 1, 
      offset: 0.6, 
      easing: 'ease-in'
    },
    { 
      transform: `translate3d(0, -20px, 0) scale(1.02) rotate(${angle}deg)`, 
      opacity: 1, 
      offset: 0.8, 
      easing: 'linear'
    },
    { 
      transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.6) rotate(${angle}deg)`, 
      opacity: 1, 
      offset: 1, 
      easing: 'linear' 
    },
    // { 
    //   transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.6) rotate(0deg)`, 
    //   opacity: 0, 
    //   offset: 1
    // }
  ];

  const anim = clone.animate(keyframes, {
    duration: 1200,
    easing: 'cubic-bezier(.2,0,0,1)'
  });

  anim.onfinish = () => {
    clone.remove();
    cardEl.style.visibility = 'visible';
  }
}


export function animateFlyToTrack(cardEl, firstRect, onFirst) {
  const clone = cardEl.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = firstRect.left + 'px';
  clone.style.top = firstRect.top + 'px';
  clone.style.width = firstRect.width + 'px';
  clone.style.margin = '0';
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  onFirst();

  cardEl.style.visibility = 'hidden';
  const last = cardEl.getBoundingClientRect();

  const dx = last.left - firstRect.left + (firstRect.width / 3);
  const dy = last.top - firstRect.top + (firstRect.height/3);
  
  const deckYRotation = window.innerHeight - last.top;
  const angle = (Math.atan2(deckYRotation, dx) * (180 / Math.PI) - 90);

  const keyframes = [
    { 
      transform: `translate3d(0, 0, 0) scale(1) rotate(${angle}deg)`, 
      opacity: 1, 
      offset: 0, 
      easing: 'ease-out' 
    },
    // { 
    //   transform: `translate3d(0, -20px, 0) scale(1.02) rotate(${angle}deg)`, 
    //   opacity: 1, 
    //   offset: 0.2, 
    //   easing: 'ease-out'
    // },
    { 
      transform: `translate3d(${dx}px, ${dy-20}px, 0) scale(1.68) rotate(0deg)`, 
      opacity: 1, 
      offset: 0.8, 
      easing: 'ease-in'
    },
    { 
      transform: `translate3d(${dx}px, ${dy}px, 0) scale(1.66666) rotate(0deg)`, 
      opacity: 1, 
      offset: 1, 
      easing: 'ease-out' 
    },
    // { 
    //   transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.6) rotate(0deg)`, 
    //   opacity: 0, 
    //   offset: 1
    // }
  ];

  const anim = clone.animate(keyframes, {
    duration: 1200,
    easing: 'cubic-bezier(.2,0,0,1)'
  });

  anim.onfinish = () => {
    clone.remove();
    cardEl.style.visibility = 'visible';
  }
}


