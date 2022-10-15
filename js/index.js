import hotDataJson from '/data/hotData.json' assert { type: 'json' };
import myJson from '/data/my.json' assert { type: 'json' };
import gouwuJson from '/data/购物.json' assert { type: 'json' };

//index login
var user = document.querySelector("#user")
var mask = document.querySelector(".mask")
user.addEventListener("click", () => { 
  mask.style.display = "block";
})
mask.addEventListener("click", () => {
  mask.style.display = "none";
})

// index hotRank
var hotItem = document.querySelectorAll(".hot-item")
var hotRank = document.querySelector(".hot-rank")
var i;
for(i = 0; i < hotDataJson.length; i++){
  hotRank.innerHTML += `<li class="hot-item"><a href=${hotDataJson[i].url}><span class="hot-item-index">${hotDataJson[i].id}</span><span class="hot-item-content">${hotDataJson[i].title}</span></a></li>`
  console.log(i)
}


// index recommend
var my = document.querySelector("#my-title")
var recommend = document.querySelector("#recommend-title")
var articleList = document.querySelector("#article-list-wrapper")
var myList = document.querySelector("#my-list-wrapper")

for(i = 0; i < 3; i++){
  myList.innerHTML += `<a class="my-item" title="${myJson[i].title}" href="${myJson[i].url}">
  <div class="my-delete-icon" style="display: none;"></div>
  <div class="my-icon">
    <img draggable="false" alt="" src="${myJson[i].url}/favicon.ico">
  </div>
  <div class="my-title"><span>${myJson[i].title}</span></div>
  </a>`
}
for(i = 0; i < 3; i++){
  articleList.innerHTML += `<div class="article-item">
    <a href="${gouwuJson[i].url}" class="article-item-title">${gouwuJson[i].title}</a>
    <div class="article-item-content">
      <img class="article-item-icon" src="${gouwuJson[i].url}/favicon.ico" alt="">
      <div class="">
        <div class="article-item-description">${gouwuJson[i].description}</div>
        <div class="aiticle-item-url">${gouwuJson[i].url}</div>
      </div>
    </div>
  </div>`
}



my.addEventListener("click", ()=> {
  articleList.style.display = "none";
  myList.style.display = "block";
  my.classList.add("recommend-menu-item-selected");
  recommend.classList.remove("recommend-menu-item-selected");
})
recommend.addEventListener("click", ()=> {
  myList.style.display = "none";
  articleList.style.display = "block";
  my.classList.remove("recommend-menu-item-selected");
  recommend.classList.add("recommend-menu-item-selected");
})



var tabbarList = ["搜索","视频","游戏","购物","体育","小说","科技","社交","新闻","旅游","招聘","音乐","财经","ACGN"]
var tabbar = document.querySelector("#tabbar-wrapper")
for(i = 0; i < tabbarList.length; i++) {
  tabbar.innerHTML += `<a href="/pages/detail.html"><div class="tab-item">${tabbarList[i]}</div></a>`
}
tabbar.innerHTML += '<a href="/pages/search.html" class="tab-more">查看更多</a>'
