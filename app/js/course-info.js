document.addEventListener("DOMContentLoaded", function () {
  const CountUp = countUp.CountUp;
  const optionsOfCounter = {
    startVal: 1,
    duration: 2,
    useEasing: true,
    scrollSpyOnce: true,
  };

  function startCounting(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll(".course-info__num");
        numbers.forEach((num) => {
          const endValue = parseInt(num.innerText, 10);
          const counter = new CountUp(num, endValue, optionsOfCounter);

          if (!counter.error) {
            counter.start();
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }

  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver(startCounting, observerOptions);
  const target = document.querySelector(".course-info");

  if (target) observer.observe(target);
});
