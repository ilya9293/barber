const swiper = new Swiper(".choice-swiper", {
  speed: 400,
  spaceBetween: 20,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  coverflowEffect: {
    rotate: 0,
    slideShadows: false,
    stretch: 0,
    depth: 60,
    modifier: 1,
  },

  pagination: {
    el: ".choice-pagination",
    bulletClass: "choice-pagination-bullet",
    bulletActiveClass: "choice-pagination-bullet-active",
    clickable: true,
  },

  navigation: {
    nextEl: ".choice-navigation-next",
    prevEl: ".choice-navigation-prev",
  },

  breakpoints: {
    768: {
      spaceBetween: 30,
    },
    1235: {
      spaceBetween: 70,
      coverflowEffect: {
        depth: 129,
      },
    },
  },
});
