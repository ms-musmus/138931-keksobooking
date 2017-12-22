'use strict';
(function () {

  window.formSynchronize = function () {
    synchronizeRoomNumber();
    var priceArray = [];
    var typeArray = Object.keys(window.data.OFFER_TYPE_MAP);

    typeArray.forEach(function (type) {
      priceArray.push(window.data.OFFER_TYPE_MAP[type].minprice);
    });

    window.synchronizeFields.synchronize(window.form.timeinFormElement, window.form.timeoutFormElement, window.data.getTimes(), window.data.getTimes(), window.synchronizeFields.syncValues);
    window.synchronizeFields.synchronize(window.form.timeoutFormElement, window.form.timeinFormElement, window.data.getTimes(), window.data.getTimes(), window.synchronizeFields.syncValues);
    window.synchronizeFields.synchronize(window.form.typeFormElement, window.form.priceFormElement, typeArray, priceArray, window.synchronizeFields.syncValueWithMin);
  };

  var synchronizeRoomNumber = function () {
    var roomNumberValue = window.form.roomNumberFormElement.value;
    for (var i = 0; i < window.form.capacityFormElement.options.length; i++) {
      if (window.data.ROOM_GUEST_MAP[roomNumberValue].indexOf(parseInt(window.form.capacityFormElement.options[i].value, 10)) > -1) {
        window.form.capacityFormElement.options[i].disabled = false;
        window.form.capacityFormElement.options[i].selected = true;
      } else {
        window.form.capacityFormElement.options[i].disabled = true;
      }
    }
  };
  var roomNumberChangeHandler = function () {
    synchronizeRoomNumber();
  };
  window.form.roomNumberFormElement.addEventListener('change', roomNumberChangeHandler);
})();
