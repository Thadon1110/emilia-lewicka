const username = document.querySelector('#name');
const email = document.querySelector('#email');
const content = document.querySelector('#message');
const sendBtn = document.querySelector('.contact__form-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup .close');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.placeholder.slice(0, -3)} musi się składać z min. ${min} znaków.`);
	}
};

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact__form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();
	checkForm([username, email, content]);
	checkLength(username, 2);
	checkLength(content, 20);
	checkMail(email);
	checkErrors();
});

popupClose.addEventListener('click', () => {
	popup.classList.remove('show-popup');
	location.reload();
});
