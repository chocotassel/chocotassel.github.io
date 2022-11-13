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



//import
var myJson;
fetch('../data/hotData.json')
  .then((response) => {
    return response.json();
  }).then((json) => {
    renderHotRank(json);
  }).catch(e => {
    console.log("error!");
    console.log(e);
  });

fetch('../data/购物.json')
  .then((response) => {
    return response.json();
  }).then((json) => {
    renderWebList(json);
  }).catch(e => {
    console.log("error!");
    console.log(e);
  });

fetch('../data/my.json')
  .then((response) => {
    return response.json();
  }).then((json) => {
    myJson = json
    renderMyList(json);
  }).catch(e => {
    console.log("error!");
    console.log(e);
  });
// my
function renderMyList(json) {
  myList.innerHTML = ""
  for(var i = 0; i < json.length; i++){
    myList.innerHTML += 
    `<a class="my-item" title="${json[i].title}" href="${json[i].url}">
      <div class="my-delete-icon" style="display: none;"></div>
      <div class="my-icon">
        <img draggable="false" alt="" src="${json[i].url}/favicon.ico">
      </div>
      <div class="my-title"><span>${json[i].title}</span></div>
    </a>`
  }
  myList.innerHTML += 
  `<a class="my-item" id="my-add" href="#">
    <div class="my-delete-icon" style="display: none;"></div>
    <div class="my-icon">
      <img draggable="false" alt="" src="/img/icon/add.svg">
    </div>
    <div class="my-title"><span>添加网站</span></div>
  </a>`
  var myAdd = myList.querySelector("#my-add");
  myAdd.addEventListener("click", () => {
    myAddContainer.classList.remove("hidden")
    console.log(2);
  })
}

// web
function renderWebList(json) {
  for(var i = 0; i < json.length; i++){
    webList.innerHTML += `<div class="web-item">
      <a href="${json[i].url}" class="web-item-title">${json[i].title}</a>
      <div class="web-item-content">
        <img class="web-item-icon" src="${json[i].url}/favicon.ico" alt="">
        <div class="">
          <div class="web-item-description">${json[i].description}</div>
          <div class="aiticle-item-url">${json[i].url}</div>
        </div>
      </div>
    </div>`
  }
}

// index hotRank
function renderHotRank(json) {
  var hotRank = document.querySelector(".hot-rank")
  var i;
  for(i = 0; i < 8; i++){
    hotRank.innerHTML += `<li class="hot-item"><a href=${json[i].url}><span class="hot-item-index">${json[i].id}</span><span class="hot-item-content">${json[i].title}</span></a></li>`
  }


  var tabbarList = ["搜索","视频","游戏","购物","体育","小说","科技","社交","新闻","旅游","招聘","音乐","财经","ACGN"]
  var tabbar = document.querySelector("#tabbar-wrapper")
  for(i = 0; i < tabbarList.length; i++) {
    tabbar.innerHTML += `<a href="/pages/detail.html"><div class="tab-item">${tabbarList[i]}</div></a>`
  }
  tabbar.innerHTML += '<a href="/pages/search.html" class="tab-more">查看更多</a>'
  
}




// my add
var myAddContainer = document.querySelector("#my-add-container");
var myAddCancel = document.querySelector(".my-add-button").children[0];
var myAddFinish = document.querySelector(".my-add-button").children[1];
var addForm = document.addForm;

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
