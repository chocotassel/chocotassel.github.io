let login = document.querySelector('#login');
let register = document.querySelector('#register');
let form_box = document.querySelector('.form-box');
let register_box = document.querySelector('.register-box');
let login_box = document.querySelector('.login-box');

register.addEventListener('click', () => {

  if(window.innerWidth > 900) form_box.style.transform='translateX(111%)';
  login_box.classList.add('hidden');
  register_box.classList.remove('hidden');
})

login.addEventListener('click', () => {
  if(window.innerWidth > 900) form_box.style.transform='translateX(0%)';
  register_box.classList.add('hidden');
  login_box.classList.remove('hidden');
})


let imgs = document.querySelectorAll("img")
for(var img of imgs){
  img.onerror = () => {
    this.src = "../img/error.png";
  }
}