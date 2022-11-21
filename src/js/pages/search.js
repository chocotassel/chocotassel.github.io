
//获取query参数
function GetRequest() {    
  var url = location.search
  url = decodeURI(url)
  var kv = {}
  if (url.indexOf("?") != -1) {
    var str = url.slice(url.indexOf("?") + 1)
    var arr = str.split('&')
    for(var i = 0; i < arr.length; i++) {
      kv[arr[i].split("=")[0]] = arr[i].split("=")[1]
    }
  }
  return kv;
}

//根据type和num获取item
function getTabItem(type, num){
  var tabTypeLists = document.querySelectorAll(".tabbar")
  for(var i = 1; i <= tabTypeLists.length; i++){
    var tabItems = tabTypeLists.querySelectorAll(".tab-item")
    for (let j = 1; j <= tabItems.length; j++) {
      if(type == i && num == j) return tabItems[j]
    }
  }
  return
}

//列表渲染
fetch("/public/data/tabbarList.json")
.then(res => {
  return res.json()
}).then(json => {
  renderTabbarList(json)
})

//挂载
function renderTabbarList(json) {
  var tabbarWrapper = document.querySelector("#tabbar-wrapper")
  var tabTypeLists= document.querySelectorAll(".tabbar")
  var kv = GetRequest()

  //遍历4个大类
  for(var i = 0; i < tabTypeLists.length; i++){
    //遍历json数组
    for (let j = 0; j < json.length; j++) {
      if (json[j].type == i + 1) {
        //判断是否和query参数相同
        if(kv.type == json[j].type && kv.num == json[j].num){
          tabTypeLists[i].innerHTML += `<div class="tab-item tab-item-selected" value="${json[j].num}" isSelected=true>${json[j].title}</div>`
          //将选中信息添加到tabbarWrapper上
          tabbarWrapper.isSelectedType = json[j].type
          tabbarWrapper.isSelectedNum = json[j].num
        }else {
          tabTypeLists[i].innerHTML += `<div class="tab-item" value="${json[j].num}">${json[j].title}</div>`
        }
      }
      
    }
  }

  //添加点击事件 更改button背景
  var tabItems = document.querySelectorAll(".tab-item")
  for(var item of tabItems){
    item.addEventListener("click", function(){
      if(!this.classList.contains("tab-item-selected")){
        for(var it of tabItems) {
          if(it.classList.contains("tab-item-selected")) {
            it.classList.remove("tab-item-selected")
            break
          }
        }
        this.classList.add("tab-item-selected")
      }
    })
  }
  
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
import gouwuJson from '/public/data/购物.json' assert { type: 'json' };
var webList = document.querySelector("#web-list-wrapper")
renderWebList(gouwuJson, webList)

// console.log(window.location.search);