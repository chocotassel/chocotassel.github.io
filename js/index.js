import hotDataJson from '/data/hotData.json' assert { type: 'json' };
import myJson from '/data/my.json' assert { type: 'json' };
import gouwuJson from '/data/购物.json' assert { type: 'json' };


// index recommend
var my = document.querySelector("#my-title")
var recommend = document.querySelector("#recommend-title")
var webList = document.querySelector("#web-list-wrapper")
var myListWrapper = document.querySelector("#my-list-wrapper")
var myList = document.querySelector("#my-list")
console.log(myList);


// menu
my.addEventListener("click", ()=> {
  webList.style.display = "none";
  myListWrapper.style.display = "block";
  my.classList.add("recommend-menu-item-selected");
  recommend.classList.remove("recommend-menu-item-selected");
})
recommend.addEventListener("click", ()=> {
  myListWrapper.style.display = "none";
  webList.style.display = "block";
  my.classList.remove("recommend-menu-item-selected");
  recommend.classList.add("recommend-menu-item-selected");
})


// my
function renderMyList(myJson) {
  myList.innerHTML = ""
  for(i = 0; i < myJson.length; i++){
    myList.innerHTML += 
    `<a class="my-item" title="${myJson[i].title}" href="${myJson[i].url}">
      <div class="my-delete-icon" style="display: none;"></div>
      <div class="my-icon">
        <img draggable="false" alt="" src="${myJson[i].url}/favicon.ico">
      </div>
      <div class="my-title"><span>${myJson[i].title}</span></div>
    </a>`
  }
}
renderMyList(myJson);

// my add

var myAdd = document.querySelector("#my-add");
var myAddContainer = document.querySelector("#my-add-container");
var myAddCancel = document.querySelector(".my-add-button").children[0];
var myAddFinish = document.querySelector(".my-add-button").children[1];
var addForm = document.addForm;


myAdd.addEventListener("click", () => {
  myAddContainer.classList.remove("hidden")
  console.log(2);
})

myAddCancel.addEventListener("click", () => {
  myAddContainer.classList.add("hidden")
})

myAddFinish.addEventListener("click", () => {
  var name = addForm["name"].value;
  var website = addForm["website"].value;
  if(name != "" && website != "") {
    myJson.push({
      "id": myJson.length + 1,
      "title": name,
      "url": website
    })
    renderMyList(myJson);
    myAddContainer.classList.add("hidden");
  }else{
    alert("请输入网址！")
  }
})




// web
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





// index hotRank
var hotItem = document.querySelectorAll(".hot-item")
var hotRank = document.querySelector(".hot-rank")
var i;
for(i = 0; i < 8; i++){
  hotRank.innerHTML += `<li class="hot-item"><a href=${hotDataJson[i].url}><span class="hot-item-index">${hotDataJson[i].id}</span><span class="hot-item-content">${hotDataJson[i].title}</span></a></li>`
}


var tabbarList = ["搜索","视频","游戏","购物","体育","小说","科技","社交","新闻","旅游","招聘","音乐","财经","ACGN"]
var tabbar = document.querySelector("#tabbar-wrapper")
for(i = 0; i < tabbarList.length; i++) {
  tabbar.innerHTML += `<a href="/pages/detail.html"><div class="tab-item">${tabbarList[i]}</div></a>`
}
tabbar.innerHTML += '<a href="/pages/search.html" class="tab-more">查看更多</a>'
