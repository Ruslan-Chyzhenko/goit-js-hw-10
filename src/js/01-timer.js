// Import flatpickr library
import flatpickr from "flatpickr";
// Add import styles
import "flatpickr/dist/flatpickr.min.css";
// Import iziToast library
import iziToast from 'izitoast';
// Add import styles
import "izitoast/dist/css/iziToast.min.css";

// Declare variable outside the method for timer access
let countdownInterval;
let userSelectedDate; // Adding a variable to save the selected date

// Event handler for the "Start" button
document.querySelector("[data-start]").addEventListener("click", function () {
  // Deactivate button and input
  document.querySelector("#datetime-picker").disabled = true;
  this.disabled = true;

  // Start the timer
  startCountdown(userSelectedDate);
});

// Function to start the countdown
function startCountdown(targetDate) {
  // Calculate the difference between the target and current date in milliseconds
  let timeDifference = targetDate.getTime() - new Date().getTime();

  // Update the interface every second
  countdownInterval = setInterval(function () {
    // Check if the timer is not yet finished
    if (timeDifference > 0) {
      // Call the function to convert milliseconds to days, hours, minutes, and seconds
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      // Update the interface with the obtained values
      updateTimerUI(days, hours, minutes, seconds);

      // Decrease the difference by 1 second
      timeDifference -= 1000;
    } else {
      // If the timer is finished, stop the interval
      clearInterval(countdownInterval);

      // Update the interface with values '0:00:00:00'
      updateTimerUI(0, 0, 0, 0);

      // Activate the input and show a toast
      document.getElementById("datetime-picker").disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
        position: 'topRight'
      });
    }
  }, 1000); // Updating every second interval
}

// Function to update the timer interface
function updateTimerUI(days, hours, minutes, seconds) {
  // Use addLeadingZero to format time units
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

// Function to format time units
function addLeadingZero(value) {
  // Add a leading zero to single digits '1-9'
  return value < 10 ? `0${value}` : value;
}

// Function to convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Initialize flatpickr
flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Check if the selected date is in the future
    if (selectedDates[0] && selectedDates[0] > new Date()) {
      // Save the selected date in a variable
      userSelectedDate = selectedDates[0];
      // Activate the "Start" button
      document.querySelector("[data-start]").disabled = false;
    } else {
      // If the date is invalid, disable the "Start" button
      document.querySelector("[data-start]").disabled = true;
      // Show a message
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
    }
  },
});