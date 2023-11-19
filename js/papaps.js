const popapLinks = document.querySelectorAll('.popap-link');
const body = document.querySelector('body');
const lockPaddingElements = document.querySelectorAll('.lock-padding');
const closePopapIcons = document.querySelectorAll('.close-popap');

let unlock = true;
const timeout = 800;

if (popapLinks.length > 0) {
	for (let index = 0; index < popapLinks.length; index++) {
		const popapLink = popapLinks[index];
		popapLink.addEventListener('click', function (e) {
			const popapName = popapLink.getAttribute('href').replace('#', '');
			const curentPopap = document.getElementById(popapName);
			popapOpen(curentPopap);
			e.preventDefault();
		});
	}
}

if (closePopapIcons.length > 0) {
	for (let index = 0; index < closePopapIcons.length; index++) {
		const curentClosePopap = closePopapIcons[index];
		curentClosePopap.addEventListener('click', function (e) {
			popapClose(curentClosePopap.closest('.popap'));
			e.preventDefault();
		});
	}
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popapActive = document.querySelector('.popap.open');
		popapClose(popapActive);
	}
});

function popapOpen(curentPopap) {
	if (curentPopap && unlock) {
		const popapActive = document.querySelector('.popap.open');
		if (popapActive) {
			popapClose(popapActive, false);
		} else {
			bodyLock();
		}
		curentPopap.classList.add('open');
		curentPopap.addEventListener('click', function (e) {
			if (!e.target.closest('.popap__content')) {
				popapClose(e.target.closest('.popap'));
			}
		});
	}
}

function popapClose(popapActive, doUnlock = true) {
	if (unlock) {
		popapActive.classList.remove('open');
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