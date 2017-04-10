/**
 * Created by aleksandrnemirov on 12.03.17.
 */
/*плавный скроллин до якоря с контактами*/
$(document).ready(function() {

    //навигация - плавный скроллинг к якорю
    $("#ycontacts").on("click",/*"a",*/ function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id_contacts  = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id_contacts).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });

});

/*скрипт для AJAX формы*/
function call() {
    var msg   = $('.popup-feedback__form').serialize();
    $.ajax({
        type: 'POST',
        url: 'res.php',
        data: msg,
        success: function(data) {
            $('#results').html(data);
        },
        /*error:  function(xhr, str){
            alert('Возникла ошибка: ' + xhr.responseCode);
        }*/
    });

}

/*появление сайтбара*/
var product_content_h = 0;
var site_bar_h = 0;
$(".site-bar__item").click(function(){
    $(this).find('.site-bar__drop-down-ul').toggle("slow");
    $(this).toggleClass("site-bar__item-active");


});

/*popup*/
const links_zv = document.querySelectorAll(".popup-btn-zv");
const links_ok = document.querySelectorAll(".popup-btn-ok");
const links_u = document.querySelectorAll(".popup-btn-u");

var popup_zv = document.querySelector(".popup-zv");
var popup_ok = document.querySelector(".popup-ok");
var login = popup_zv.querySelector("[name=name]");
var popup_bg = document.querySelector(".popup-bg");
var popup_u = document.querySelector(".popup-notice");
var popup_map = document.querySelector(".popup-map");
var contacts__adds = document.querySelector(".contacts__adds");
var popups_close = document.querySelectorAll(".popup-close");

/*попап яндекс карта*/
contacts__adds.addEventListener("click", function (event) {
    popup_map.classList.toggle("popup-show");
    popup_bg.classList.toggle("popup-bg-show");

});
/*попап задать вопрос*/
for (let link_zv of links_zv) {

    link_zv.addEventListener("click", function (event) {
        console.log("задвать вопрос");
        event.preventDefault();
        popup_zv.classList.toggle("popup-show");
        popup_bg.classList.toggle("popup-bg-show");
        login.focus();

    });
}

/*попап записаться на ремонт*/
for (let link_ok of links_ok) {

    link_ok.addEventListener("click", function (event) {
        console.log("запись на ремонт");
        /*event.preventDefault();*/
        popup_ok.classList.toggle("popup-show");
        popup_bg.classList.toggle("popup-bg-show");
        /*login.focus();*/

    });
}

/*попап уведомление*/
for (let link_u of links_u) {

    link_u.addEventListener("click", function (event) {
        popup_u.classList.toggle("popup-show");
        popup_bg.classList.add("popup-bg-show");
        if (popup_zv.classList.contains("popup-show") || popup_ok.classList.contains("popup-show")) {
            popup_zv.classList.remove("popup-show");
        }
        if (popup_ok.classList.contains("popup-show")) {
            popup_ok.classList.remove("popup-show");
        }

    });
}
for (let popup_close of popups_close)
popup_close.addEventListener("click", function (e) {
        popup_zv.classList.remove("popup-show");
        popup_bg.classList.remove("popup-bg-show");
        popup_map.classList.remove("popup-show");
        popup_ok.classList.remove("popup-show");
        popup_u.classList.remove("popup-show");
});

window.addEventListener("keydown", function (closeForm) {
    if (closeForm.keyCode === 27) {
        if (popup_zv.classList.contains("popup-show")) {
            popup_zv.classList.remove("popup-show");
            popup_bg.classList.remove("popup-bg-show");
        }
        if (popup_ok.classList.contains("popup-show")) {
            popup_ok.classList.remove("popup-show");
            popup_bg.classList.remove("popup-bg-show");
        }
        if (popup_u.classList.contains("popup-show")) {
            popup_u.classList.remove("popup-show");
            popup_bg.classList.remove("popup-bg-show");
        }
        if (popup_map.classList.contains("popup-show")) {
            popup_map.classList.remove("popup-show");
            popup_bg.classList.remove("popup-bg-show");
        }
    }
});
/*закрытие pop-up при клике на черный фон*/
popup_bg.addEventListener("click", function (event) {
    if (popup_zv.classList.contains("popup-show")) {
        popup_zv.classList.remove("popup-show");
        popup_bg.classList.remove("popup-bg-show");
    }
    if (popup_ok.classList.contains("popup-show")) {
        popup_ok.classList.remove("popup-show");
        popup_bg.classList.remove("popup-bg-show");
    }
    if (popup_u.classList.contains("popup-show")) {
        popup_u.classList.remove("popup-show");
        popup_bg.classList.remove("popup-bg-show");
    }
    if (popup_map.classList.contains("popup-show")) {
        popup_map.classList.remove("popup-show");
        popup_bg.classList.remove("popup-bg-show");
    }
});



/*выезжают и уезжают при скролле*/
/*картинка мотор*/
if (window.matchMedia('(min-width: 1024px)').matches) {
    var left = $('.position-left');
    var leftP = parseInt($('.position-left').css('left'));
    var startST = 200;
    var a = 0;
    winST = 0;
    var win_w = ($(window).width() - $(".container").width()) / 2;
    console.log(win_w);
    var leftFinish = leftP - startST;
    $(window).scroll(function () {
        winST = $(window).scrollTop();
        var current_css_left = parseInt($('.position-left').css('left'));
        if (winST > startST && winST < (startST + win_w)) {
            /*console.log($(left).css("left"));*/
            $(left).css("left", (leftFinish + winST) + "px");
            a = parseInt($('.position-left').css('left'));
            a += winST;
        }


        /*
         console.log(a);*/
        if (winST > (startST + win_w)) {

            $(left).css("left", (a - winST) + "px");
            /*$(left).css("top", winST + "px");*/
        }
    });

    /*скролл первая правая картинка*/
    var right = $('.position-right');
    var rightP = parseInt($('.position-right').css('right'));
    var start_rightST = 0;
    var b = 0;
    var rightFinish = rightP - start_rightST;
    $(window).scroll(function () {
        winST = $(window).scrollTop();

        if (winST > start_rightST && winST < (start_rightST + win_w)) {
            /*console.log($(left).css("left"));*/
            $(right).css("right", (rightFinish + winST) * 1.3 + "px");
            b = parseInt($('.position-right').css('right'));
            b += winST;
        }
        if (winST > (start_rightST + win_w)) {

            $(right).css("right", (b - winST) + "px");
            /*$(left).css("top", winST + "px");*/
        }
        /*
         if (winST == 0) {
         $(right).css("right", -246 + "px");
         }*/
    });
}



/*ховер в блоке о нас*/
$(function() {

    var $images = $('.us__img'),
        $container = $('.us__img-wrap');

    $images.on('mouseover', function() {
        $container.addClass('_image-hovered');
    });

    $images.on('mouseout', function() {
        $container.removeClass('_image-hovered');
    });

});



    <!--скрипт для скролинга-->

var $hamburger = $(".hamburger");
var $main_menu_show = $(".main-menu");
$hamburger.on("click", function (e) {
    $hamburger.toggleClass("is-active");
    $main_menu_show.toggleClass("show__none");
    // Do something else, like open/close menu
});


if (window.matchMedia('(min-width: 969px)').matches) {
    $main_menu_show.removeClass("menu__abx");
    $(function () {
        $(window).scroll(function () {
            var winTop = $(window).scrollTop();
            if (winTop >= 172) {
                $(".contacts-hamburger").addClass("show__inline");
                $(".contacts__repairs_show").addClass("show__inline");
                $(".contacts__mail").addClass("contacts__mail_show");
                $(".contacts__adds").addClass("contacts__adds_show");
                $(".main-header__content").addClass("show__none");
                $(".main-menu").addClass("show__none");
                $(".hamburger").removeClass("is-active");
                $(".main-header").addClass("show__fixed");//Добавляем фиксацию
            } else {
                $(".main-header").removeClass("show__fixed");//Убираем фиксацию

                $(".main-menu").removeClass("show__none");

                $(".main-header__content").removeClass("show__none");
                $(".contacts__mail").removeClass("contacts__mail_show");
                $(".contacts__adds").removeClass("contacts__adds_show");
                $(".contacts-hamburger").removeClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
            }//if-else
        });//win func.
    });//ready func.
}

/*медиа скрипт для экранов  брекпоинт 800*/
if (window.matchMedia('(max-width: 969px)').matches) {
    $main_menu_show.removeClass("menu__abx");
    // do functionality on screens smaller than 799px
    /*$(".main-menu").addClass("show__none");*/
    //функция скроллинга
    $(function () {
        $(window).scroll(function () {
            var winTop = $(window).scrollTop();
            if (winTop >= 590) {
                $(".contacts-hamburger").addClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
                $(".contacts__mail").addClass("contacts__mail_show");
                $(".contacts__adds").addClass("contacts__adds_show");
                $(".main-header__content").addClass("show__none");
                $(".main-menu").addClass("show__none");
                $(".hamburger").removeClass("is-active");
                $(".main-header").addClass("show__fixed");//Добавляем фиксацию
            } else {
                $(".main-header").removeClass("show__fixed");//Убираем фиксацию

                /*$(".main-menu").removeClass("show__none");*/

                $(".main-header__content").removeClass("show__none");
                $(".contacts__mail").removeClass("contacts__mail_show");
                $(".contacts__adds").removeClass("contacts__adds_show");
                $(".contacts-hamburger").removeClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
                $(".main-menu").removeClass("show__none");
            }//if-else
        });//win func.
    });//ready func.
}

/*брекпоинт 600*/
if (window.matchMedia('(max-width: 799px)').matches) {
    $hamburger.on("click", function (r) {
        /*$hamburger.toggleClass("is-active");*/
        $main_menu_show.toggleClass("menu__abx");
        // Do something else, like open/close menu
    });
    /*$main_menu_show.removeClass("menu__abx");
    // do functionality on screens smaller than 799px
    /!*$(".main-menu").addClass("show__none");*!/
    $main_menu_show.toggleClass("menu__abx");*/
    //функция скроллинга
    $(function () {
        $(window).scroll(function () {
            var winTop = $(window).scrollTop();
            if (winTop >= 300) {
                $main_menu_show.removeClass("menu__abx");
                $(".contacts-hamburger").addClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
                $(".contacts__mail").addClass("contacts__mail_show");
                $(".contacts__adds").addClass("contacts__adds_show");
                $(".main-header__content").addClass("show__none");
                $(".main-menu").addClass("show__none");
                $(".hamburger").removeClass("is-active");
                $(".main-header").addClass("show__fixed");//Добавляем фиксацию
            } else {
                $(".main-header").removeClass("show__fixed");//Убираем фиксацию

                /*$(".main-menu").removeClass("show__none");*/

                $(".main-header__content").removeClass("show__none");
                $(".contacts__mail").removeClass("contacts__mail_show");
                $(".contacts__adds").removeClass("contacts__adds_show");
                $(".contacts-hamburger").removeClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
            }//if-else
        });//win func.
    });//ready func.
}
/*брекпоинт 320*/
if (window.matchMedia('(max-width: 479px)').matches) {
    // do functionality on screens smaller than 799px
    $(".main-menu").addClass("show__none");
    //функция скроллинга
    $(function () {
        $(window).scroll(function () {
            var winTop = $(window).scrollTop();
            if (winTop >= 300) {
                $(".contacts-hamburger").addClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
                $(".contacts__mail").addClass("contacts__mail_show");
                $(".contacts__adds").addClass("contacts__adds_show");
                $(".main-header__content").addClass("show__none");
                $(".main-menu").addClass("show__none");
                $(".hamburger").removeClass("is-active");
                $(".main-header").addClass("show__fixed");//Добавляем фиксацию
            } else {
                $(".main-header").removeClass("show__fixed");//Убираем фиксацию

                /*$(".main-menu").removeClass("show__none");*/

                $(".main-header__content").removeClass("show__none");
                $(".contacts__mail").removeClass("contacts__mail_show");
                $(".contacts__adds").removeClass("contacts__adds_show");
                $(".contacts-hamburger").removeClass("show__inline");
                $(".contacts__repairs_show").removeClass("show__inline");
            }//if-else
        });//win func.
    });//ready func.
}

/*Медиа скрипт для экранов меньше */

/*скрипт для слайдера*/

/*слайдер запчастей*/
$(document).ready(function () {
    $('.slaider-spares').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        rows: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: -1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                }
            }
        ],
    });
});
/*ставим управление сладера на кастомные стрелочки*/
$('.spares__arrow-next').on('click', function() {
    $('.slaider-spares').slick('slickNext');
});
$('.spares__arrow-prev').on('click', function() {
    $('.slaider-spares').slick('slickPrev');
});

/*Слайдер для акций*/
$(document).ready(function () {
    $('.action__slaider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        /*autoplay: true,*/
        arrows: false,
        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
});
/*ставим управление сладера на кастомные стрелочки*/
$('.action__arrow-next').on('click', function() {
    $('.action__slaider').slick('slickNext');
});
$('.action__arrow-prev').on('click', function() {
    $('.action__slaider').slick('slickPrev');
});

/*блок о нас слайдер картинок*/
$(document).ready(function () {
    $('.us__img-slaider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,

        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
});
$('.us__arrow-next').on('click', function() {
    $('.us__img-slaider').slick('slickNext');
});
/*test o nas img*/
$(document).ready(function () {
    $('.test__img-slaider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,

        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
});
$('.us__arrow-next').on('click', function() {
    $('.test__img-slaider').slick('slickNext');
});
/*end test*/
$('.us__arrow-prev').on('click', function() {
    $('.test__img-slaider').slick('slickPrev');
});
/*слайдер блок 9 причин*/
$(document).ready(function () {
    $('.cause__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 3,

    })
});
$('.cause__arrow-next').on('click', function() {
    $('.cause__slider').slick('slickNext');
});
$('.cause__arrow-prev').on('click', function() {
    $('.cause__slider').slick('slickPrev');
});

/*слайдер отзывы*/
$(document).ready(function () {
    $('.reviews__slaider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
    /*ставим управление сладера на кастомные стрелочки*/
    $('.reviews__arrow-next').on('click', function() {
        $('.reviews__slaider').slick('slickNext');
    });
    $('.reviews__arrow-prev').on('click', function() {
        $('.reviews__slaider').slick('slickPrev');
    });

});

/*слайдер для страницы товаров*/
$(document).ready(function () {
    $('.products-content__slaider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 4,
        responsive: [
            /*{
                breakpoint: 971,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    rows: 4,
                }
            },*/
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 4,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2,
                }
            }
        ],
    });
});
$('.products__arrow-next').on('click', function() {
    $('.products-content__slaider').slick('slickNext');
});
$('.products__arrow-prev').on('click', function() {
    $('.products-content__slaider').slick('slickPrev');
});

/*слайдер отзывы 2 колонки*/
$(document).ready(function () {
    $('.about__slaider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        rows: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
    });
    /*ставим управление сладера на кастомные стрелочки*/
    $('.about-reviews__arrow-next').on('click', function() {
        $('.about__slaider').slick('slickNext');
    });
    $('.about-reviews__arrow-prev').on('click', function() {
        $('.about__slaider').slick('slickPrev');
    });

});
/*ставим управление сладера на кастомные стрелочки*/
$('#about-reviews__arrow-next').on('click', function () {
    $('.about__slaider').slick('slickNext');
});
$('#about-reviews__arrow-prev').on('click', function () {
    $('.about__slaider').slick('slickPrev');
});

/*слайдер страница клиенты*/
$(document).ready(function () {
    $('.clients__slaider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        rows: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],

    });
});
/*ставим управление сладера на кастомные стрелочки*/
$('.clients__arrow-next').on('click', function() {
    $('.clients__slaider').slick('slickNext');
});
$('.clients__arrow-prev').on('click', function() {
    $('.clients__slaider').slick('slickPrev');
});

/*страница акции(stocks)*/
/*Слайдер для акций*/
$(document).ready(function () {
    $('.stocks__slaider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 3,
        /*autoplay: true,*/
        arrows: false,
        responsive: [
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2,
                }
            }
        ],
    });
});
/*ставим управление сладера на кастомные стрелочки*/
$('.action__arrow-next').on('click', function() {
    $('.stocks__slaider').slick('slickNext');
});
$('.action__arrow-prev').on('click', function() {
    $('.stocks__slaider').slick('slickPrev');
});

<!--скрипт для вкладок-->

$(document).ready(function () {
    $(".tabs").lightTabs();
});


(function ($) {
    jQuery.fn.lightTabs = function (options) {

        var createTabs = function () {
            tabs = this;
            i = 0;

            showPage = function (i) {
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }

            showPage(0);

            $(tabs).children("ul").children("li").each(function (index, element) {
                $(element).attr("data-page", i);
                i++;
            });

            $(tabs).children("ul").children("li").click(function () {
                showPage(parseInt($(this).attr("data-page")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

/*лайтбокс*/
$('.test-popup-link').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    // other options
    closeOnContentClick: true
});

