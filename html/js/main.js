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

$(window).resize(slider('.js-slider-convert'));
$(window).resize(slider('.js-slider-card'));
$(window).resize(slider('.js-slider-article'));

function slider(sliderSelector) {
  $(sliderSelector).each(function () {
    if (window.innerWidth < 767) {
      new Swiper(this, {
        swiperPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: sliderSelector + ' .pagination-dots',
          bulletClass: 'pagination-dots__item',
          bulletActiveClass: 'pagination-dots__active',
          clickable: 'true'
        }
      });
    }
  });
}

function formatState(info, state) {
  if (!info.id) {
    return info.text;
  }

  var code = info.id.toString();
  var originlaOption = $('option[data-code=' + code + ']').first();

  if (!originlaOption) {
    return info.text;
  }

  var flagURL = originlaOption.data('flag');

  if (!flagURL) {
    return info.text;
  }

  var $state = $('<span><span class="сonverter-сurrency__value">' + info.text + '</span><span class="сonverter-сurrency__value-abbreviation">' + code + '</span></span> <img class="сonverter-сurrency__img" src="' + flagURL + '" width="40" height="24" alt="' + info.text + '" />');
  return $state;
}

;
$('.js-select').each(function (i, item) {
  $(item).select2({
    templateSelection: formatState,
    templateResult: formatState,
    dropdownParent: $(this).closest('.js-select-container'),
    width: '100%',
    selectionCssClass: 'сonverter-сurrency__select-head'
  });
});