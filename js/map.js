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
var ESC_KEYCODE = 27;

// Переменные
var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
var mapPinsElement = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var mapElement = document.querySelector('.map');
var mapFilterElement = mapElement.querySelector('.map__filters-container');
var similarAds = [];
var mapPinMainElement = document.querySelector('.map__pin--main');
var noticeFormElement = document.querySelector('form.notice__form');
var noticeFieldSetElements = noticeFormElement.querySelectorAll('fieldset');

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
var renderPin = function (similarAd, id) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = similarAd.location.x - PIN_LEFT_OFFSET + 'px';
  pinElement.style.top = similarAd.location.y - PIN_TOP_OFFSET + 'px';
  pinElement.querySelector('img').src = similarAd.author.avatar;
  pinElement.dataset.customId = id;

  return pinElement;
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
  cardElement.dataset.customId = id;

  return cardElement;
};


// Отрисовывает пины
var renderPinsFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarAds.length; i++) {
    var pin = renderPin(similarAds[i], i);
    fragment.appendChild(pin);
    pin.addEventListener('click', pinClickHandler);
  }
  if (mapPinsElement.children.length > 2) {
    while (mapPinsElement.children[2]) {
      mapPinsElement.removeChild(mapPinsElement.children[2]);
    }
  }
  mapPinsElement.appendChild(fragment);
};

// Показывает карту
var showMap = function () {
  mapElement.classList.remove('map--faded');
};

// Делает форму активной
var enableForm = function () {
  noticeFormElement.classList.remove('notice__form--disabled');
  for (i = 0; i < noticeFieldSetElements.length; i++) {
    noticeFieldSetElements[i].disabled = false;
  }
};

// Делает пин активным
var activatePin = function (evt) {
  deactivatePin();
  evt.target.classList.add('map__pin--active');
  showCard(evt.target);
};

// Делает пин неактивным
var deactivatePin = function () {
  var activePinElement = mapPinsElement.querySelector('.map__pin--active');
  if (activePinElement) {
    activePinElement.classList.remove('map__pin--active');
  }
};

// Показывает объявление для текущего пина
var showCard = function (pin) {
  var activeCard = mapElement.querySelector('.map__card');
  if (activeCard && activeCard.dataset.customId !== pin.dataset.customId) {
    mapElement.removeChild(activeCard);
    createCard(pin);
  } else if (!activeCard) {
    createCard(pin);
  } else {
    activeCard.classList.remove('hidden');
  }
  document.addEventListener('keydown', cardEscPressHandler);
};

// Создает новый элемент под объявление
var createCard = function (pin) {
  var card = renderCard(similarAds[pin.dataset.customId], pin.dataset.customId);
  mapElement.insertBefore(card, mapFilterElement);
  var cardCloseElement = card.querySelector('.popup__close');
  cardCloseElement.addEventListener('click', cardCloseHandler);
};

// Закрывает окно с объявлением
var closeCard = function () {
  var activeCard = mapElement.querySelector('.map__card');
  activeCard.classList.add('hidden');
  deactivatePin();
  document.removeEventListener('keydown', cardEscPressHandler);
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

var pinMouseUpHandler = function () {
  showMap();
  renderPinsFragment();
  enableForm();
};

var pinClickHandler = function (evt) {
  activatePin(evt);
};

var cardCloseHandler = function () {
  closeCard();
};

var cardEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

mapPinMainElement.addEventListener('mouseup', pinMouseUpHandler);
