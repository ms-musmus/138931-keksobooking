'use strict';

(function () {

  var PIN_Y_MIN = 52;
  var PIN_Y_MAX = 452;
  var PIN_X_MIN = 299;
  var PIN_X_MAX = 899;
  var MAIN_PIN_OFFSET_Y = 48;
  var MAIN_PIN_OFFSET_X = 1;

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapFilterElement = document.querySelector('.map__filters-container');

  var pinMouseUpHandler = function () {
    showMap();
    window.pin.renderPinsFragment(pinClickHandler);
    window.form.enableForm();
    closeCard();
    window.formSynchronize();
    window.form.setAddress(getMainPinLocation(mapPinMainElement));
  };

  // Ищет адрес пина по координатам
  var getMainPinLocation = function (pin) {
    return {
      x: parseInt(pin.offsetLeft, 10) + MAIN_PIN_OFFSET_X,
      y: parseInt(pin.offsetTop, 10) + MAIN_PIN_OFFSET_Y
    };
  };

  // Показывает карту
  var showMap = function () {
    mapElement.classList.remove('map--faded');
  };

  // Делает пин активным
  var activatePin = function (evt) {
    deactivatePin();
    evt.currentTarget.classList.add('map__pin--active');
  };

  // Делает пин неактивным
  var deactivatePin = function () {
    var activePinElement = mapPinsElement.querySelector('.map__pin--active');
    if (activePinElement) {
      activePinElement.classList.remove('map__pin--active');
    }
  };

  // Закрывает окно с объявлением
  var closeCard = function () {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      mapElement.removeChild(activeCard);
      deactivatePin();
      document.removeEventListener('keydown', cardEscPressHandler);
      mapElement.removeChild(activeCard);
    }
  };

  var pinClickHandler = function (evt) {
    activatePin(evt);
    window.showCard(window.card.renderCard(window.data.similarAds[evt.currentTarget.dataset.customId], evt.currentTarget.dataset.customId), mapElement, mapFilterElement, cardEscPressHandler, cardCloseHandler);
  };

  var cardCloseHandler = function () {
    closeCard();
  };

  var cardEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeCard);
  };

  // Перетаскивание

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var checkPinCoord = function (newCoord, max, min) {
        if (newCoord > max) {
          return max + 'px';
        } else if (newCoord < min) {
          return min + 'px';
        } else {
          return newCoord + 'px';
        }
      };

      mapPinMainElement.style.top = checkPinCoord(mapPinMainElement.offsetTop - shift.y, PIN_Y_MAX, PIN_Y_MIN);
      mapPinMainElement.style.left = checkPinCoord(mapPinMainElement.offsetLeft - shift.x, PIN_X_MAX, PIN_X_MIN);

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(getMainPinLocation(mapPinMainElement));

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  mapPinMainElement.addEventListener('mouseup', pinMouseUpHandler);

})();
