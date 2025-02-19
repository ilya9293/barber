const scrollOptions = {
  // offset: 0,
  ease: "linear",
  align: "top",
  duration: 1000,
};

const menus = document.querySelectorAll(".menu");
[...menus].forEach((menu) => {
  menu.addEventListener("click", (e) => {
    const isLink = e.target.classList.contains("menu__link");
    if (isLink) {
      const href = e.target.getAttribute("href");
      scrollToElement(href, scrollOptions);
    }
  });
});

const btnToRegistry = document.querySelector(".btn-to-course__link");
const heroButton = document.querySelector(".hero__button");
[btnToRegistry, heroButton].forEach((link) => {
  link.addEventListener("click", () => {
    scrollToElement("#registry", scrollOptions);
  });
});

const bar = document.querySelector(".bottom-bar");
bar.addEventListener("click", (e) => {
  const link = e.target.closest(".bottom-bar__link");
  if (link) {
    const href = link.getAttribute("href");
    scrollToElement(href, scrollOptions);
  }
});
