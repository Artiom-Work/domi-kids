const mobileMenuBlock = document.querySelector('.mobile-menu');
const mobileMenuLinks = mobileMenuBlock.querySelectorAll('.menu-link');

mobileMenuLinks.forEach(element => {
	const mobileMenuLink = element;
	mobileMenuLink.addEventListener('click', function (e) {
		if (document.getElementById('menu-switch').checked === true) {
			document.getElementById('menu-switch').checked = false;
		}
	});
});

// validation event-birthday form
const childAge = document.getElementById('child-age');
const childGender = document.getElementById('child-gender');
const dateChildBirthday = document.getElementById('date-of-event-birthday');
const quantityOfMembers = document.getElementById('quantity-of-members');

let futureDate = true;

childAge.addEventListener('input', function (e) {
	if (e.target.value <= 0) {
		e.target.classList.remove('valid');
		e.target.classList.add('invalid');
	} else if (e.target.value > 0) {
		e.target.classList.remove('invalid');
		e.target.classList.add('valid');
	} if (e.target.value >= 18) {
		e.target.classList.remove('valid');
		e.target.classList.add('invalid');
	}
});

childGender.addEventListener('input', function (e) {
	if (e.target.value.replace(/\s/g, '').toLowerCase() != "мальчик" && e.target.value.replace(/\s/g, '').toLowerCase() != "девочка") {
		e.target.classList.remove('valid');
		e.target.classList.add('invalid');
	} else {
		e.target.classList.remove('invalid');
		e.target.classList.add('valid');
	}
});

dateChildBirthday.addEventListener('input', function (e) {
	compareDates(e.target)
});

function compareDates(userDate) {
	const inputDate = new Date(userDate.value);
	const today = new Date();
	if (inputDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
		dateChildBirthday.classList.remove('valid');
		dateChildBirthday.classList.add('invalid');
		futureDate = false;
	} if (inputDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)) {
		dateChildBirthday.classList.remove('invalid');
		dateChildBirthday.classList.add('valid');
		futureDate = true;
	}
}

quantityOfMembers.addEventListener('input', function (e) {
	if (e.target !== '') {
		e.target.classList.remove('invalid');
		e.target.classList.add('valid');
	}
});


