import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const promise = new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      
    if (shouldResolve) {
      resolve({ position, delay });
      
    } else {
      reject({ position, delay });
      } 
  }, delay);
  });
  return promise;
}
const form = document.querySelector('.form')
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
  let delay = Number(e.currentTarget.delay.value);
  const amount = Number(e.currentTarget.amount.value);
  const step = Number(e.currentTarget.step.value);
  for (let i=1; i <= amount; i += 1) {
    createPromise(i, delay)
  .then(({ position, delay }) => {
    //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notiflix.Notify.success(`Fulfill promise ${position} in $[delay] ms`)
  })
  .catch(({ position, delay }) => {
    //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`Rejected promise ${position} in $[delay] ms`)
  });
  delay += step;
}
}