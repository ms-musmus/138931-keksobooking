'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var pinMouseUpHandler = function () {
    showMap();
    window.pin.renderPinsFragment(pinClickHandler);
    window.form.enableForm();
    closeCard();
    window.formSynchronize.synchronizeRoomNumber();
    window.formSynchronize.synchronizeTypePrice();
  };

  // Показывает карту
  var showMap = function () {
    mapElement.classList.remove('map--faded');
  };

  // Делает пин активным
  var activatePin = function (evt) {
    deactivatePin();
    evt.currentTarget.classList.add('map__pin--active');
    window.card.showCard(evt.currentTarget, mapElement, cardEscPressHandler, cardCloseHandler);
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
      activeCard.classList.add('hidden');
      deactivatePin();
      document.removeEventListener('keydown', cardEscPressHandler);
    }
  };

  var pinClickHandler = function (evt) {
    activatePin(evt);
  };


  var cardCloseHandler = function () {
    closeCard();
  };

  var cardEscPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeCard);
  };

  mapPinMainElement.addEventListener('mouseup', pinMouseUpHandler);

})();
