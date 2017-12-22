'use strict';

(function () {

  var TIMES = ['12:00', '13:00', '14:00'];



  var similarAds = [];

  var successHandler = function (data) {
    similarAds = data;
  };

  var errorHandler = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.backend.load(successHandler, errorHandler);

  window.data = {
    OFFER_TYPE_MAP: {
      flat: {
        name: 'Квартира',
        minprice: 1000
      },
      house: {
        name: 'Дом',
        minprice: 5000
      },
      bungalo: {
        name: 'Лачуга',
        minprice: 0
      },
      palace: {
        name: 'Дворец',
        minprice: 10000
      }
    },
    ROOM_GUEST_MAP: {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    },
    getTimes: function () {
      return TIMES;
    },
    getSimilarAds: function () {
      return similarAds;
    }
  };

})();
