export class ProjectPanel {
  constructor(el) {
    this.el = el;
    this.closeButton = el.querySelector('.detail__close');
    console.log('Close button found:', this.closeButton)
    this.img = el.querySelector('.detail__img');
    this.title = el.querySelector('.detail__title');
    this.desc = el.querySelector('.detail__desc');
    this.link = el.querySelector('.detail__link');
    this.skills = el.querySelector('.detail__skills');

    this.closeButton.addEventListener("click", () => { this.hide(); console.log("closed")})
  }

  show() {
    this.el.style.visibility = 'visible';
    this.el.classList.remove('hidden');
  }

  hide() {
    this.el.style.visibility = 'hidden';
    this.el.classList.add('hidden');
  }

  fill(project) {
    this.id = project.id;
    this.title.innerText = project.title;
    this.desc.innerText = project.description;
    this.link.href = project.repo;
    this.img.src = project.img;
    this.skills.innerHTML = project.skills
      .map(skill => `<span class="skill-tag">${skill}</span>`)
      .join('');
  }
}