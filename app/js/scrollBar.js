document.addEventListener("DOMContentLoaded", () => {
   const links = document.querySelectorAll(".bottom-bar__link");
   const sections = [...links].map((link) => document.querySelector(link.getAttribute("href")));
 
   function onScroll() {
     let scrollPosition = window.scrollY;
 
     if (scrollPosition === 0) {
       links.forEach((link) => link.classList.remove("active"));
       links[0].classList.add("active");
       return;
     }
 
     sections.forEach((section, index) => {
       if (
         section.offsetTop <= scrollPosition + window.innerHeight / 2 &&
         section.offsetTop + section.offsetHeight > scrollPosition + window.innerHeight / 2
       ) {
         links.forEach((link) => link.classList.remove("active"));
         links[index].classList.add("active");
       }
     });
   }
 
   window.addEventListener("scroll", onScroll);
   onScroll();
 });
 