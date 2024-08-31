import { createNotification } from '../components/notification.js'; 

const form = document.querySelector('#form');
const nameInput= document.querySelector('#name-input');
const emailInput= document.querySelector('#mail-input');
const passwordInput= document.querySelector('#password-input');
const matchInput= document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');

//Validaciones
const NAME_REGEX = /^[A-Z\u00f1\u00d1][a-zA-Z-ÿÁáéÉíÍÓóúÚ\u00f1\u00d1]+(\s*[A-Z\u00f1\u00d1][a-zA-Z-ÿÁáéÉíÍÓóúÚ\u00f1\u00d1\s]*)$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

const validation = (input, regexValidation) => {

    formBtn.disabled = nameValidation && emailValidation && passwordValidation && matchValidation ? false : true;

    //validacion para cambiar de color en tiempo real
    if (input.value === '') {
        input.classList.remove('outline-red-600', 'outline-2', 'outline');
        input.classList.remove('outline-green-400', 'outline-2', 'outline');
        input.classList.add('focus:outline-teal-500');
       }else if (regexValidation) {
        input.classList.remove('focus:outline-teal-500');
        input.classList.add('outline-green-400', 'outline-2', 'outline');
     } else if (!regexValidation) {
        input.classList.remove('focus:outline-teal-500');
        input.classList.remove('outline-green-400', 'outline-2', 'outline');
        input.classList.add('outline-red-600', 'outline-2', 'outline');
     }
};

//Eventos

nameInput.addEventListener('input', e => {

  nameValidation = NAME_REGEX.test(e.target.value);
  validation(nameInput, nameValidation);
 
});

passwordInput.addEventListener('input', e => {

    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    //el match es para que se valide tanto arriba como abajo en tiempo real
    matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation);
    validation(matchInput, matchValidation);
   
  });

matchInput.addEventListener('input', e => {

    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation);
   
  });

emailInput.addEventListener('input', e => {

    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
   
  });


  form.addEventListener('submit', async e => {
   e.preventDefault();
   try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      passwordH: passwordInput.value,
     }
     const {data} = await axios.post('/api/users', newUser);
     createNotification(false, data);
     setTimeout(() => {
      notification.innerHTML = '';}, 5000)

      nameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      matchInput.value = '';
      validation(nameInput, false);
      validation(emailInput, false);
      validation(passwordInput, false);
      validation(matchInput, false);


   } catch (error) {
    //para que desaparezca la notificacion en 5 segundos
    createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.innerHTML = '';}, 5000)
   }
   
  });
