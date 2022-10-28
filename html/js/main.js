"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  $('.js-tab').on('click', function () {
    $('.js-tab').removeClass('active-tab');
    $(this).addClass('active-tab'); // click(this);
  });
  graph();
  Highcharts.setOptions({
    lang: {
      rangeSelectorZoom: ''
    }
  }); // function click(item) {
  //     let number = $(item).parent('li').index(),
  //         el = '.highcharts-button:nth-child(' + parseFloat(number + 1) + ')';
  //     console.log(el);
  //     $('.highcharts-button:nth-child(' + parseFloat(number + 1) + ')').click();
  // }

  function graph() {
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json', function (data) {
      var _rangeSelector;

      var chart = Highcharts.stockChart('graph', {
        rangeSelector: (_rangeSelector = {
          selected: 4,
          buttonPosition: {
            align: 'center'
          },
          buttonSpacing: 70,
          buttonTheme: {
            // styles for the buttons
            fill: 'transparent',
            stroke: 'none',
            'stroke-width': 0,
            r: 12,
            style: {
              color: 'rgba(var(--primary), 0.85)',
              fontWeight: 'normal'
            },
            states: {
              hover: {
                fill: 'var(--second)'
              },
              select: {
                fill: 'var(--primary-dark)',
                style: {
                  color: 'var(--light)'
                }
              } // disabled: { ... }

            }
          },
          buttons: [{
            type: 'hour',
            count: 12,
            text: '12h'
          }, {
            type: 'day',
            count: 1,
            text: '1D'
          }, {
            type: 'week',
            count: 1,
            text: '1W'
          }, {
            type: 'year',
            count: 1,
            text: '1Y'
          }, {
            type: 'year',
            count: 2,
            text: '2Y'
          }, {
            type: 'year',
            count: 5,
            text: '5Y'
          }, {
            type: 'year',
            count: 10,
            text: '10Y'
          }]
        }, _defineProperty(_rangeSelector, "selected", 3), _defineProperty(_rangeSelector, "inputEnabled", false), _rangeSelector),
        chart: {
          zoomType: 'x',
          events: {
            load: function load() {
              setTimeout(function () {
                $('.highcharts-button').each(function () {
                  var transform = $(this).attr('transform'); // console.log(transform);

                  $(this).attr('transform', transform + ' scale(1.65, 1.5)');
                });
              }, 100);
            }
          }
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
                x1: 1,
                y1: 0.3,
                x2: 0.1,
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
  } // setTimeout( function () {
  //     let select = $('select').select2({
  //         dropdownParent: $(this).closest('div')
  //     });
  //     $('.highcharts-button-pressed').on('click', function () {
  //         select.select2('open');
  //     });
  // }, 2000);


  function transitionEndsOnce($dom, callback) {
    var tick = Date.now();
    $dom.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function (e) {
      var diff = Date.now() - tick;
      tick = Date.now();

      if (diff > 20) {
        // this number can be changed, but normally all the event trigger are done in the same time
        return callback && callback(e);
      }
    });
  }

  $('.js-converter-btn').on('click', changeInput);
  var animStart = false,
      height = parseFloat($('.js-converter-item').outerHeight(true));
  $('.js-converter-item').attr('style', '--height: ' + parseFloat(height) + 'px');
  var animSpeed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-speed'));

  function changeInput() {
    if (window.innerWidth < 767) {
      if (animStart == false) {
        animStart = true; // console.log(animStart);
        // console.log('false');

        $('.js-converter-item').css('transform', 'translateY(' + parseFloat(height + 20 * 2 + 38) + 'px)');
        $('.js-converter-item ~ .js-converter-item').css('transform', 'translateY(-' + parseFloat(height + 20 * 2 + 38) + 'px)'); // btn.addClass('btn-anim');
      } else if (animStart == true) {
        // console.log(animStart);
        // console.log('true');
        animStart = false;
        $('.js-converter-item').css('transform', 'translateY(0px)');
      }
    } else {
      $('.js-converter-btn').addClass('anim-btn');

      if (animStart == false) {
        animStart = true; // console.log(animStart);
        // console.log('false');

        $('.js-converter-item').css('transform', 'translateY(' + parseFloat(height + 25) + 'px)');
        $('.js-converter-item ~ .js-converter-item').css('transform', 'translateY(-' + parseFloat(height + 25) + 'px)'); // btn.addClass('btn-anim');
      } else if (animStart == true) {
        // console.log(animStart);
        // console.log('true');
        animStart = false;
        $('.js-converter-item').css('transform', 'translateY(0px)');
      }

      setTimeout(function () {
        $('.js-converter-btn').removeClass('anim-btn');
      }, animSpeed * 4);
    }
  }
});