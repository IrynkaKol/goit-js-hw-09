import Notiflix from 'notiflix';
//const delay = document.querySelector('input[name="delay"]');
//const step = document.querySelector('input[name="step"]');
//const amount = document.querySelector('input[name="amount"]');
//const btnCreatePromise = document.querySelector('button[type="submit"]');

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
    e.preveantDefault();
  let delay = Number(e.currentTarget.delay.value);
  const amount = Number(e.currentTarget.amount.value);
  const step = Number(e.currentTarget.step.value);
  for (let i=1; i <= amount; i += 1) {
    createPromise(1, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    //Notiflix.Notify.success(`Fulfill promise ${position} in $[delay] ms`)
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    //Notiflix.Notify.failure(`Rejected promise ${position} in $[delay] ms`)
  });
  delay += step
}
}