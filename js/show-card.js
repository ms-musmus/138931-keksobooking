'use strict';

(function () {
  // Показывает объявление для текущего пина
  window.showCard = function (card, insertToElement, insertBeforeElement, cardEscPressHandler, cardCloseHandler) {
    insertToElement.insertBefore(card, insertBeforeElement);
    var cardCloseElement = card.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', cardCloseHandler);
    document.addEventListener('keydown', cardEscPressHandler);
  };

})();
