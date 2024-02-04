// Import iziToas library
import iziToast from "izitoast";
// Add import styles
import "izitoast/dist/css/iziToast.min.css";


document.addEventListener('DOMContentLoaded', function () {
  const formElement = document.getElementById('promiseForm');

  if (formElement) {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();

      const delayInput = document.querySelector('[name="delay"]');
      const stateInput = document.querySelector('[name="state"]:checked');

      if (!delayInput.checkValidity() || !stateInput) {
        // Validate inputs
        iziToast.error({ title: 'Error', message: 'Invalid input. Please fill all fields.' });
        return;
      }

      const delay = parseInt(delayInput.value);

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (stateInput.value === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      promise
        .then((delay) => {
          iziToast.success({ title: 'Fulfilled', message: `✅ Fulfilled promise in ${delay}ms` });
        })
        .catch((delay) => {
          iziToast.error({ title: 'Rejected', message: `❌ Rejected promise in ${delay}ms` });
        });
    });
  }
});