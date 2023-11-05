const sliderImages = document.querySelectorAll('.slider-view-studio__image'),
	sliderLine = document.querySelector('.slider-view-studio__line'),
	sliderBtnNext = document.querySelector('.slider-view-studio__btn-next'),
	sliderBtnPrev = document.querySelector('.slider-view-studio__btn-prev');

let sliderCount = 0,
	sliderWidth;

window.addEventListener('resize', showSlideWidth);
sliderBtnPrev.addEventListener('click', switchPrevSlide);
sliderBtnNext.addEventListener('click', switchNextSlide);

function showSlideWidth() {
	sliderWidth = document.querySelector('.slider-view-studio').offsetWidth;
	sliderLine.style.width = sliderWidth * sliderImages.length + 'px';
	sliderImages.forEach(image => image.style.width = sliderWidth + 'px');

	createRollSlider();
}
showSlideWidth();

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
console.log(sliderImages);