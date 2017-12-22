'use strict';

(function () {

  var noticeFormElement = document.querySelector('form.notice__form');
  var noticeFieldSetElements = noticeFormElement.querySelectorAll('fieldset');
  var addressFormElement = noticeFormElement.querySelector('#address');

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
