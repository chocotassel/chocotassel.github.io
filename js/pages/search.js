var tabItems = document.querySelectorAll(".tab-item")

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

// 网址列表渲染
import {renderWebList} from './renderWebList.js'
import gouwuJson from '/data/购物.json' assert { type: 'json' };
var webList = document.querySelector("#web-list-wrapper")
renderWebList(gouwuJson, webList)