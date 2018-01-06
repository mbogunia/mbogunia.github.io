
var mSlider = function(container, options) {

    var settings = {
        arrow : false,
        thumbnail : false,
    };

    var slider = container;
    var slides = $(slider).find('img').wrapAll('<div class="slider_wrap">');
    var thumbs = $(slider).find('img').clone().addClass('thumb');
    $(thumbs).each(function(e){
        $(this).attr('data-id', e);
    })
    var slideWrap = $(slider).find('.slider_wrap');
    var current = 0;
    var countSlides = slides.length;

    function startSlider() {
        $(slideWrap).find('img').hide();
        $(slides[current]).fadeIn();
    }

    function drawArrows() {
        $( '<div/>', {
            'class': 'slider_arrows'
            }).appendTo(slideWrap);

        $( '<a/>', {
            'class': 'next arrow',
            'id': 'next'
        }   ).appendTo($(slideWrap).find('.slider_arrows'));

        $( '<a/>', {
            'class': 'prev arrow',
            'id': 'prev'
        }   ).appendTo($(slideWrap).find('.slider_arrows'));
    }

    function drawThumbnail() {        
        $( '<div/>', {
            'class': 'slider_thumbnail'
            }).appendTo(slider);
        
        $(slider).find('.slider_thumbnail').append(thumbs);
    }

    function changeSlide() {
        $(slides).not(slides[current]).hide();
        $(slides[current]).fadeIn(200);
    }

    function slideNext() {
        current = current === countSlides - 1 ? 0 : current + 1;
        changeSlide();
    }
    
    function slidePrev() {
        current = current === 0 ? countSlides - 1 : current - 1;
        changeSlide();
    }

    function slideThumb(thumbSlide) {
        current = thumbSlide.data('id');
        changeSlide();
    }

    function sliderWork() {
        $(slider).click(function(e){
            target = $(e.target);
            if(target.hasClass('next')) { slideNext(); }
            if(target.hasClass('prev')) { slidePrev(); }
            if(target.hasClass('thumb')) { slideThumb(target); }
        });
    }

    this.constructor = function(container, options) {
        this.slider = container;
        $.extend(settings, options);

        startSlider();

        if(options.arrow) {
            drawArrows();
        }
        if(options.thumbnail) {
            drawThumbnail();
        }

        sliderWork();
    }

    this.constructor(container, options);

    console.log(settings);
}