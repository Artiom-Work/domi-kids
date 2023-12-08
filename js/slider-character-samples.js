const sliderImages = document.querySelectorAll('.slider-character-samples__image'),
	sliderLine = document.querySelector('.slider-character-samples__line'),
	sliderBtnNext = document.querySelector('.slider-character-samples__btn-next'),
	sliderBtnPrev = document.querySelector('.slider-character-samples__btn-prev');

let sliderCount = 0,
	sliderWidth;

window.addEventListener('resize', showSliderWidth);
sliderBtnPrev.addEventListener('click', switchPrevSlide);
sliderBtnNext.addEventListener('click', switchNextSlide);

function showSliderWidth() {
	sliderWidth = document.querySelector('.slider-character-samples').offsetWidth;
	sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
	sliderImages.forEach(image => image.style.width = sliderWidth + 'px');

	createRollSlider();
}
showSliderWidth();

function switchNextSlide() {
	sliderCount++;
	if (sliderCount >= sliderImages.length) sliderCount = 0;
	createRollSlider();
}

function switchPrevSlide() {
	sliderCount--;
	if (sliderCount < 0) sliderCount = sliderImages.length - 1;
	createRollSlider();
}

function createRollSlider() {
	sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}
// setInterval(() => {
// 	switchNextSlide()
// }, 5000);