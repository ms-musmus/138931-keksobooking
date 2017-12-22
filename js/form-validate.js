'use strict';

(function () {

  var titleFormElementInvalidHandler = function () {
    removeCustomValidity(window.form.titleFormElement);
    addTitleCustomValidity();
  };

  var removeCustomValidity = function (element) {
    element.setCustomValidity('');
  };

  var addTitleCustomValidity = function () {
    if (window.form.titleFormElement.validity.tooShort) {
      window.form.titleFormElement.setCustomValidity('Заголовок должен быть не меньше 30 символов');
    } else if (window.form.titleFormElement.validity.tooLong) {
      window.form.titleFormElement.setCustomValidity('Заголовок должен быть не больше 100 символов');
    } else if (window.form.titleFormElement.validity.valueMissing) {
      window.form.titleFormElement.setCustomValidity('Обязательное поле');
    }
  };

  var checkValidityOnChangeHandler = function (evt) {
    if (evt.currentTarget.checkValidity()) {
      removeCustomValidity(evt.currentTarget);
    }
  };

  window.form.titleFormElement.addEventListener('invalid', titleFormElementInvalidHandler);
  window.form.titleFormElement.addEventListener('input', checkValidityOnChangeHandler);

  var addPriceCustomValidity = function () {
    if (window.form.priceFormElement.validity.rangeUnderflow) {
      window.form.priceFormElement.setCustomValidity('Цена не может быть меньше ' + window.form.priceFormElement.min + ' руб.');
    } else if (window.form.priceFormElement.validity.rangeOverflow) {
      window.form.priceFormElement.setCustomValidity('Цена не может быть больше ' + window.form.priceFormElement.max + ' руб.');
    } else if (window.form.priceFormElement.validity.badInput) {
      window.form.priceFormElement.setCustomValidity('Цена должна быть числом');
    } else if (window.form.priceFormElement.validity.valueMissing) {
      window.form.priceFormElement.setCustomValidity('Обязательное поле');
    }
  };

  var priceFormElementInvalidHandler = function () {
    removeCustomValidity(window.form.priceFormElement);
    addPriceCustomValidity();
  };

  window.form.priceFormElement.addEventListener('invalid', priceFormElementInvalidHandler);
  window.form.priceFormElement.addEventListener('input', checkValidityOnChangeHandler);

})();
