// this.slider = this.querySelector('[id^="Slider-"]');
// this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
// this.enableSliderLooping = false;
// this.currentPageElement = this.querySelector('.slider-counter--current');
// this.pageTotalElement = this.querySelector('.slider-counter--total');
const v_slider = document.querySelector('[id^="GalleryThumbnails-"]');
const prevButton = v_slider.querySelector('button[name="previous"]');
const nextButton = v_slider.querySelector('button[name="next"]');

prevButton.addEventListener('click', () => {
  console.log('클릭됨')
});

  