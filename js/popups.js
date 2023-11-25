import { popupContentCalcPrice, popupContentFreeDate, popupContentGetPrice, popupContentGetOffer } from "./data.js";

const contentCalcPrice = JSON.parse(popupContentCalcPrice);
const contentFreeDate = JSON.parse(popupContentFreeDate);
const contentGetPrice = JSON.parse(popupContentGetPrice);
const contentGetOffer = JSON.parse(popupContentGetOffer);
console.log(contentGetOffer);

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