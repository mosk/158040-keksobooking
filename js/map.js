'use strict';

var NUMBER_OF_ADVERTS = 8;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var adverts = getAdverts(NUMBER_OF_ADVERTS);

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomElement(array) {
  var randomNumber = Math.round(getRandomNumber(0, array.length - 1));

  return array[randomNumber];
}

function getNewArray(array) {
  var newArray = [];

  for (var i = 0; i < array.length; i++) {
    if (Math.round(Math.random()) === 1) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

// получаем случайное объявление в виде объекта
function getRandomAdvert() {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Проклятый старый дом'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 100;
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;

  function getNewSrc(initialSrc, number, srcEnding) {
    if (number > 9) {
      return initialSrc + number + srcEnding;
    }

    return initialSrc + '0' + number + srcEnding;
  }

  return {
    author: {
      avatar: getNewSrc('img/avatars/user', Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS)), '.png')
    },
    offer: {
      title: getRandomElement(TITLES),
      address: location.x + ', ' + location.y,
      price: Math.round(getRandomNumber(MIN_PRICE, MAX_PRICE)),
      type: getRandomElement(TYPES),
      rooms: Math.round(getRandomNumber(MIN_ROOMS, MAX_ROOMS)),
      guests: Math.round(getRandomNumber(MIN_GUESTS, MAX_GUESTS)),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: getNewArray(FEATURES),
      description: '',
      photos: []
    },
    location: {
      x: Math.round(getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX)),
      y: Math.round(getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX))
    }
  };
}

// массив с объявлениями
function getAdverts(amount) {
  var advertsArray = [];
  for (var i = 0; i < amount; i++) {
    var newAdvert = getRandomAdvert();
    advertsArray.push(newAdvert);
  }

  return advertsArray;
}

// создаю метку с объявлением
function renderAdvertPin(advert) {
  var template = document.querySelector('template');
  var advertPin = template.content.querySelector('.map__pin').cloneNode(true);
  var advertPinOffsetY = 38; // расстояние от центра пина до острия маркера

  advertPin.style.left = advert.location.x + 'px'; // У 'map__pin' свойство 'transform: translate(-50%, -50%)', следовательно старый вариант не нужен? старый вариант *** advertPin.style.left = advert.location.x + advertPinWidth / 2 + 'px'; ***
  advertPin.style.top = advert.location.y - advertPinOffsetY + 'px';
  advertPin.querySelector('img').setAttribute('src', advert.author.avatar);
  advertPin.querySelector('img').setAttribute('draggable', 'false');

  return advertPin;
}

function getOfferType(type) {
  var TYPES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  for (var i = 0; i < Object.keys(TYPES).length; i++) {
    if (type === Object.keys(TYPES)[i]) {
      var typeKey = Object.keys(TYPES)[i];
      var typeName = TYPES[typeKey];
    }
  }

  return typeName;
}

// проверка на окончание (в задании такого нет - сделал для себя)
function getRightEnding(number) {
  var stringNumber = String(number);
  var lastNumber = +stringNumber.charAt(stringNumber.length - 1);
  var preLastNumber = +stringNumber.charAt(stringNumber.length - 2);

  if (preLastNumber === 1 || [5, 6, 7, 8, 9, 0].indexOf(lastNumber) > -1) {
    return '';
  }

  if (lastNumber === 1) {
    return 'а';
  }

  return 'ы';
}

function renderAdvertArticle(advert) {
  var template = document.querySelector('template');
  var advertArticle = template.content.querySelector('.map__card').cloneNode(true);
  var advertTitle = advertArticle.querySelector('.card__title');
  var advertAddress = advertArticle.querySelector('.card__address');
  var advertPrice = advertArticle.querySelector('.card__price');
  var advertType = advertArticle.querySelector('.card__type');
  var advertRooms = advertArticle.querySelector('.card__rooms');
  var advertCheckin = advertArticle.querySelector('.card__checkin');
  var advertDescription = advertArticle.querySelector('.card__description');
  var advertAvatar = advertArticle.querySelector('.popup__avatar');
  var advertFeatures = advertArticle.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();

  advertTitle.textContent = advert.offer.title;
  advertAddress.textContent = advert.offer.address;

  advertPrice.textContent = advert.offer.price + ' &#x20bd;/ночь';
  advertType.textContent = getOfferType(advert.offer.type);

  advertRooms.textContent = advert.offer.rooms + ' комнат' + getRightEnding(advert.offer.rooms) + ' для ' + advert.offer.guests + ' гостей';
  advertCheckin.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  advertDescription.textContent = advert.offer.description;
  advertAvatar.setAttribute('src', advert.author.avatar);

  advertArticle.removeChild(advertFeatures);

  var newAdvertFeatures = document.createElement('ul');
  newAdvertFeatures.classList.add('popup__features');
  advertArticle.insertBefore(newAdvertFeatures, advertDescription);

  for (var i = 0; i < advert.offer.features.length; i++) {
    var advertFeature = document.createElement('li');
    advertFeature.classList.add('feature');
    advertFeature.classList.add('feature--' + advert.offer.features[i]);
    newAdvertFeatures.appendChild(advertFeature);
  }

  fragment.appendChild(advertArticle);

  return fragment;
}

function renderAdvertPins(advertsArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertsArray.length; i++) {
    fragment.appendChild(renderAdvertPin(advertsArray[i]));
  }

  return fragment;
}

map.classList.remove('map--faded');
mapPins.appendChild(renderAdvertPins(adverts));
map.insertBefore(renderAdvertArticle(adverts[0]), map.querySelector('.map__filters-container'));
