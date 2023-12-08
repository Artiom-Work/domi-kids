const sliderCards = document.querySelectorAll('.studio-services__line-item'),
	sliderLine = document.querySelector('.studio-services__slider-line'),
	sliderBtnNext = document.querySelector('.studio-services__btn-next'),
	sliderBtnPrev = document.querySelector('.studio-services__btn-prev');

let sliderCount = 0,
	sliderWidth,
	startX;

window.addEventListener('resize', showSliderWidth);
sliderBtnPrev.addEventListener('click', switchPrevSlide);
sliderBtnNext.addEventListener('click', switchNextSlide);

sliderCards.forEach(card => {
	card.addEventListener('touchstart', function (e) {
		let touch = e.touches[0];
		startX = touch.clientX;
	}, { passive: true });
	card.addEventListener('touchmove', function (e) {
		if (!startX) {
			return;
		}

		let touch = e.touches[0];
		let currentX = touch.clientX;

		if (currentX > startX) {
			// Свайп вправо
			switchPrevSlide();
		} else {
			// Свайп влево
			switchNextSlide();
		}
		// Сброс начальной точки
		startX = null;
	}, { passive: true });
});

function showSliderWidth() {
	sliderWidth = document.querySelector('.studio-services__slider').offsetWidth;
	sliderLine.style.width = sliderWidth * sliderCards.length + 'px';
	sliderCards.forEach(card => card.style.width = sliderWidth + 'px');
	createRollSlider();
}
showSliderWidth();

function switchNextSlide() {
	sliderCount++;
	if (sliderCount >= sliderCards.length) sliderCount = 0;
	createRollSlider();
}

function switchPrevSlide() {
	sliderCount--;
	if (sliderCount < 0) sliderCount = sliderCards.length - 1;
	createRollSlider();
}

function createRollSlider() {
	sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}