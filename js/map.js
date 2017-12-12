'use strict';

var NUMBER_OF_ADVERTS = 8;
var fragment = document.createDocumentFragment();

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

/*var advert = {
  author: {
    getAvatar: 'img/avatars/user' + 0 + Math.round(getRandomNumber(1, NUMBER_OF_ADVERTS)) + '.png'
  },
  offer: {
    getTitle: getRandomElement(TITLES),
    getAddress: location.x + ', ' + location.y,
    getPrice: Math.round(getRandomNumber(MIN_PRICE, MAX_PRICE)),
    getType: getRandomElement(TYPES),
    getRooms: Math.round(getRandomNumber(MIN_ROOMS, MAX_ROOMS)),
    getGuests: Math.round(getRandomNumber(MIN_GUESTS, MAX_GUESTS)),
    getCheckin: getRandomElement(CHECKIN_TIME),
    getCheckout: getRandomElement(CHECKOUT_TIME),
    getFeatures: getRandomArray(FEATURES),
    getDescription: '',
    getPhotos: []
  },
  location: {
    getX: Math.round(getRandomNumber(LOCATION.x.min, LOCATION.x.max)),
    getY: Math.round(getRandomNumber(LOCATION.y.min, LOCATION.y.max))
  }
};*/

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
  var LOCATION = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };

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
      x: Math.round(getRandomNumber(LOCATION.x.min, LOCATION.x.max)),
      y: Math.round(getRandomNumber(LOCATION.y.min, LOCATION.y.max))
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

function addAdverts(array) {
  for (var i = 0; i < array; i++) {
    var newElement = document.createElement('button');
    newElement.classList.add('map__pin');
    newElement.style.left = array[i].location.x;
    newElement.style.top = array[i].location.y;

    fragment.appendChild(newElement);
  }

  return fragment;
}

document.querySelector('.map__pins').appendChild(fragment);


/*<button style="left: {{location.x}}px; top: {{location.y}}px;" class="map__pin">
  <img src="{{author.avatar}}" width="40" height="40" draggable="false">
</button>*/
