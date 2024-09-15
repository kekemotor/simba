(function($) { "use strict";

    $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");
            } else {
                header.removeClass("scroll-on").addClass('start-style');
            }
        });
    });

    //Animation

    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');
    });

    //Menu On Hover

    $('body').on('mouseenter mouseleave','.nav-item',function(e){
        if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
        }
    });

})(jQuery);



document.querySelector("#navbarSupportedContent").innerHTML=`
 <ul class="navbar-nav ml-auto py-4 py-md-0">
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                                    <a class="nav-link" href="index.html" >Главная</a>
                                </li>
                                 <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                                    <a class="nav-link" href="cart.html" >Магазин</a>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                                    <a class="nav-link" href="infoBoard.html" >Иформационный стенд</a>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                                    <a class="nav-link" href="registration.html" >Регистрация</a>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                    <a class="nav-link" href="Teem.html">Сотрудники</a>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                    <a class="nav-link" href="FAQ.html">Вопрос-Ответ</a>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Услуги</a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="diagnostic.html">Диагностические</a>
                                        <a class="dropdown-item" href="Therapeutic.html">Терапевтические</a>
                                        <a class="dropdown-item" href="Surgical.html">Хирургические</a>
                                        <a class="dropdown-item" href="Tooth.html">Стоматология</a>
                                        <a class="dropdown-item" href="Obstetrics.html">Акушерство</a>
                                        <a class="dropdown-item" href="Preventive.html">Профилактические</a>
                                        <a class="dropdown-item" href="Hospital.html">Стационар</a>
                                        <a class="dropdown-item" href="traumatology.html">Травматология</a>
                                    </div>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                    <a class="nav-link" href="book.html">Галерея</a>
                                </li>
                                <li class="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                    <a class="nav-link" href="certificate.html">Сертификат</a>
                                </li>
                            </ul>
`
console.log("ALL!!")
// document.querySelectorAll("#footer .box")[2]?.innerHTML = `<div class="box">
//             <h3>Социальные сети</h3>

//             <a href="#"> <i class="fa-brands fa-whatsapp"></i> whatsapp </a>

//         </div>`