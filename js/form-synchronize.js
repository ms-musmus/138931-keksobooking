'use strict';

(function () {

  var selectOption = function (listElement, value) {
    var optionElement = listElement.querySelector('option[value="' + value + '"]');
    optionElement.selected = true;
  };

  var timeinChangeHandler = function (evt) {
    var timeinValue = evt.currentTarget.value;
    selectOption(window.form.timeoutFormElement, timeinValue);
  };

  window.form.timeinFormElement.addEventListener('change', timeinChangeHandler);

  var timeoutChangeHandler = function (evt) {
    var timeoutValue = evt.currentTarget.value;
    selectOption(window.form.timeinFormElement, timeoutValue);
  };

  window.form.timeoutFormElement.addEventListener('change', timeoutChangeHandler);

  var typeChangeHandler = function () {
    window.formSynchronize.synchronizeTypePrice();
  };

  window.form.typeFormElement.addEventListener('change', typeChangeHandler);

  window.formSynchronize = {
    synchronizeRoomNumber: function () {
      var roomNumberValue = window.form.roomNumberFormElement.value;
      for (var i = 0; i < window.form.capacityFormElement.options.length; i++) {
        if (window.data.ROOM_GUEST_MAP[roomNumberValue].indexOf(parseInt(window.form.capacityFormElement.options[i].value, 10)) > -1) {
          window.form.capacityFormElement.options[i].disabled = false;
          window.form.capacityFormElement.options[i].selected = true;
        } else {
          window.form.capacityFormElement.options[i].disabled = true;
        }
      }
    },
    synchronizeTypePrice: function () {
      var typeValue = window.form.typeFormElement.value;
      window.form.priceFormElement.min = window.data.OFFER_TYPE_MAP[typeValue].minprice;
      window.form.priceFormElement.checkValidity();
    },
  };

  var roomNumberChangeHandler = function () {
    window.formSynchronize.synchronizeRoomNumber();
  };

  window.form.roomNumberFormElement.addEventListener('change', roomNumberChangeHandler);

})();
