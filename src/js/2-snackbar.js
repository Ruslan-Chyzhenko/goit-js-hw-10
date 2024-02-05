import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded!');
  
  const formElement = document.getElementById('promiseForm');

  if (formElement) {
    console.log('Form element found!');
    
    formElement.addEventListener('submit', function (event) {
      console.log('Form submitted!');
      event.preventDefault();

      const delayInput = document.querySelector('[name="delay"]');
      const stateInput = document.querySelector('[name="state"]:checked');

      if (!delayInput.checkValidity() || !stateInput || (stateInput.value !== 'fulfilled' && stateInput.value !== 'rejected')) {
        console.error('Invalid input. Please fill all fields and select a valid state.');
        iziToast.error({ title: 'Error', message: 'Invalid input. Please fill all fields and select a valid state.' });
        return;
      }

      const userDelay = parseInt(delayInput.value);

      const promise = createPromise(userDelay, stateInput);

      handlePromise(promise);
    });
  }
});

function createPromise(delay, stateInput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function handlePromise(promise) {
  promise
    .then((delay) => {
      console.log('Promise fulfilled!', delay);
      iziToast.success({ title: 'Fulfilled', message: `✅ Fulfilled promise in ${delay}ms` });
      formElement.reset();
    })
    .catch((delay) => {
      console.error('Promise rejected!', delay);
      iziToast.error({ title: 'Rejected', message: `❌ Rejected promise in ${delay}ms` });
      formElement.reset();
    });

  // Add message
  iziToast.info({
    title: 'Additional Info',
    message: `Type: ${stateInput.value}, Delay: ${userDelay}ms`
  });
}