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

  // Заполняет шаблон пина
  var renderPin = function (similarAd, id) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = similarAd.location.x - PIN_LEFT_OFFSET + 'px';
    pinElement.style.top = similarAd.location.y - PIN_TOP_OFFSET + 'px';
    pinElement.querySelector('img').src = similarAd.author.avatar;
    pinElement.dataset.customId = id;
    return pinElement;
  };

  // Отрисовывает пины
  window.pin = {
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
