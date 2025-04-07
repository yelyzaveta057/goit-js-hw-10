import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

//Налаштування для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    const currentDate = new Date();
    if (selectedDate.getTime() <= currentDate.getTime()) {
      startButton.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      userSelectedDate = selectedDate;
      iziToast.success({
        title: 'OK!',
        message: 'You can press Start!',
        position: 'center',
      });
      startButton.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

// Запуск таймера
startButton.addEventListener('click', startTimer);

function startTimer() {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  datePicker.disabled = true;

  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const timeLeft = userSelectedDate - new Date();

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    countdownInterval = null;
    updateTimerDisplay(0, 0, 0, 0);
    datePicker.disabled = false;
    startButton.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  updateTimerDisplay(days, hours, minutes, seconds);
}

// Функція для розрахунку часу
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

// Оновлення інтерфейсу
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Додавання 0 перед числом, якщо воно менше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
