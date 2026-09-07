/* Cycle duck art for scrolling banner icons (.heb-duck-rand): U-shape → baby → flower hat → scuba → repeat */
(function () {
  'use strict';
  var ducks = [
    'https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/873dfd87-1aa4-445d-09d0-d593ca96f700/public',
    'https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/4e485a4d-320c-43b9-2509-12bdd06fb700/public',
    'https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/42cd818d-b462-4a58-fbaf-813ad6679d00/public',
    'https://imagedelivery.net/P7Bk1eUomD9newW72dKliQ/6921df97-b74b-422c-6d8a-67de0f48ac00/public'
  ];
  document.querySelectorAll('img.heb-duck-rand').forEach(function (img, i) {
    img.src = ducks[i % ducks.length];
  });
})();
