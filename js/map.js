'use strict';

var NUMBER_OF_ADVERTS = 8;
var MAP = document.querySelector('.map');
var MAP_PINS = document.querySelector('.map__pins')
var ADVERTS = getAdverts(NUMBER_OF_ADVERTS);

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomElement(array) {
  var randomNumber = Math.round(getRandomNumber(0, array.length - 1));

  return array[randomNumber];
}

function getRandomArray(array) {
  var randomString = [];
  var randomElement = randomString[i];

  for (var i = 0; i < Math.round(getRandomNumber(0, array.length - 1)); i++) {
    var newElement = getRandomElement(array);
    if (newElement !== randomElement) {
      randomElement = newElement;
      randomString.push(randomElement);
    }
  }

  return randomString;
}

// получаем случайное объявление в видн объекта
function getRandomAdvert() {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде', 'Проклятый старый дом'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 300;
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;
/*  var locationX = Math.round(getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX));
  var locationY = Math.round(getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX));*/

  return {
    author: {
      avatar: 'img/avatars/user' + 0 + Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS)) + '.png'
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
      features: getRandomArray(FEATURES),
      description: '',
      photos: []
    },
    location: {
      x: Math.round(getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX)),
      y: Math.round(getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX))
    }
  }
}

// массив с объявлениями
function getAdverts(amount) {
  var adverts = [];
  for (var i = 0; i < amount; i++) {
    adverts.push(getRandomAdvert());
  }

  return adverts;
}

MAP.classList.remove('map--faded');

// создаю объявление
function renderAdvert(advert) {
  var template = document.querySelector('template');
  var advertPin = template.content.querySelector('.map__pin').cloneNode(true);
/*  var advertPopup = template.content.querySelector('article').cloneNode(true);*/

  advertPin.style.left = advert.location.x + 'px';
  advertPin.style.top = advert.location.y + 'px';
  advertPin.querySelector('img').setAttribute('src', advert.author.avatar);
  advertPin.querySelector('img').setAttribute('draggable', 'false');

  return advertPin;
}

function renderAdverts(adverts) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderAdvert(adverts[i]));
  }

  return fragment;
}

MAP_PINS.appendChild(renderAdverts(ADVERTS));
