class VSliderComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[id^="Slider-"]');
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.enableSliderLooping = false;
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) return;

    this.initPages();

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  initPages() {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientHeight > 0);
    if (this.sliderItemsToShow.length < 2) return;
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetTop - this.sliderItemsToShow[0].offsetTop;
    this.slidesPerPage = Math.floor((this.slider.clientHeight - this.sliderItemsToShow[0].offsetTop) / this.sliderItemOffset);
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  }

  resetPages() {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.initPages();
  }

  update() {
    if (this.enableSliderLooping) return;
    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollTop === 0) {
      this.prevButton.setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.removeAttribute('disabled');
    }
    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }

  isSlideVisible(element, offset = 0) {
    const lastVisibleSlide = this.slider.clientHeight + this.slider.scrollTop - offset;
    const btn = this.querySelector('button.slider-button');
    return element.offsetTop + element.clientHeight - (parseInt(btn.offsetHeight) + parseInt(getComputedStyle(btn).marginBottom.replace('px',''))) <= lastVisibleSlide && element.offsetTop >= this.slider.scrollTop;
  }

  onButtonClick(event) {
    event.preventDefault();
    const step = event.currentTarget.dataset.step || 1;
    this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollTop + (step * this.sliderItemOffset) : this.slider.scrollTop - (step * this.sliderItemOffset);
    console.log(this.slideScrollPosition)
    this.slider.scrollTo({
      top: 120
    });
  }
}

customElements.define('vertical-slider', VSliderComponent)