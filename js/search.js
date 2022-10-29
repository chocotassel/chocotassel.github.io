// import { ajax } from 'jquery';
import gouwuJson from '/data/购物.json' assert { type: 'json' };var tabItems = document.querySelectorAll(".tab-item")


// console.log(tabItems);
for(var i of tabItems){
  // console.log(i);
  // i.addEventListener("click", ()=>{
  //   window.location.url
  // })
}

var selectItems = document.querySelectorAll(".select-item")
for(var i = 1; i < selectItems.length; i++){
  selectItems[i].addEventListener("mouseover", function(){
    this.querySelector("ul").classList.remove("hidden")
  })
  selectItems[i].addEventListener("mouseleave", function(){
    this.querySelector("ul").classList.add("hidden")
  })
}

// web
var webList = document.querySelector("#web-list-wrapper")
for(i = 0; i < gouwuJson.length; i++){
  webList.innerHTML += `<div class="web-item">
    <a href="${gouwuJson[i].url}" class="web-item-title">${gouwuJson[i].title}</a>
    <div class="web-item-content">
      <img class="web-item-icon" src="${gouwuJson[i].url}/favicon.ico" alt="">
      <div class="">
        <div class="web-item-description">${gouwuJson[i].description}</div>
        <div class="aiticle-item-url">${gouwuJson[i].url}</div>
      </div>
    </div>
  </div>`
}

// $.ajax({
//   url:"https://www.taobao.com/",
//   success: function(result) {
//     console.log(result);
//   }
// })