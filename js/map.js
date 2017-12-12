'use strict';

var NUMBER_OF_ADVERTS = 8;
var fragment = document.createDocumentFragment();
var adverts = getAdverts(NUMBER_OF_ADVERTS);
var map = document.querySelector('.map');

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
  var locationX = Math.round(getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX));
  var locationY = Math.round(getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX));

  return {
    author: {
      avatar: 'img/avatars/user' + 0 + Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS)) + '.png'
    },
    offer: {
      title: getRandomElement(TITLES),
      address: locationX + ', ' + locationY,
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
      x: locationX,
      y: locationY
    }
  }
}

function getAdverts(amount) {
  var adverts = [];

  for (var i = 0; i < amount; i++) {
    adverts.push(getRandomAdvert());
  }

  return adverts;
}

getAdverts(NUMBER_OF_ADVERTS);

map.classList.remove('map--faded');

function addAdverts(array) {
  for (var i = 0; i < array.length; i++) {
    var mapPin = document.createElement('button');
    mapPin.classList.add('map__pin');
    mapPin.style.left = array[i].location.x + 'px';
    mapPin.style.top = array[i].location.y + 'px';

    var avatar = document.createElement('img');
    avatar.style.width = 40 + 'px';
    avatar.style.height = 40 + 'px';
    avatar.setAttribute('src', array[i].author.avatar)
    avatar.setAttribute('draggable', 'false');

    mapPin.appendChild(avatar);

    fragment.appendChild(mapPin);
  }

  return fragment;
}

addAdverts(adverts);

document.querySelector('.map__pins').appendChild(fragment);
