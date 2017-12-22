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
    }
  };

})();
