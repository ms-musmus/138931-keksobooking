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
    }
  };

})();
