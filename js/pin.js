'use strict';

(function () {

  var PIN_LEFT_OFFSET = 5;
  var PIN_TOP_OFFSET = 39;
  var PIN_MAX_COUNT = 5;

  var templateElement = document.querySelector('template').content;
  // Костыль для IE
  if (!templateElement) {
    templateElement = document.querySelector('template');
  }
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplate = templateElement.querySelector('.map__pin');

  // Считает координаты пина по адресу
  var getPinCoords = function (x, y) {
    return {
      left: x - PIN_LEFT_OFFSET + 'px',
      top: y - PIN_TOP_OFFSET + window.pin.PIN_Y_ABSOLUTE_OFFSET + 'px',
    };
  };

  // Заполняет шаблон пина
  var renderPin = function (similarAd, id) {
    var pinCoords = getPinCoords(similarAd.location.x, similarAd.location.y);
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinCoords.left;
    pinElement.style.top = pinCoords.top;
    pinElement.querySelector('img').src = similarAd.author.avatar;
    pinElement.dataset.customId = id;
    return pinElement;
  };

  var filterPins = function (similarAds, params) {
    var selectElements = params.querySelectorAll('select');
    var checkboxElements = params.querySelectorAll('input[type="checkbox"]:checked');
    similarAds = similarAds.filter(function (similarAd) {
      for (var i = 0; i < selectElements.length; i++) {
        if (!window.utils.checkPinProperty(similarAd, selectElements[i])) {
          return false;
        }
      }
      for (var j = 0; j < checkboxElements.length; j++) {
        if (!window.utils.checkPinProperty(similarAd, checkboxElements[j])) {
          return false;
        }
      }
      return true;
    });
    return similarAds;
  };

  window.pin = {
    // Отрисовывает пины
    renderPinsFragment: function (pinClickHandler, mainPinCoords, params) {
      var fragment = document.createDocumentFragment();
      var similarAds = window.data.getSimilarAds().sort(function (left, right) {
        var diff = window.utils.getPinCoordsDiff(mainPinCoords, left) - window.utils.getPinCoordsDiff(mainPinCoords, right);
        if (diff === 0) {
          diff = window.utils.getStringDiff(left, right);
        }
        return diff;
      });
      window.data.setSimilarAds(similarAds);
      if (params) {
        similarAds = filterPins(similarAds, params);
      }
      if (similarAds.length > PIN_MAX_COUNT) {
        similarAds = similarAds.slice(0, PIN_MAX_COUNT);
      }
      similarAds.forEach(function (similarAd) {
        var pin = renderPin(similarAd, window.data.getSimilarAds().indexOf(similarAd));
        fragment.appendChild(pin);
        pin.addEventListener('click', pinClickHandler);
      });
      if (mapPinsElement.children.length > 2) {
        while (mapPinsElement.children[2]) {
          mapPinsElement.removeChild(mapPinsElement.children[2]);
        }
      }
      mapPinsElement.appendChild(fragment);
    },
    PIN_Y_ABSOLUTE_OFFSET: 100 // Смещение до overlay
  };


})();
