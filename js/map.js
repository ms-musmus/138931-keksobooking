'use strict';

// Константы
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
    type: 'house'
  },
  {
    title: 'Маленький ужасный дворец',
    type: 'house'
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
var OFFER_TYPE_NAMES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var PIN_LEFT_OFFSET = 5;
var PIN_TOP_OFFSET = 39;

// Переменные
var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
var mapPinsElement = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var mapElement = document.querySelector('.map');
var mapFilterElement = mapElement.querySelector('.map__filters-container');
var similarAds = [];

// Вспомогательные функции
// Возвращает случайное целое число между min и max (включительно)
var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает массив фич случайной длины
var generateFeaturesArray = function () {
  var randomFeatures = [];
  for (var i = 0; i < generateRandomNumber(1, FEATURES.length); i++) {
    randomFeatures[i] = FEATURES[i];
  }
  return randomFeatures;
};

// Заполняет шаблон пина
var renderPin = function (similarAd) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = similarAd.location.x - PIN_LEFT_OFFSET + 'px';
  pinElement.style.top = similarAd.location.y - PIN_TOP_OFFSET + 'px';
  pinElement.querySelector('img').src = similarAd.author.avatar;

  return pinElement;
};

// Заполняет шаблон объявления
var renderCard = function (similarAd) {
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
  offerPriceElement.textContent = similarAd.offer.price;
  // Костыль для критерия Б28
  offerPriceElement.innerHTML += '&#x20bd;/ночь';
  offerTypeElement.textContent = OFFER_TYPE_NAMES[similarAd.offer.type];
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

  return cardElement;
};

for (var i = 0; i < 8; i++) {
  var currentLocation = {
    x: generateRandomNumber(300, 900),
    y: generateRandomNumber(100, 500)
  };
  var currentAd = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: OFFERS[i].title,
      address: currentLocation.x + ', ' + currentLocation.y,
      price: generateRandomNumber(1000, 1000000),
      type: OFFERS[i].type,
      rooms: generateRandomNumber(1, 5),
      guests: generateRandomNumber(1, 5),
      checkin: TIMES[generateRandomNumber(0, 2)],
      checkout: TIMES[generateRandomNumber(0, 2)],
      features: generateFeaturesArray(),
      description: '',
      photos: []
    },
    location: currentLocation
  };
  similarAds[i] = currentAd;
}

document.querySelector('.map').classList.remove('map--faded');

var fragment = document.createDocumentFragment();
for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderPin(similarAds[i]));
}
mapPinsElement.appendChild(fragment);

mapElement.insertBefore(renderCard(similarAds[0]), mapFilterElement);
