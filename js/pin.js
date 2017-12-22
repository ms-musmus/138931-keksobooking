'use strict';

(function () {

  var PIN_LEFT_OFFSET = 5;
  var PIN_TOP_OFFSET = 39;

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
      top: y - PIN_TOP_OFFSET + 'px',
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

  window.pin = {
    // Отрисовывает пины
    renderPinsFragment: function (pinClickHandler) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.similarAds.length; i++) {
        var pin = renderPin(window.data.similarAds[i], i);
        fragment.appendChild(pin);
        pin.addEventListener('click', pinClickHandler);
      }
      if (mapPinsElement.children.length > 2) {
        while (mapPinsElement.children[2]) {
          mapPinsElement.removeChild(mapPinsElement.children[2]);
        }
      }
      mapPinsElement.appendChild(fragment);
    }
  };


})();
