(function ($) {
  'use strict';

  $(document).ready(function () {

    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      dots: false,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      vertical: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      centerMode: true,
      focusOnSelect: true
    });

    $('.slider-dots').slick({
      vertical: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      centerMode: true,
      focusOnSelect: true
    });

    $('.home-slider').slick(
      {
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
      }
    );
  });
})(jQuery)
