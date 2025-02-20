const successMsg = "Контакти успішно відправлені";
const errorMsg = "Упс! Щось пішло не так. Спробуйте пізніше";
const URL_TG = `https://eozn3r1wxavwgbg.m.pipedream.net`;
const headersTG = {
  headers: {
    "Content-Type": "application/json",
  },
};

const notyf = new Notyf({
  position: { x: "right", y: "top" },
  dismissible: true,
  duration: 3000,
  ripple: false,
});

const createValidator = (selector) => {
  const validatorForm = new window.JustValidate(selector, {
    tooltip: {
      position: "top",
    },
    errorLabelCssClass: ["error-label"],
    errorFieldCssClass: ["error-input"],
  });

  validatorForm
    .addField(".form-registry__input[name='name']", [
      {
        rule: "required",
        errorMessage: "Поле обов'язкове",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Мінімальна довжина — 2 символи",
      },
    ])
    .addField(".form-registry__input[name='email']", [
      {
        rule: "required",
        errorMessage: "Поле обов'язкове",
      },
      {
        rule: "email",
        errorMessage: "Введіть коректний email",
      },
    ])
    .addField(".form-registry__input[name='phone']", [
      {
        rule: "required",
        errorMessage: "Поле обов'язкове",
      },
      {
        rule: "customRegexp",
        value: /^[\d ]+$/,
        errorMessage: "Тільки цифри",
      },
      {
        validator: (value) => value.replace(/\s/g, "").length === 10,
        errorMessage: "Номер має містити рівно 10 цифр",
      },
    ]);
  return validatorForm;
};

const formCourse = ".form-registry--course";
const formAdress = ".form-registry--adress";

const courseValidator = createValidator(formCourse);
const addressValidator = createValidator(formAdress);

const formRegistryCourse = document.querySelector(formCourse);
const formRegistryAdress = document.querySelector(formAdress);

[formRegistryCourse, formRegistryAdress].forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { name, email, phone } = e.target.elements;
    const validator = form.classList.contains(formCourse)
      ? courseValidator
      : addressValidator;

    if (validator.isValid) {
      const msg = `Нова заявка:\n Ім'я: ${name.value.trim()}\n Email: ${email.value.trim()}\n Телефон: ${phone.value.trim()}`;
      try {
        const response = await axios.post(URL_TG, msg, headersTG);
        if (response.data.success) {
          notyf.success(successMsg);
          e.target.reset();
        } else {
          notyf.error(errorMsg);
          e.target.reset();
        }
      } catch (error) {
        notyf.error(errorMsg);
        e.target.reset();
      }
    }
  });
});
