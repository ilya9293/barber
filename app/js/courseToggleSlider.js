const courseProgramme = document.querySelector("#course-programme");

document.addEventListener("DOMContentLoaded", () => {
  [...courseProgramme.children].forEach((item) => {
    const heightModule = item.firstElementChild.scrollHeight;
    const lastChild = item.lastElementChild;
    const computedStyle = window.getComputedStyle(lastChild);
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

    if (heightModule > lastChild.scrollHeight - paddingBottom) {
      lastChild.lastElementChild.classList.add("hide");
    }
    lastChild.style.height = heightModule + "px";
  });
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
