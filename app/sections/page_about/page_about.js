(function ($) {
  'use strict';

  $(document).ready(function () {

    var slider = $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      dots: false,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            dots: true
          }
        }
      ]
    });
    slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $('.tabs_item').removeClass('active');
      $('.tabs_item[data-index=' + nextSlide + ']').addClass('active');
    });

    slider.on('afterChange', function (event, slick, currentSlide) {

    });

    $('.tabs_item').on('click', function () {
      var _this = $(this);

      slider.slick('slickGoTo', _this.data('index'));
    })

  });
})(jQuery)
