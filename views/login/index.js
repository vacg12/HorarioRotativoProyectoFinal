const emailInput = document.querySelector('#mail-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-login');

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
         }
         await axios.post('/api/login', user);
         console.log(user);
         window.location.pathname = `/scheduleflex/`;
        
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
    }
});