import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const text = document.querySelector('#datetime-picker')
const timerHtml = document.querySelector('.timer')
const days = document.querySelector('span[data-days]')
const hours = document.querySelector('span[data-hours]')
const minutes = document.querySelector('span[data-minutes]')
const seconds = document.querySelector('span[data-seconds]')


btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        btnStart.disabled = true; 
      } else {
        btnStart.disabled = false;
      }

    },
  };
  flatpickr(text, options); //визиває календар до інпуту

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
return value.toString().padStart(2, '0')
  }

  btnStart.addEventListener('click', () => {
    let timer = setInterval(() => {
    let countDown = new Date(text.value) - new Date();
    btnStart.disabled = true;

    if (countDown >= 0) {
        let timeObject = convertMs(countDown);
        days.textContent = addLeadingZero(timeObject.days);
        hours.textContent = addLeadingZero(timeObject.hours);
        minutes.textContent = addLeadingZero(timeObject.minutes);
        seconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
        Notiflix.Notify.success('Countdown finished');
        clearInterval(timer);
    }



    }, 1000);
    
  })
  