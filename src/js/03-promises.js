import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector('.form').addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// ? Не знаю можно ли вызывать медоты then() и catch() сразу же на экземпляре (как в закоменченом варианте). Подскажи пожалуйста, какой из этих двух вариантов более пралиный? И так и так работает вроде правильно, но вот не знаю как правильно в плане синтаксиса)))

// function onFormSubmit(e) {
//   e.preventDefault();

//   let delay = Number(e.target.delay.value);
//   const step = Number(e.target.step.value);
//   const amount = Number(e.target.amount.value);

//   for (let i = 1; i <= amount; i += 1) {
//     createPromise(i, delay);
//     delay += step;
//   }
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   })
//     .then(({ position, delay }) => {
//       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
//     })
//     .catch(({ position, delay }) => {
//       Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
//     });
// }
