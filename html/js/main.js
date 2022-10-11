"use strict";

var overlay = $('.js-overlay');
$('.js-burger-btn').on('click', function () {
  $('.js-burger-modal').addClass('is-open');
  overlay.addClass('is-open');
});

function modalClose(close) {
  var modal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.js-burger-modal';
  close.on('click', function () {
    $(modal).removeClass('is-open');
    overlay.removeClass('is-open');
  });
}

modalClose($('.js-burger-close'));
modalClose(overlay);

if (window.innerWidth < 1200) {
  $('.js-mobile-menu-btn').on('click', function () {
    $(this).toggleClass('is-active');
    $('.js-mobile-menu').toggleClass('is-open');
  });
}