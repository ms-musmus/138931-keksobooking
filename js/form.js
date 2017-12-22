'use strict';

(function () {

  var noticeFormElement = document.querySelector('form.notice__form');
  var noticeFieldSetElements = noticeFormElement.querySelectorAll('fieldset');
  var addressFormElement = noticeFormElement.querySelector('#address');

  var errorHandler = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  noticeFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeFormElement), function () {
      noticeFormElement.reset();
    }, errorHandler);
    evt.preventDefault();
  });

  window.form = {
    titleFormElement: noticeFormElement.querySelector('#title'),
    priceFormElement: noticeFormElement.querySelector('#price'),
    timeinFormElement: noticeFormElement.querySelector('#timein'),
    timeoutFormElement: noticeFormElement.querySelector('#timeout'),
    typeFormElement: noticeFormElement.querySelector('#type'),
    roomNumberFormElement: noticeFormElement.querySelector('#room_number'),
    capacityFormElement: noticeFormElement.querySelector('#capacity'),
    // Делает форму активной
    enableForm: function () {
      noticeFormElement.classList.remove('notice__form--disabled');
      for (var i = 0; i < noticeFieldSetElements.length; i++) {
        noticeFieldSetElements[i].disabled = false;
      }
    },
    setAddress: function (coords) {
      var address = 'x: ' + coords.x + ', y: ' + coords.y;
      addressFormElement.value = address;
    }
  };

})();
