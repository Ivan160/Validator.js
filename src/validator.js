var validator = function (form) {
	if (!form) return;

	var elements = form.elements;
	var btn = form.querySelector('[type="submit"]');
	var name = /^([а-яё]+|[a-z]+)$/i,
		phone = /^([+]?[0-9\s-\(\)]{7,25})*$/,
		emailOne = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)/,
		emailTwo = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@$/,
		emailThree = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)$/,
		emailFour = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,

		errorMess = [
			'Незаполненное поле ввода',
			'Введите Ваше реальное имя',
			'Неверный формат номера телефона',
		],
		errorEmail = [
			'Незаполненное поле ввода',
			'Некорректный адрес электронной почты',
			'Адрес электронной почты должен содержать символ "@"',
			'Введите часть адреса после символа "@"',
			'Введите расширение адреса. Например: .com или .ru'
		],
		iserror = false;

	btn.addEventListener('click', validForm);
	form.addEventListener('focus', function () {
		var el = document.activeElement;
		if (el !== btn) cleanError(el);
	}, true);

	function validForm(e) {
		e.preventDefault();
		var formVal = getFormData(form);
		var error;

		for (var property in formVal) {
			error = getError(formVal, property);
			if (error.length != 0) {
				iserror = true;
				showError(property, error);
			}
		}
		return false;
	}

	function getError(formVal, property) {
		var error = '';
		var validate = {
			'name': function () {
				if (formVal.name.length == 0) error = errorMess[0];
				else if (name.test(formVal.name) == false) error = errorMess[1];
			},
			'email': function () {
				if (formVal.email.length == 0) {
					error = errorMess[0];
				} else if (emailFour.test(formVal.email) == false) {
					if (emailThree.test(formVal.email) == false) {
						if (emailTwo.test(formVal.email) == false) {
							if (emailOne.test(formVal.email) == false) {
								error = errorEmail[1];
							} else error = errorEmail[2];
						} else error = errorEmail[3];
					} else error = errorEmail[4];
				}
			},
			'phone': function () {
				if (formVal.phone.length == 0) error = errorMess[0];
				else if (phone.test(formVal.phone) == false) error = errorMess[2];
			},
			'text': function () {
				if (formVal.textmess.length == 0) error = errorMess[0];
			}
		};

		if (validate[property]) validate[property]();
		return error;
	}

	[].forEach.call(elements, function (element) {
		if (element.tagName.toLowerCase() === 'input' && element !== btn) {
			var boxElem = document.createElement('div');
			boxElem.innerHTML = element.outerHTML;
			boxElem.className = 'box-error';
			element.parentNode.replaceChild(boxElem, element);
		}
	});

	[].forEach.call(elements, function (element) {
		element.addEventListener('blur', function (e) {
			var formElement = e.target;
			var property = formElement.getAttribute('name');
			var dataField = {};

			dataField[property] = formElement.value;

			var error = getError(dataField, property);
			if (error.length != 0) showError(property, error);
			return false;
		});
	});

	function showError(property, error) {
		var formElement = form.querySelector('[name=' + property + ']');
		if (!formElement.nextElementSibling) {
			var spanError = document.createElement('span');
			spanError.className = 'error';
			formElement.parentNode.appendChild(spanError);
			formElement.classList.add('form-control_error');
			spanError.innerText = error;
		}
	}

	function cleanError(elem) {
		if (elem.nextElementSibling) {
			elem.classList.remove('form-control_error');
			elem.parentNode.removeChild(elem.nextElementSibling);
		}
	}

	function getFormData(form) {
		var controls = {};
		if (!form.elements) return '';
		for (var i = 0, ln = form.elements.length; i < ln; i++) {
			var element = form.elements[i];
			if (element.tagName.toLowerCase() === 'input' && element !== btn) {
				controls[element.name] = element.value;
			}
		}
		return controls;
	}
};

function start() {
	var style = document.createElement('style');
	style.textContent = `
		.error {max-width: 260px; width: max-content; display: block; font-size: 13px; line-height: 15px; color: #fff; position: absolute; left: 0; top: calc(100% + 8px); z-index: 100; padding: 6px 10px 7px; -webkit-border-radius: 1px; border-radius: 6px; background: #d99;}
		.error:before {width: 0; height: 0; content: ''; position: absolute; left: 15px; top: -7px; border-right: 8px solid transparent; border-left: 8px solid transparent; border-bottom: 8px solid #d99;}
		.form-control_error {border-color: #d99;}
		.box-error {position: relative; display: inline-block;}
	`;
	document.head.appendChild(style);

	var forms = document.querySelectorAll('form');
	for (var i = 0; i < forms.length; i++) {
		validator(forms[i]);
	}
}
start();