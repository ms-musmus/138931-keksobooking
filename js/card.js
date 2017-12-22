'use strict';

(function () {

  var templateElement = document.querySelector('template').content;
  // Костыль для IE
  if (!templateElement) {
    templateElement = document.querySelector('template');
  }
  var mapFilterElement = document.querySelector('.map__filters-container');
  var cardTemplate = templateElement.querySelector('article.map__card');

  window.card = {
    // Показывает объявление для текущего пина
    showCard: function (pin, mapElement, cardEscPressHandler, cardCloseHandler) {
      var activeCard = document.querySelector('.map__card');
      if (activeCard && activeCard.dataset.customId !== pin.dataset.customId) {
        mapElement.removeChild(activeCard);
        createCard(pin, mapElement, cardCloseHandler);
      } else if (!activeCard) {
        createCard(pin, mapElement, cardCloseHandler);
      } else {
        activeCard.classList.remove('hidden');
      }
      document.addEventListener('keydown', cardEscPressHandler);
    }
  };

  // Создает новый элемент под объявление
  var createCard = function (pin, mapElement, cardCloseHandler) {
    var card = renderCard(window.data.similarAds[pin.dataset.customId], pin.dataset.customId);
    mapElement.insertBefore(card, mapFilterElement);
    var cardCloseElement = card.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', cardCloseHandler);
  };

  // Заполняет шаблон объявления
  var renderCard = function (similarAd, id) {
    var cardElement = cardTemplate.cloneNode(true);
    var offerTitleElement = cardElement.querySelector('h3');
    var offerAddressElement = cardElement.querySelector('p small');
    var offerPriceElement = cardElement.querySelector('p.popup__price');
    var offerTypeElement = cardElement.querySelector('h4');
    var offerSizeElement = cardElement.querySelector('p:nth-of-type(3)');
    var offerCheckElement = cardElement.querySelector('p:nth-of-type(4)');
    var offerFeaturesElement = cardElement.querySelector('.popup__features');
    var offerDescriptionElement = cardElement.querySelector('p:nth-of-type(5)');
    var offerAuthorAvatarElement = cardElement.querySelector('img');
    offerTitleElement.textContent = similarAd.offer.title;
    offerAddressElement.textContent = similarAd.offer.address;
    offerPriceElement.textContent = similarAd.offer.price + '\u20BD/ночь';
    offerTypeElement.textContent = window.data.OFFER_TYPE_MAP[similarAd.offer.type].name;
    offerSizeElement.textContent = similarAd.offer.rooms + ' для ' + similarAd.offer.guests + ' гостей';
    offerCheckElement.textContent = 'Заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < similarAd.offer.features.length; i++) {
      var offerFeature = document.createElement('li');
      offerFeature.className = 'feature feature--' + similarAd.offer.features[i];
      fragment.appendChild(offerFeature);
    }
    offerFeaturesElement.innerHTML = '';
    offerFeaturesElement.appendChild(fragment);
    offerDescriptionElement.textContent = similarAd.offer.description;
    offerAuthorAvatarElement.src = similarAd.author.avatar;
    cardElement.dataset.customId = id;
    return cardElement;
  };

})();