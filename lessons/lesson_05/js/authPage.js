import { registerUser, loginUser} from './auth.js';


const authForm = document.querySelector('#authForm');
const authLogin = document.querySelector('#authLogin');
const authPassword = document.querySelector('#authPassword');
const authMessage = document.querySelector('#authMessage');

authForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const login = authLogin.value;
    const password = authPassword.value;
    
    
    authMessage.textContent = '';
    try {
        if (event.submitter.id === 'registerBtn'){
            regidterUser(login, password);
        } else {
            loginUser(login, password);
        }
        window.location.href = './index.html'
    }catch (error) {
        authMessage.textContent = error.message;
    }
})