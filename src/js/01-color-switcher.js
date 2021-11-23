const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;
stopBtn.disabled = true;

function changeBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick(e) {
  changeBodyBgColor();
  intervalId = setInterval(changeBodyBgColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  document.body.removeAttribute('style');
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
