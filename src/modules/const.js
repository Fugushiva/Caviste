const swiperContainer = document.querySelector(".swiper"); //L'ensemble du swiper

// const.js
const swiper = new Swiper(swiperContainer, {
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

export { swiper }; // Exportation du membre 'swiper'
export { swiperContainer };
