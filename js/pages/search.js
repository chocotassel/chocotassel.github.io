import {renderWebList} from './renderWebList.js'

var allJson = []
var tabbarJson = []
var webList = document.querySelector("#web-list-wrapper")

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

//获取全部list，发起异步请求
const base_url = 'http://127.0.0.1:8088'

new Promise((resolve, reject) => {
  $.ajax({
    type: 'GET',
    url: `${base_url}/weblist`,
    success: function(result) {
      // console.log(result.data);
      allJson = result.data
      renderWebList(allJson, webList);
      resolve(allJson)
    },
    error: function(err) {
      fetch("/public/data/all.json")
      .then(res => res.json())
      .then(json => allJson = json)
      .then(() => reject(err))
      
    }
  })
}).then(value => {
  render()
}).catch(err => {
  render()
  renderWebList(allJson, webList);
})



//列表渲染
function render() {
  fetch("/public/data/tabbarList.json")
  .then(res => {
    return res.json()
  }).then(json => {
    tabbarJson = json
    renderTabbarList(json)
  })
}

//根据类型名称获取weblist
function getListByTitle(s) {
  var j = {}
  for(j of tabbarJson){
    if(j.label == s) {
      break;
    }
  }
  var list = []
  for(var web of allJson){
    if(web.type == j.type && web.num == j.num) {
      list.push(web)
    }
  }
  return list;
}





//挂载tabbar
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
          tabTypeLists[i].innerHTML += `<div class="tab-item tab-item-selected" value="${json[j].num}" isSelected=true>${json[j].label}</div>`
          //将选中信息添加到tabbarWrapper上
          tabbarWrapper.isSelectedType = json[j].type
          tabbarWrapper.isSelectedNum = json[j].num
          renderWebList(getListByTitle(json[j].label), webList)
          console.log(1);
        }else {
          tabTypeLists[i].innerHTML += `<div class="tab-item" value="${json[j].num}">${json[j].label}</div>`
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
       // 网址列表渲染
       renderWebList(getListByTitle(this.innerText), webList)
      
    })
  }
  
}



//排序栏
var selectItems = document.querySelectorAll(".select-item")
for(var i = 1; i < selectItems.length; i++){
  selectItems[i].addEventListener("mouseover", function(){
    this.querySelector("ul").classList.remove("hidden")
  })
  selectItems[i].addEventListener("mouseleave", function(){
    this.querySelector("ul").classList.add("hidden")
  })
}


