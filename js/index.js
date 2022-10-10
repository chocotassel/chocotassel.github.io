import hotDataJson from '/data/hotData.json' assert { type: 'json' };

console.log(hotDataJson[0]);

var hotItem = document.querySelectorAll(".hot-item")
var hotRank = document.querySelector(".hot-rank")
var i;
for(i = 0; i < hotDataJson.length; i++){
  // hotItem[i].querySelector("a").href = hotDataJson[i].url
  // hotItem[i].querySelector(".hot-item-index").innerHTML = hotDataJson[i].id
  // hotItem[i].querySelector(".hot-item-content").innerHTML = hotDataJson[i].title
  hotRank.innerHTML += '<li class="hot-item"><a href=' + hotDataJson[i].url + '><span class="hot-item-index">' + hotDataJson[i].id + '</span><span class="hot-item-content">' + hotDataJson[i].title + '</span></a></li>'
  console.log(i)
}

var my = document.querySelector("#my")
var recommend = document.querySelector("#recommend")
var articleList = document.querySelector("#article-list-wrapper")
var websiteList = document.querySelector("#website-list-wrapper")
my.addEventListener("click", ()=> {
  articleList.style.display = "none";
  websiteList.style.display = "block";
  my.classList.add("article-menu-item-selected");
  recommend.classList.remove("article-menu-item-selected");
})
recommend.addEventListener("click", ()=> {
  websiteList.style.display = "none";
  articleList.style.display = "block";
  my.classList.remove("article-menu-item-selected");
  recommend.classList.add("article-menu-item-selected");
})