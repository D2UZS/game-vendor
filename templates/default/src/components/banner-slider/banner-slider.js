import Swiper, { Navigation, Autoplay } from "swiper";

const bannerSlider = document.querySelector(".js-banner-slider");
if (bannerSlider) {
    new Swiper(bannerSlider, {
        modules: [Navigation, Autoplay],
        spaceBetween: 8,
        speed: 300,
        // loop: true,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
