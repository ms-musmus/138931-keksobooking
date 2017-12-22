'use strict';

(function () {

  var OFFERS = [
    {
      title: 'Большая уютная квартира',
      type: 'flat'
    },
    {
      title: 'Маленькая неуютная квартира',
      type: 'flat'
    },
    {
      title: 'Огромный прекрасный дворец',
      type: 'palace'
    },
    {
      title: 'Маленький ужасный дворец',
      type: 'palace'
    },
    {
      title: 'Красивый гостевой домик',
      type: 'house'
    },
    {
      title: 'Некрасивый негостеприимный домик',
      type: 'house'
    },
    {
      title: 'Уютное бунгало далеко от моря',
      type: 'bungalo'
    },
    {
      title: 'Неуютное бунгало по колено в воде',
      type: 'bungalo'
    }
  ];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Возвращает массив фич случайной длины
  var generateFeaturesArray = function () {
    var randomFeatures = [];
    for (var i = 0; i < window.utils.generateRandomNumber(1, FEATURES.length); i++) {
      randomFeatures[i] = FEATURES[i];
    }
    return randomFeatures;
  };

  var generateSimilarAds = function () {
    var similarAds = [];
    for (var i = 0; i < 8; i++) {
      var currentLocation = {
        x: window.utils.generateRandomNumber(300, 900),
        y: window.utils.generateRandomNumber(100, 500)
      };
      var currentAd = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: OFFERS[i].title,
          address: currentLocation.x + ', ' + currentLocation.y,
          price: window.utils.generateRandomNumber(1000, 1000000),
          type: OFFERS[i].type,
          rooms: window.utils.generateRandomNumber(1, 5),
          guests: window.utils.generateRandomNumber(1, 5),
          checkin: TIMES[window.utils.generateRandomNumber(0, 2)],
          checkout: TIMES[window.utils.generateRandomNumber(0, 2)],
          features: generateFeaturesArray(),
          description: '',
          photos: []
        },
        location: currentLocation
      };
      similarAds[i] = currentAd;
    }
    return similarAds;
  };

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
    similarAds: generateSimilarAds(),
  };

})();
