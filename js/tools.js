$(document).ready(function() {

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#slider-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    return true;
                } else {
                    $.validator.messages['inputDate'] = 'Дата введена некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('input', '.form-input textarea', function() {
        this.style.height = (this.scrollHeight) + 'px';
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-input span').html('<em>' + curName + '<a href="#"></a></em>');
        } else {
            curField.find('.form-file-input span').html(curField.find('.form-file-input span').attr('data-placeholder'));
        }
    });

    $('body').on('click', '.form-file-input span em a', function(e) {
        var curField = $(this).parents().filter('.form-file');
        curField.find('input').val('');
        curField.find('.form-file-input span').html(curField.find('.form-file-input span').attr('data-placeholder'));
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('body').on('keydown change', '.ajax-form .form-input input, .ajax-form .form-input textarea', function() {
        $(this).parents().filter('form').find('.message').remove();
    });

    $('body').on('click', '.ajax-form .form-submit input', function() {
        $(this).parents().filter('form').find('.message').remove();
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            adaptiveHeight: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        };
        curGallery.slick(
            options
        ).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('.ways h2 a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - 60});
        }
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.text-with-hint.open').removeClass('open');
            curBlock.removeClass('to-right');
            curBlock.addClass('open');
            var curPopup = curBlock.find('.text-with-hint-popup');
            if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {
                curBlock.addClass('to-right');
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-popup-close', function(e) {
        $('.text-with-hint.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.text-with-hint').length == 0) {
            $('.text-with-hint.open').removeClass('open');
        }
    });

    $('.header-search-link').click(function(e) {
        $('html').addClass('header-search-open');
        e.preventDefault();
    });

    $('.header-search-close').click(function(e) {
        $('html').removeClass('header-search-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('html').removeClass('header-search-open');
        }
    });

    function popupCenter(url, title) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
        var top = ((height / 3) - (360 / 3)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
        if (window.focus) {
            newWindow.focus();
        }
    }

    $('body').on('click', '.window-photo-social-item-fb', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-vk', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-social-item-link', function(e) {
        e.preventDefault();
    });

    var clipboardPhoto = new ClipboardJS('.window-photo-social-item-link')
    clipboardPhoto.on('success', function(e) {
        alert('OK');
    });

    $('body').on('click', '[data-lightbox]', function(e) {
        var curItem = $(this);
        var curGallery = $('[data-lightbox]');
        var curIndex = curGallery.index(curItem);

        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-photo-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        var windowHTML =    '<div class="window-photo">';

        windowHTML +=           '<div class="window-photo-preview">' +
                                    '<div class="window-photo-preview-inner">' +
                                        '<div class="window-photo-preview-list">';

        var galleryLength = curGallery.length;

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.eq(i);
            windowHTML +=                   '<div class="window-photo-preview-list-item"><a href="#"><img src="' + curGalleryItem.find('img').attr('src') + '" alt="" /></a></div>';
        }
        windowHTML +=                   '</div>' +
                                    '</div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-close"></use></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-download" target="_blank" download><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-download"></use></svg></a>';
        windowHTML +=           '<div class="window-photo-social">';
        windowHTML +=               '<div class="window-photo-social-icon"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share"></use></svg></div>';
        windowHTML +=               '<div class="window-photo-social-window">';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-link"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-link"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-fb"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-fb"></use></svg></a>';
        windowHTML +=                   '<a href="#" class="window-photo-social-item window-photo-social-item-vk"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-photo-share-vk"></use></svg></a>';
        windowHTML +=               '</div>';
        windowHTML +=           '</div>';

        windowHTML +=           '<div class="window-photo-slider">' +
                                    '<div class="window-photo-slider-list">';

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.eq(i);
            windowHTML +=               '<div class="window-photo-slider-list-item">' +
                                            '<div class="window-photo-slider-list-item-inner"><img src="' + pathTemplate + 'images/loading.gif" data-src="' + curGalleryItem.attr('href') + '" alt="" /></div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                '</div>';

        windowHTML +=       '</div>';

        $('.window-photo').remove();
        $('body').append(windowHTML);

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);

        $('.window-photo').each(function() {
            var marginPhoto = 166;
            if ($(window).width() < 1200) {
                marginPhoto = 253;
            }
            var newHeight = marginPhoto;
            $('.window-photo-slider-list-item-inner').css({'height': 'calc(100vh - ' + newHeight + 'px)', 'line-height': 'calc(100vh - ' + newHeight + 'px)'});
        });

        if ($(window).width() > 1199) {
            $('.window-photo-preview-inner').mCustomScrollbar({
                axis: 'y',
                scrollButtons: {
                    enable: true
                }
            });
        } else {
            $('.window-photo-preview-inner').mCustomScrollbar({
                axis: 'x',
                scrollButtons: {
                    enable: true
                }
            });
        }

        $('.window-photo-slider-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            dots: false,
            speed: 250,
            initialSlide: curIndex,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            var currentSlide = $('.window-photo-slider-list').slick('slickCurrentSlide');
            $('.window-photo-preview-list-item.active').removeClass('active');
            $('.window-photo-preview-list-item').eq(currentSlide).addClass('active');
            $('.window-photo-preview-inner').mCustomScrollbar('scrollTo', $('.window-photo-preview-list-item').eq(currentSlide));
            $('.window-photo-download').attr('href', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
            $('.window-photo-social-item-link').attr('data-clipboard-text', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
            var curIMG = $('.window-photo-slider-list-item').eq(currentSlide).find('img');
            if (curIMG.attr('src') !== curIMG.attr('data-src')) {
                var newIMG = $('<img src="" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                $('body').append(newIMG);
                newIMG.one('load', function(e) {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    newIMG.remove();
                });
                newIMG.attr('src', curIMG.attr('data-src'));
                window.setTimeout(function() {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    if (newIMG) {
                        newIMG.remove();
                    }
                }, 3000);
            }
        });

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-preview-list-item a', function(e) {
        var curIndex = $('.window-photo-preview-list-item').index($(this).parent());
        $('.window-photo-slider-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('body').on('click', '.window-photo-close', function(e) {
        $('.window-photo').remove();
        $('html').removeClass('window-photo-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-photo').length > 0) {
                $('.window-photo-close').trigger('click');
            }
        }
    });

    $('.batch-gallery-preview-list').slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true,
        accessibility: false,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        asNavFor: '.batch-gallery-big-list'
    });

    $('body').on('click', '.batch-gallery-preview-item a', function(e) {
        var curIndex = $('.batch-gallery-preview-item').index($(this).parent());
        $('.batch-gallery-big-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.batch-gallery-big-list').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        asNavFor: '.batch-gallery-preview-list'
    }).on('setPosition', function(event, slick) {
        var currentSlide = $('.batch-gallery-big-list').slick('slickCurrentSlide');
        $('.batch-gallery-preview-item.active').removeClass('active');
        $('.batch-gallery-preview-item').eq(currentSlide).addClass('active');
    });

    $('.tabs').each(function() {
        var curTabs = $(this);
        curTabs.find('.tabs-menu-inner').html('');
        curTabs.find('.tabs-content').each(function() {
            var curTab = $(this);
            curTabs.find('.tabs-menu-inner').append('<div class="tabs-menu-item"><a href="#">' + curTab.attr('data-title') + '</a></div>');
        });
        curTabs.find('.tabs-content').eq(0).addClass('active');
        curTabs.find('.tabs-menu-item').eq(0).addClass('active');
    });

    $('.tabs-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curTabs = curItem.parents().filter('.tabs');
            curTabs.find('.tabs-menu-item.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = curTabs.find('.tabs-menu-item').index(curItem);
            curTabs.find('.tabs-content.active').removeClass('active');
            curTabs.find('.tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.batch-info-params-link a').click(function(e) {
        $('.tabs-menu-item').eq(0).find('a').trigger('click');
        $('html, body').animate({'scrollTop': $('.tabs').offset().top - $('.nav').height()});
        e.preventDefault();
    });

    $('body').on('click', '.news-detail-social-fb', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.news-detail-social-vk', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('body').on('click', '.news-detail-social-twitter', function(e) {
        var curTitle = encodeURIComponent($('title').html());
        var curUrl = encodeURIComponent(window.location.href);

        popupCenter('https://twitter.com/share?url=' + curUrl + '&text=' + curTitle, curTitle);

        e.preventDefault();
    });

    $('.nav li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.append('<div class="nav-mobile-arrow"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#nav-mobile-arrow"></use></svg></div>');
        }
    });

    $('.nav-mobile-arrow').click(function() {
        $(this).parents().filter('li').toggleClass('open');
        $('html').toggleClass('mobile-submenu-open');
    });

    $('.footer-catalogue-title').each(function() {
        $(this).append('<div class="footer-catalogue-title-mobile"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#footer-catalogue-title"></use></svg></div>');
    });

    $('.footer-catalogue-title-mobile').click(function() {
        $('.footer-catalogue').toggleClass('open');
    });

    $('.container table').each(function() {
        var curTable = $(this);
        if (!curTable.parent().hasClass('table-scroll')) {
            curTable.wrap('<div class="table-scroll"></div>');
        }
    });

    $('.levels-item-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.news-search-mobile').click(function(e) {
        $('.news-header').toggleClass('open');
        e.preventDefault();
    });

});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input:focus, .form-input textarea:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
    });

    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').addClass('inputDate');

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var isCorrectDate = true;
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                    myDatepicker.show();
                    $(this).focus();
                }
            } else {
                $(this).addClass('error');
                return false;
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            curDate.setDate(curDate.getDate() - 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" /></svg>',
            nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" /></svg>',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            toggleSelected: false
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        if ($(window).width() > 1119) {
            options['dropdownAutoWidth'] = true;
        }

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
        }
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('ajax-form')) {
                curForm.addClass('loading');
                var formData = new FormData(form);

                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    data: formData,
                    cache: false
                }).done(function(data) {
                    curForm.find('.message').remove();
                    if (data.status) {
                        curForm.find('.form-input input, .form-input textarea').each(function() {
                            $(this).val('').trigger('change blur').removeClass('error valid');
                            $(this).parent().removeClass('focus full');
                        });
                        curForm.prepend('<div class="message message-success">' + data.message + '</div>')
                    } else {
                        curForm.prepend('<div class="message message-error">' + data.message + '</div>')
                    }
                    if ($(window).width() < 1200) {
                        $('html, body').animate({'scrollTop': $('#feedback').offset().top - $('header').height()});
                    }
                    curForm.removeClass('loading');
                });
            } else if (curForm.hasClass('window-form')) {
                var formData = new FormData(form);

                windowOpen(curForm.attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }

    if (windowScroll >= $('.header-container').height()) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }
});

function windowOpen(linkWindow, dataWindow) {
    if ($('html').hasClass('mobile-menu-open')) {
        $('html').removeClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
    }

    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        $(window).trigger('resize');

    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}

$(window).on('load resize', function() {
    if ($(window).width() > 1199) {
        if ($('.table-scroll').length > 0) {
            $('.table-scroll').mCustomScrollbar('destroy');
        }
    } else {
        if ($('.table-scroll').length > 0) {
            $('.table-scroll').each(function() {
                var curTableScroll = $(this);
                curTableScroll.mCustomScrollbar({
                    axis: 'x'
                });
            });
        }
    }
});