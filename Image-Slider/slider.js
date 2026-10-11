
class Slider {
  constructor(root) {
    this.track = root.querySelector('.slider__track');
    const slides = [...this.track.children];
    this.count = slides.length;
    this.pos = 1;       
    this.busy = false;

    this.track.prepend(slides[this.count - 1].cloneNode(true));
    this.track.append(slides[0].cloneNode(true));

    this.dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider__dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.onclick = () => this.go(i + 1);
      root.querySelector('.slider__dots').append(dot);
      return dot;
    });

    root.querySelector('.slider__btn--prev').onclick = () => this.go(this.pos - 1);
    root.querySelector('.slider__btn--next').onclick = () => this.go(this.pos + 1);
    this.track.addEventListener('transitionend', () => this.settle());

    this.render(false);
  }

  go(pos) {
    if (this.busy || pos === this.pos) return;
    this.pos = pos;
    this.busy = true;
    this.render(true);
  }

  render(animate) {
    this.track.style.transition = animate ? '' : 'none';
    this.track.style.transform = `translateX(${-this.pos * 100}%)`;

    const current = (this.pos - 1 + this.count) % this.count;
    this.dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  settle() {
    this.busy = false;
    if (this.pos === 0) this.pos = this.count;
    else if (this.pos === this.count + 1) this.pos = 1;
    else return;

    this.render(false);
    void this.track.offsetWidth; 
    this.track.style.transition = '';
  }
}

document.querySelectorAll('.slider').forEach((el) => new Slider(el));
