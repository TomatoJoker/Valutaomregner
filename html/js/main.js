"use strict";

$(function () {
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
      $(this).siblings('.js-mobile-menu').toggleClass('is-open');
    });
    $('.js-option').on('click', function () {
      var $value = $(this).text();
      console.log($value);
      $(this).parent('.js-mobile-menu').removeClass('is-open').siblings('.js-mobile-menu-btn').removeClass('is-active').find('span').text($value);
    });
  }

  focus('.js-focus');

  function focus(focus) {
    $(focus).on('click', function () {
      $(this).toggleClass('focus').find('input').focus();
    });
    $(document).on('click', function (e) {
      if ($(focus).has(e.target).length === 0) {
        $(focus).removeClass('focus');
      }
    });
  }

  var swiper = '';

  function slider(sliderSelector) {
    $(sliderSelector).each(function () {
      if (window.innerWidth < 767) {
        // console.log('swiper init');
        swiper = new Swiper(this, {
          swiperPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: sliderSelector + ' .pagination-dots',
            bulletClass: 'pagination-dots__item',
            bulletActiveClass: 'pagination-dots__active',
            clickable: 'true'
          }
        });
      } else {
        if (swiper != '') {
          swiper.destroy(true, true); // console.log('not null');
        } else {// console.log('null')
        }
      }
    });
  }

  slider('.js-slider-convert');
  slider('.js-slider-card');
  slider('.js-slider-article');
  slider('.js-slider-card-col-3');
  $(window).resize(function () {
    slider('.js-slider-convert');
    slider('.js-slider-card');
    slider('.js-slider-article');
    slider('.js-slider-card-col-3');
  });

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

  function select(select) {
    $(select).each(function (i, item) {
      if (window.innerWidth < 1199) {
        $(item).select2({
          templateSelection: formatState,
          templateResult: formatState,
          width: '100%',
          selectionCssClass: 'сonverter-сurrency__select-head',
          dropdownCssClass: 'modal-select'
        });
        $(item).on('select2:open', function () {
          $('body').addClass('no-scroll');
          $('html, body').animate({
            scrollTop: 0
          }, 300);
        });
        $(item).on('select2:close', function () {
          $('body').removeClass('no-scroll');
        });
      } else {
        $(item).select2({
          templateSelection: formatState,
          templateResult: formatState,
          dropdownParent: $(this).closest('.js-select-container'),
          width: '100%',
          selectionCssClass: 'сonverter-сurrency__select-head'
        });
      }
    });
  }

  select('.js-select');
  $(window).resize(function () {
    select('.js-select');
  });
  graph('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json');

  function graph(dataGraph) {
    Highcharts.getJSON(dataGraph, function (data) {
      var chart = Highcharts.chart('graph', {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: ''
        },
        // subtitle: {
        //     text: document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        // },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Exchange rate'
          }
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0.3,
                y1: 0.3,
                x2: 1,
                y2: 1
              },
              stops: [[0.37, '#DCE4FC'], [0.54, 'rgba(220, 228, 252, 0.06)'], [1, 'rgba(220, 228, 252, 0)']] // [[0, Highcharts.getOptions().colors[0]],
              // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]]

            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: '',
          data: data,
          color: '#071D72'
        }]
      });
    });
  }
});