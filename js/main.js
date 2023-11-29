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
	} if (e.target.value > 18) {
		alert('Какой большой у вас ребёнок =)');
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

document.getElementById('event-birthday-form').addEventListener('submit', function (e) {
	const childAge = document.getElementById('child-age');
	const childGender = document.getElementById('child-gender');
	const childBirthday = document.getElementById('date-of-event-birthday');
	const quantityOfMembers = document.getElementById('quantity-of-members');

	let valid = true;

	if (document.getElementById('child-age').value <= 0) {
		valid = false;
		childAge.classList.remove('valid');
		childAge.classList.add('invalid');
		alert('Пожалуйста укажите возраст ребёнка ( сколько лет или месяцев ). Подробности уточним позвонив вам.');
	} else if (document.getElementById('child-age').value > 0) {
		childAge.classList.remove('invalid');
		childAge.classList.add('valid');
	}
	if ((childGender.value.replace(/\s/g, '').toLowerCase() != "мальчик" && childGender.value.replace(/\s/g, '').toLowerCase() != "девочка")) {
		valid = false;
		childGender.classList.remove('valid');
		childGender.classList.add('invalid');
		alert('Пожалуйста укажите пол ребёнка или одного из детей. Подробности уточним позвонив вам.');
	} else {
		childGender.classList.remove('invalid');
		childGender.classList.add('valid');
	}
	if (childBirthday.value === '') {
		valid = false;
		alert('Пожалуйста укажите дату мероприятия.');
		childBirthday.classList.remove('valid');
		childBirthday.classList.add('invalid');
	}
	if (futureDate === false) {
		valid = false;
		alert('Мы оргнизуем приздники детям крайне быстро, но к сожалению мы не можем вернуться в прошлое и создать праздник. Пожалуйста укажите дату мероприятия в настоящем или будущем времени.');
	}
	if (quantityOfMembers.value <= 0) {
		const userAnswer = confirm('Ваш ребёнок придёт один ?');
		if (userAnswer == false) {
			valid = false;
			quantityOfMembers.classList.remove('valid');
			quantityOfMembers.classList.add('invalid');
		} else {
			quantityOfMembers.remove('invalid');
			quantityOfMembers.add('valid');
		}
	}
	if (!valid) {
		e.preventDefault();
	}
});

