const swiper = new Swiper(".choice-swiper", {
  speed: 400,
  spaceBetween: 20,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  pagination: {
    el: ".choice-pagination",
    bulletClass: "choice-pagination-bullet",
    bulletActiveClass: "choice-pagination-bullet-active",
    clickable: true,
  },

  coverflowEffect: {
    rotate: 0,
    slideShadows: false,
    stretch: 0,
    depth: 60,
    modifier: 1,
  },

  // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //     draggable: true,
  //   },
});
