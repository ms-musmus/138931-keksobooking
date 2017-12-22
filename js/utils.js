'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.utils = {
    // Возвращает случайное целое число между min и max (включительно)
    generateRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Проверяет, не нажата ли клавиша Escape
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    getRooms: function (roomNumber) {
      if (roomNumber > 10 && roomNumber < 20) {
        return roomNumber + ' комнат';
      } else if (roomNumber % 10 === 1) {
        return roomNumber + ' комната';
      } else if (roomNumber % 10 === 2 || roomNumber % 10 === 3 || roomNumber % 10 === 4) {
        return roomNumber + ' комнаты';
      } else {
        return roomNumber + ' комнат';
      }
    },
    getStringDiff: function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    },
    getPinCoordsDiff: function (mainPin, currentPin) {
      return Math.abs(currentPin.location.x + currentPin.location.y - (mainPin.x + mainPin.y));
    },
    checkPinProperty: function (pin, filterElement) {
      if (filterElement.value === 'any') {
        return true;
      }
      switch (filterElement.name) {
        case 'housing-type':
          return filterElement.value === pin.offer.type;
        case 'housing-price':
          if (!window.data.OFFER_PRICE_MAP[filterElement.value].min) {
            return pin.offer.price < window.data.OFFER_PRICE_MAP[filterElement.value].max;
          } else if (!window.data.OFFER_PRICE_MAP[filterElement.value].max) {
            return pin.offer.price > window.data.OFFER_PRICE_MAP[filterElement.value].min;
          } else {
            return pin.offer.price >= window.data.OFFER_PRICE_MAP[filterElement.value].min && pin.offer.price <= window.data.OFFER_PRICE_MAP[filterElement.value].max;
          }
        case 'housing-rooms':
          return parseInt(filterElement.value, 10) === pin.offer.rooms;
        case 'housing-guests':
          return parseInt(filterElement.value, 10) === pin.offer.guests;
        case 'features':
          return pin.offer.features.indexOf(filterElement.value) > -1;
        default:
          return true;
      }
    }
  };

})();
