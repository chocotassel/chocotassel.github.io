let toLogin = document.querySelector('#toLogin');
let toRegister = document.querySelector('#toRegister');

let login = document.querySelector('#login');
let register = document.querySelector('#register');

let form_box = document.querySelector('.form-box');
let register_box = document.querySelector('.register-box');
let login_box = document.querySelector('.login-box');


toLogin.addEventListener('click', () => {
  if(window.innerWidth > 900) form_box.style.transform='translateX(0%)';
  register_box.classList.add('hidden');
  login_box.classList.remove('hidden');
})
toRegister.addEventListener('click', () => {
  if(window.innerWidth > 900) form_box.style.transform='translateX(111%)';
  login_box.classList.add('hidden');
  register_box.classList.remove('hidden');
})


login.addEventListener("click", function() {
  let user = JSON.parse(window.localStorage.getItem("user"))
  let inputs = this.parentNode.querySelectorAll("input")
  if(inputs[0].value == user.username && inputs[1].value == user.password) {
    alert("登录成功");
    console.log(location);
  }else {
    alert("用户名或密码错误")
    window.location.href = "/pages/login.html"
  }
})

register.addEventListener("click", function() {
  let inputs = this.parentNode.querySelectorAll("input")
  console.log(inputs);
  let data = {
    username: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value,
  }
  window.localStorage.setItem("user", JSON.stringify(data))
})



let imgs = document.querySelectorAll("img")
for(var img of imgs){
  img.onerror = () => {
    this.src = "/public/img/error.png";
  }
}