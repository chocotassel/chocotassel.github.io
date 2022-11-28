import {renderWebList} from './renderWebList.js'

var allJson = []
var tabbarJson = []
var webList = document.querySelector("#web-list-wrapper")
var title = ''

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
      .then(data => {
        for(var d of data) {
          d.num = parseInt(d.num)
          d.id = parseInt(d.id)
          d.type = parseInt(d.type)
          d.click = parseInt(d.click)
          d.collect = parseInt(d.collect)
        }
        allJson = data
      })
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
       title = this.innerText
       renderWebList(getListByTitle(title), webList)
      
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

//综合排序
var comSortBtn = document.querySelector("#com-sort")
comSortBtn.addEventListener("click", function() {
  var list = title == "" ? allJson : getListByTitle(title)

  for(var i = 0; i < list.length; i++){
    for(var j = 0; j < i; j++){
      if(list[j].click + list[j].click < list[i].click+list[i].click) {
        [list[j], list[i]] = [list[i], list[j]]
      }
    }
  }
  renderWebList(list, webList)
})


//排序方式：按点击数排序
function sortByClick(method, list){
  var len = list.length
  for(var i = 0; i < len; i++){
    for(var j = 0; j < i; j++){
      if(method == 1 ? list[j].click < list[i].click : list[j].click > list[i].click) {
        [list[j], list[i]] = [list[i], list[j]]
      }
    }
  }
  return list
}
//排序方式：按收藏数排序
function sortByCollect(method, list){
  var len = list.length
  for(var i = 0; i < len; i++){
    for(var j = 0; j < i; j++){
      if(method == 1 ? list[j].collect < list[i].collect : list[j].collect > list[i].collect) {
        [list[j], list[i]] = [list[i], list[j]]
      }
    }
  }
  return list
}

//升序降序按钮添加事件
var sortBtns = document.querySelectorAll('.select-item-droplist > li')

for (var i= 0; i < sortBtns.length; i++){
  sortBtns[i].addEventListener('click', function(){
    // console.log(this.parentNode.parentNode.querySelector(".select-item-text").innerHTML);
    var list = title == "" ? allJson : getListByTitle(title)
    if(this.parentNode.parentNode.querySelector(".select-item-text").innerHTML == "点击"){
      renderWebList(sortByClick(this.value, list), webList)
    }else{
      renderWebList(sortByCollect(this.value, list), webList)
    }
  })
}



