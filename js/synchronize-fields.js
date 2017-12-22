'use strict';

(function () {

  window.synchronizeFields = {
    synchronize: function (firstElement, secondElement, firstValues, secondValues, callback) {
      if (typeof callback === 'function') {
        var fieldChangeHandler = function () {
          for (var i = 0; i < firstValues.length; i++) {
            if (firstElement.value === firstValues[i]) {
              callback(secondElement, secondValues[i]);
              return;
            }
          }
        };
        firstElement.addEventListener('change', fieldChangeHandler);
      }
    },
    syncValues: function (element, value) {
      element.value = value;
    },
    syncValueWithMin: function (element, value) {
      element.min = value;
      element.checkValidity();
    }
  };

})();
