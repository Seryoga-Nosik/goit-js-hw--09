import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  daysCont: document.querySelector('[data-days]'),
  hoursCont: document.querySelector('[data-hours]'),
  minutesCont: document.querySelector('[data-minutes]'),
  secondsCont: document.querySelector('[data-seconds]'),
};
const { input, startBtn, stopBtn, daysCont, hoursCont, minutesCont, secondsCont } = refs;

startBtn.disabled = true;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      startBtn.disabled = true;
      return Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
  },
};

const fp = flatpickr(input, options);

function onStartClick() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = fp.selectedDates[0].getTime() - currentTime;
    console.log('deltaTime', deltaTime);
    const time = convertMs(deltaTime);
    updateTimer(time);
    if (deltaTime < 700) {
      finishTimer();
      Notify.success('Timer finished', { timeout: 10000 });
    }
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  input.disabled = true;
}

function onStopBtnClick() {
  Notify.warning('Timer stoped', { timeout: 5000 });
  finishTimer();
}

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

function updateTimer({ days, hours, minutes, seconds }) {
  daysCont.textContent = addLeadingZero(days);
  hoursCont.textContent = addLeadingZero(hours);
  minutesCont.textContent = addLeadingZero(minutes);
  secondsCont.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function finishTimer() {
  clearInterval(intervalId);
  stopBtn.disabled = true;
  input.disabled = false;
  daysCont.textContent = '00';
  hoursCont.textContent = '00';
  minutesCont.textContent = '00';
  secondsCont.textContent = '00';
}
