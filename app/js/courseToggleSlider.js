const courseProgramme = document.querySelector("#course-programme");

[...courseProgramme.children].forEach((item) => {
   const heightModule = item.firstElementChild.scrollHeight;   
   // if (heightModule > item.lastElementChild.scrollHeight) {
   //   item.lastElementChild.lastElementChild.classList.add("hide");
   // }
  item.lastElementChild.style.height = heightModule + "px";
});

courseProgramme.addEventListener("click", (e) => {
  if (e.target.classList.contains("box-slider")) {
    const activeClass = "slider-active";
    const courseWraper = e.target.parentElement;
    const courseModule = courseWraper.parentElement.firstElementChild.firstElementChild;

    if (courseWraper.classList.contains(activeClass)) {
      courseWraper.classList.remove(activeClass);
      courseWraper.style.height = courseModule.scrollHeight + "px";
    } else {
      courseWraper.classList.add(activeClass);
      courseWraper.style.height = courseWraper.scrollHeight + "px";
    }
  }
});
