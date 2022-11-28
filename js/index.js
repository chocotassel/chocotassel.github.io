// import $ from "jquery"

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
fetch('/public/data/hotData.json')
  .then((response) => {
    return response.json();
  }).then((json) => {
    fetch('/public/data/tabbarList.json')
    .then((res) => {
      return res.json()
    }).then((list) => {
      renderHotRank(json, list);
    })
  }).catch(e => {
    console.log("error!");
    console.log(e);
  });

fetch('/public/data/购物.json')
  .then((response) => {
    return response.json();
  }).then((json) => {
    renderWebList(json);
  }).catch(e => {
    console.log("error!");
    console.log(e);
  });

fetch('/public/data/my.json')
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
  //挂载收藏的网页图标
  myList.innerHTML = ""
  for(var i = 0; i < json.length; i++){
    myList.innerHTML += 
    `<div class="my-item" title="${json[i].title}">
      <a href="${json[i].url}"></a>
      <div class="my-delete-icon hidden">X</div>
      <div class="my-icon">
        <img draggable="false" alt="" src="${json[i].url}/favicon.ico">
      </div>
      <div class="my-title"><span>${json[i].title}</span></div>
    </div>`
  }
  //挂载添加图标
  myList.innerHTML += 
  `<a class="my-item" id="my-add" href="#">
    <div class="my-icon">
      <img draggable="false" alt="" src="/public/img/icon/add.svg">
    </div>
    <div class="my-title"><span>添加网站</span></div>
  </a>`
  var myAdd = myList.querySelector("#my-add");
  myAdd.addEventListener("click", () => {
    myAddContainer.classList.remove("hidden")
  })

  //删除按钮添加事件
  var myItems = myList.querySelectorAll(".my-item")
  for(var i = 0; i < myItems.length-1; i++) {
    myItems[i].querySelector(".my-delete-icon").addEventListener('click', function() {
      this.parentNode.style.display = "none"
    })
    myItems[i].addEventListener('mouseover', function() {
      this.querySelector(".my-delete-icon").classList.remove("hidden")
    })
    myItems[i].addEventListener('mouseleave', function() {
      this.querySelector(".my-delete-icon").classList.add("hidden")
    })
  }
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
function renderHotRank(json, tabbarList) {
  var hotRank = document.querySelector(".hot-rank")
  var i;
  for(i = 0; i < 8; i++){
    hotRank.innerHTML += `<li class="hot-item"><a href=${json[i].url}><span class="hot-item-index">${json[i].id}</span><span class="hot-item-content">${json[i].title}</span></a></li>`
  }
  
  var tabbar = document.querySelector("#tabbar-wrapper")

  var arr = new Array()
  for(var i = 0; i < 14; i++){
    var index = Math.floor(Math.random()*tabbarList.length)
    arr.push({"title": tabbarList[index].label,"type": tabbarList[index].type, "num": tabbarList[index].num})
    tabbarList.splice(index, 1)
  }

  for(i = 0; i < arr.length; i++) {
    tabbar.innerHTML += `<a href="/pages/search.html?type=${arr[i].type}&num=${arr[i].num}"><div class="tab-item">${arr[i].title}</div></a>`
  }
  // var tabItems = document.querySelectorAll(".tab-item")
  // for(var item of tabItems) {
  //   item.addEventListener('click', function(){
  //     $.ajax({
  //       url: "/pages/search.html",
  //       method: "GET",
        
  //     })
  //   })
  // }
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
