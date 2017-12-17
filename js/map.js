'use strict';

var NUMBER_OF_ADVERTS = 8;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var ADVERTS = getAdverts(NUMBER_OF_ADVERTS);

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
    if (Math.round(Math.random(0, 1)) === 1) {
      newArray.push(array[i]);
    }
  }

  return newArray;
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
  var MAX_GUESTS = 100;
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;

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
  var adverts = [];
  for (var i = 0; i < amount; i++) {
    adverts.push(getRandomAdvert());
  }

  return adverts;
}

// создаю метку с объявлением
function renderAdvertPin(advert) {
  var template = document.querySelector('template');
  var advertPin = template.content.querySelector('.map__pin').cloneNode(true);
  var advertPinWidth = 48;
  var advertPinHeight = 60;

  advertPin.style.left = advert.location.x + advertPinWidth / 2 + 'px';
  advertPin.style.top = advert.location.y - advertPinHeight + 'px';
  advertPin.querySelector('img').setAttribute('src', advert.author.avatar);
  advertPin.querySelector('img').setAttribute('draggable', 'false');

  return advertPin;
}

function getOfferType(type) {
  var TYPES = {
    items: ['flat', 'house', 'bungalo'],
    names: ['Квартира', 'Бунгало', 'Дом']
  };

  for (var i = 0; i < TYPES.items.length; i++) {
    if (type === TYPES.items[i]) {
      var typeName = TYPES.names[i];
    }
  }

  return typeName;
}

// проверка на окончание (в задание такого нет - сделал для себя)
function getRightEnding(number) {
  var stringNumber = String(number);
  var lastNumber = +stringNumber.charAt(stringNumber.length - 1);
  var preLastNumber = +stringNumber.charAt(stringNumber.length - 2);

  if ([1].indexOf(preLastNumber) > -1 || [5, 6, 7, 8, 9, 0].indexOf(lastNumber) > -1) {
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
  var advertTitle = advertArticle.querySelector('h3');
  var advertAddress = advertArticle.querySelector('p');
  var advertPrice = advertArticle.querySelector('.popup__price');
  var advertType = advertArticle.querySelector('h4');
  var advertRooms = advertArticle.querySelector(':nth-child(7)');
  var advertCheckin = advertArticle.querySelector(':nth-child(8)');
  var advertDescription = advertArticle.querySelector(':nth-child(10)');
  var advertAvatar = advertArticle.querySelector('.popup__avatar');
  var advertFeatures = advertArticle.querySelector('.popup__features');

  advertArticle.classList.add('card');
  advertTitle.classList.add('card__title');
  advertTitle.textContent = advert.offer.title;
  advertAddress.classList.add('card__address');
  advertAddress.textContent = advert.offer.address;

  advertPrice.textContent = advert.offer.price + ' &#x20bd;/ночь';
  advertType.textContent = getOfferType(advert.offer.type);
  advertRooms.textContent = advert.offer.rooms + ' комнат' + getRightEnding(advert.offer.rooms) + ' для ' + advert.offer.guests + ' гостей';
  advertCheckin.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  advertDescription.classList.add('card__description');
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

  return advertArticle;
}

function renderAdvertPins(adverts) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderAdvertPin(adverts[i]));
  }

  return fragment;
}

function renderAdvertArticles(adverts) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderAdvertArticle(adverts[0]));

  return fragment;
}

map.classList.remove('map--faded');
mapPins.appendChild(renderAdvertPins(ADVERTS));
map.insertBefore(renderAdvertArticles(ADVERTS), map.querySelector('.map__filters-container'));
