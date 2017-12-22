'use strict';

(function () {
  // Показывает объявление для текущего пина
  window.showCard = function (card, insertToElement, insertBeforeElement, cardEscPressHandler, cardCloseHandler) {
    var activeCard = document.querySelector('.map__card');
    if (activeCard) {
      insertToElement.removeChild(activeCard);
    }
    insertToElement.insertBefore(card, insertBeforeElement);
    var cardCloseElement = card.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', cardCloseHandler);
    document.addEventListener('keydown', cardEscPressHandler);
  };

})();
