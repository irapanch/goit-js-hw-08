import throttle from 'lodash.throttle'; // імпортуємо й використовуємо функцію throttle для обмеження частоти виконання функції


// Отримуємо посилання на форму та її елементи
const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input'),
  messageInput: document.querySelector('textarea'),
};

const saveForm = 'feedback-form-state'; //ключ для доступу до поточних значень полів форми у локальному сховищі
const userDataSave = JSON.parse(localStorage.getItem(saveForm)); //отримуємо значення з локального сховища за допомогою ключа saveForm

let objLocal = userDataSave || {}; // створюємо змінну, значення якої залежить від наявності даних в userDataSave.

refs.form.addEventListener('input', throttle(onFormInput, 500));  // додаємо прослуховувач події інпут, що обмежує частоту викликів функції onFormInput (оновлення сховища) на кожні 500 мс й запам'ятовує значення введених даних
refs.form.addEventListener('submit', onFormSubmit); // 

function onFormInput(event) { // функція запам'ятовує значення введення у об'єкт objLocal та зберігає його в локальному сховищі  
  objLocal[event.target.name] = event.target.value;
  localStorage.setItem(saveForm, JSON.stringify(objLocal));
}

if (userDataSave) {  // якщо  дані були збережені раніше, то значення email та message встановлюються на відповідні значення з userDataSave або порожній рядок
  refs.emailInput.value = userDataSave.email || '';
  refs.messageInput.value = userDataSave.message || '';
}


function onFormSubmit(event) { //додаємо обробник події  до форми при натисканні на кнопку "submit" 
  if (refs.emailInput.value === '' || refs.messageInput.value === '') { // перевіряємо, чи всі поля заповнені. Якщо вони порожні, з'являється спливаюче повідомлення 
    alert('Всі поля повинні бути заповнені');
  } else{
  event.preventDefault(); //запобігається перезавантаження сторінки
  console.log(objLocal); // виконується виведення значення email та message в консоль
  objLocal = {};  // очищується об'єкт objLocal
  refs.form.reset(); // форма скидається до початкового стану
  localStorage.removeItem(saveForm);  // дані видаляються зі сховища браузера
  }
}

// ===================
// Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".

// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.

// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.

// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.