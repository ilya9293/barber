// const tokenTG = "7729362550:AAENBhQKCm_hYXkg9vATtOwgBkFgInN0F-I";
// const idTG = "-1002210596451";
// const message = "Hello";

// const formRegistry = document.querySelector(".form-registry");
// formRegistry.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const params = {
//     chat_id: idTG,
//     text: message,
//   };
//   try {
//     const response = await fetch(`https://api.telegram.org/bot${tokenTG}/sendMessage`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     });

//     if (response.ok) {
//       console.log("All ok");
//     } else {
//       console.log("error in try");
//     }
//   } catch (error) {
//     console.log("error in catch");
//   }
// });
