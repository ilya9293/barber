const strokeWidth = 10;
const easing = "easeInOut";
const duration = 2000;
const color = "#17c7e6";
const trailColor = "#ddd";
const trailWidth = 10;

const courseDateStart = new ProgressBar.Circle("#course-date-stat", {
  strokeWidth,
  easing,
  duration,
  color,
  trailColor,
  trailWidth,
  text: {
   //  className: "course-date__stat",
    style: {
      color: "inherit",
    },
  },
//   step: function (_, circle) {
//     const number = Math.round(circle.value() * 12);
//     if (number === 0) {
//       circle.setText("");
//     } else {
//       circle.setText(`${number}/12`);
//     }
//   },
});

const courseDateNum = new ProgressBar.Circle("#course-date-num", {
  strokeWidth,
  easing,
  duration,
  color,
  trailColor,
  trailWidth,
});

const options = {
  root: null,
  threshold: 0.5,
};

const CountUp = countUp.CountUp;
  const optionsCounterDate = {
    startVal: 1,
    duration: 2,
    useEasing: true,
    scrollSpyOnce: true,
  };

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll(".course-date__stat");
      numbers.forEach((num) => {
        const endValue = parseInt(num.innerText, 10);
        const counter = new CountUp(num, endValue, optionsCounterDate);

        if (!counter.error) {
          counter.start();
        }
      });

      courseDateNum.animate(1);
      courseDateStart.animate(0.9);
      observer.unobserve(entry.target);
    }
  });
}, options);

const target = document.querySelector(".course-date");
observer.observe(target);
