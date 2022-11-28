
const base_url = 'http://127.0.0.1:8088'


//收藏
function handleCollect(n, webId) {
  axios.put(base_url + '/weblist/' + webId, {
    type: "collect",
    num: n
  }).then(res => {
    this.querySelector(".info-text").innerHTML = res.data.num.collect
  }).catch(err => console.log(err))
}


//点击
function handleClick(webId) {
  axios.put(base_url + '/weblist/' + webId, {
    type: "click",
    num: 1
  }).then(res => {
    console.log(res.data.num);
  }).catch(err => console.log(err))
}

export const renderWebList = function(dataJson, webList) {
  webList.innerHTML = ''
  for(var i = 0; i < dataJson.length; i++){
    webList.innerHTML += `<div class="web-item" webId="${dataJson[i].id}">
      <a href="${dataJson[i].url}" class="web-item-title">${dataJson[i].title}</a>
      <div class="web-item-content">
        <img class="web-item-icon" src="${dataJson[i].url}/favicon.ico" alt="">
        <div class="">
          <div class="web-item-description">${dataJson[i].description}</div>
          <div class="aiticle-item-url">${dataJson[i].url}</div>
        </div>
        <div class="web-item-toolbar">
          <div class="collect">
            <svg t="1667059067723" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2575" width="20" height="20"><path d="M934.4 356.266667c-8.533333-10.666667-21.333333-19.2-34.133333-21.333334l-234.666667-34.133333-104.533333-213.333333c-6.4-8.533333-14.933333-17.066667-25.6-23.466667-12.8-6.4-27.733333-6.4-40.533334-2.133333-12.8 4.266667-23.466667 14.933333-29.866666 27.733333l-104.533334 213.333333-234.666666 34.133334c-10.666667 2.133333-21.333333 6.4-29.866667 14.933333-21.333333 21.333333-19.2 55.466667 0 74.666667l170.666667 166.4-40.533334 234.666666c-2.133333 10.666667 0 23.466667 6.4 34.133334 12.8 25.6 46.933333 36.266667 72.533334 21.333333l211.2-110.933333 211.2 110.933333c8.533333 4.266667 17.066667 6.4 25.6 6.4h8.533333c14.933333-2.133333 25.6-10.666667 34.133333-21.333333 8.533333-10.666667 10.666667-25.6 8.533334-40.533334l-40.533334-234.666666 170.666667-166.4c8.533333-8.533333 14.933333-19.2 14.933333-29.866667-2.133333-14.933333-6.4-27.733333-14.933333-40.533333z m-224 194.133333c-12.8 12.8-19.2 29.866667-14.933333 46.933333l38.4 217.6L512 699.733333l-221.866667 115.2L328.533333 597.333333c2.133333-17.066667-2.133333-34.133333-14.933333-46.933333l-157.866667-153.6 219.733334-32c17.066667-2.133333 32-12.8 40.533333-29.866667L512 136.533333l98.133333 198.4c8.533333 14.933333 23.466667 27.733333 40.533334 29.866667l219.733333 32-160 153.6z" p-id="2576"></path></svg>
            <svg t="1667059160850" class="icon hidden" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2721" width="20" height="20"><path fill="#80a492" d="M465.066667 89.6l-104.533334 213.333333-234.666666 34.133334c-10.666667 2.133333-21.333333 6.4-29.866667 14.933333l-2.133333 2.133333c-17.066667 21.333333-17.066667 53.333333 4.266666 72.533334l170.666667 166.4-40.533333 234.666666c-2.133333 10.666667 0 23.466667 6.4 34.133334l2.133333 2.133333c14.933333 23.466667 44.8 32 70.4 19.2l211.2-110.933333 211.2 110.933333c10.666667 6.4 21.333333 6.4 34.133333 6.4h4.266667c27.733333-6.4 44.8-32 40.533333-61.866667l-40.533333-234.666666 170.666667-166.4c8.533333-8.533333 12.8-19.2 14.933333-29.866667v-4.266667c2.133333-27.733333-17.066667-53.333333-44.8-57.6l-234.666667-34.133333-104.533333-213.333333c-14.933333-8.533333-23.466667-17.066667-34.133333-23.466667-25.6-12.8-57.6-2.133333-70.4 25.6z" p-id="2722"></path></svg>
            <span class="info-text">${dataJson[i].collect}</span>
          </div>
        </div>
      </div>
    </div>`
  }

  // 收藏
  var collectBtn = webList.querySelectorAll(".web-item-toolbar>div");

  for(i = 0; i < collectBtn.length; i++){
    collectBtn[i].i = 1;
    collectBtn[i].addEventListener("click", function(){
      var s = this.querySelectorAll("svg");
      // console.dir();
      var webId = this.parentNode.parentNode.parentNode.getAttribute('webId')
      
      if(this.i%2){     //选中
        s[0].classList.add("hidden");
        s[1].classList.remove("hidden");
        this.querySelector("span").classList.add("color-4")
        handleCollect.call(this, 1, webId)
      }else{
        s[0].classList.remove("hidden");
        s[1].classList.add("hidden");
        this.querySelector("span").classList.remove("color-4")
        handleCollect.call(this, -1, webId)
      }
      this.i++;
    })
  }

  //点击
  var collectItem = webList.querySelectorAll(".web-item>a")

  for(i = 0; i < collectBtn.length; i++){
    collectItem[i].addEventListener("click", function() {
      var webId = this.parentNode.getAttribute('webId')
      handleClick(webId)
    })
  }
}