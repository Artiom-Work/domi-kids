import { popupContentCalcPrice, popupContentFreeDate, popupContentGetPrice, popupContentGetOffer } from "./data.js";

const contentCalcPrice = JSON.parse(popupContentCalcPrice);
const contentFreeDate = JSON.parse(popupContentFreeDate);
const contentGetPrice = JSON.parse(popupContentGetPrice);
const contentGetOffer = JSON.parse(popupContentGetOffer);

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPaddingElements = document.querySelectorAll('.lock-padding');
const closePopupIcons = document.querySelectorAll('.close-popup');

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			createPopupContent(popupLink);
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
if (closePopupIcons.length > 0) {
	for (let index = 0; index < closePopupIcons.length; index++) {
		const curentClosePopup = closePopupIcons[index];
		curentClosePopup.addEventListener('click', function (e) {
			popupClose(curentClosePopup.closest('.popup'));
			e.preventDefault();
		});
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

function createPopupContent(popupLink) {
	const popup = document.getElementById('popup-1');
	const popupTitle = popup.querySelector('.popup__title');
	const popupButton = popup.querySelector('.popup__button');

	if (popupLink.hasAttribute('data-calc-price-btn')) {
		popupTitle.textContent = contentCalcPrice.title;
		popupButton.textContent = contentCalcPrice.btn;
	} else if (popupLink.hasAttribute('data-free-date-btn')) {
		popupTitle.textContent = contentFreeDate.title;
		popupButton.textContent = contentFreeDate.btn;
	} else if (popupLink.hasAttribute('data-get-price-btn')) {
		popupTitle.textContent = contentGetPrice.title;
		popupButton.textContent = contentGetPrice.btn;
	} else if (popupLink.hasAttribute('data-get-offer-btn')) {
		popupTitle.innerHTML = `${contentGetOffer.title1}<span>${contentGetOffer.titlePink1}</span>${contentGetOffer.title2}<span>${contentGetOffer.titlePink2}</span>`;
		popupButton.textContent = contentGetOffer.btn;
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPaddingElements.length > 0) {
		for (let index = 0; index < lockPaddingElements.length; index++) {
			const el = lockPaddingElements[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPaddingElements.length > 0) {
			for (let index = 0; index < lockPaddingElements.length; index++) {
				const el = lockPaddingElements[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

// validation popaps form to call back user

const userName = document.getElementById('user-name');
const userPhone = document.getElementById('user-phone');

const validOnlyLetters = /^[A-Za-z-А-Яа-яЁё]+$/;
const validPatternPhone = /^[+\{0-9}][0-9,-\s\{()}]+$/;

let valid = false;

userName.addEventListener('input', function (e) {
	if (e.target.value === '' || !e.target.value.match(validOnlyLetters)) {
		e.target.classList.remove('valid');
		e.target.classList.add('invalid');
		valid = false;
	} else {
		e.target.classList.remove('invalid');
		e.target.classList.add('valid');
		valid = true;
	}
});

userPhone.addEventListener('input', function (e) {
	if (e.target.value === '' || !e.target.value.match(validPatternPhone) || e.target.value.length <= 5) {
		e.target.classList.remove('valid');
		e.target.classList.add('invalid');
		valid = false;
	} else {
		e.target.classList.remove('invalid');
		e.target.classList.add('valid');
		valid = true;
	}
});

document.getElementById('form-user-call-back').addEventListener('submit', function (e) {
	const userName = document.getElementById('user-name');
	const userPhone = document.getElementById('user-phone');
	if (userName.value === '' || !userName.value.match(validOnlyLetters)) {
		valid = false;
		userName.classList.remove('valid');
		userName.classList.add('invalid');
		alert('Пожалуйста, напишите как к вам можно обращаться, буквами.');
	} else {
		userName.classList.remove('invalid');
		userName.classList.add('valid');
	}

	if (userPhone.value === '' || !userPhone.value.match(validPatternPhone) || userPhone.value.length <= 5) {
		valid = false;
		userPhone.classList.remove('valid');
		userPhone.classList.add('invalid');
		alert('Пожалуйста, укажите ваш номер телефона, со знака " + " либо цифры .');
	} else {
		userPhone.classList.remove('invalid');
		userPhone.classList.add('valid');
	}

	if (!valid) {
		e.preventDefault();
	}
});
