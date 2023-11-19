const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const footer = document.querySelector('.footer');
const lockPaddingElements = document.querySelectorAll('.lock-padding');
const closePopupIcons = document.querySelectorAll('.close-popup');

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
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

// function createPopup(title, button) {
// 	const popup = `
//  <div id="calc-price" class="popup">
//  <div class="popup__body">
// 	 <div class="popup__content">
// 		 <div class="popup__close-container">
// 			 <a href="#" class="popup__close close-popup"></a>
// 		 </div>
// 		 <h2 class="popup__title">
// 			 отправьте заявку&nbsp;на расчет стоимости вашего праздника
// 		 </h2>
// 		 <p class="popup__subtitle">Мы&nbsp;перезвоним через 15&nbsp;минут</p>
// 		 <div class="popup__form-wrapper">
// 			 <form id="calc-price-form" class="form popup__form" action="#" method="get" enctype="multipart/form-data">
// 				 <input id="user-name" class="form__input popup__form-input" name="user-name" type="text" placeholder="Имя"
// 					 required>
// 				 <input id="user-phone" class="form__input popup__form-input" name="user-phone" type="tel"
// 					 placeholder="Номер телефона" required>
// 				 <button class="calc-price-data-submit button" type="submit">отправить</button>
// 			 </form>
// 			 <div class="popup__social-wrapper">
// 				 <p class="popup__social-text">
// 					 Или напишите нам сообщение удобным для вас способом
// 				 </p>
// 				 <div class="popup__social social">
// 					 <ul class="social__list">
// 						 <li class="social__item">
// 							 <a class="social__link" href="https://telegram.org" target="_blank"></a>
// 						 </li>
// 						 <li class="social__item social__item_whatsapp">
// 							 <a class="social__link" href="https://web.whatsapp.com" target="_blank"></a>
// 						 </li>
// 					 </ul>
// 				 </div>
// 			 </div>
// 		 </div>
// 	 </div>
//  </div>
// </div>
//  `;
// 	footer.insertAdjacentHTML('afterend', popup);
// 	const curentPopup = document.getElementById('calc-price');
// 	popupOpen(curentPopup);
// }