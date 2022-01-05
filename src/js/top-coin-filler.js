import { coins_map } from "./coins_map";
import { apiData } from "./module/_apiFetch";
import { user } from "./module/_user";
import { Redirector } from "./module/_redirect";

function FocusReturner(){
  const tab_btn= document.querySelectorAll(".tab_btn");
  tab_btn.forEach((d,i)=>{
    if(d.classList.contains('focus-card')){
      if(i===0){
        document.querySelector(".news-cont").classList.add("none");
        document.querySelector('.fav-coins-cont').classList.add("none");
        document.querySelector(".top-coins-cont").classList.remove("none");
      }
      if(i===1){
        document.querySelector(".news-cont").classList.remove("none");
        document.querySelector('.fav-coins-cont').classList.add("none");
        document.querySelector(".top-coins-cont").classList.add("none");
      }
      if(i===2){
        document.querySelector(".news-cont").classList.add("none");
        document.querySelector('.fav-coins-cont').classList.remove("none");
        document.querySelector(".top-coins-cont").classList.add("none");
      }
    }
  })
}

export async function coinFiller() {
  let jsonData = await apiData.getTopcoinData();
  document.querySelector(".top-coins-cont").innerHTML = "";
  FocusReturner();
  jsonData = await jsonData["data"];
  coinsRenderer(jsonData);
  document.querySelector("nav").classList.remove("none");
  document.querySelector(".preloader").classList.add("none");
}

function coinsRenderer(jsonData){
  if(user.getloginStatus()){
    document.querySelector(".fav-coins-cont").innerHTML="";
  }
  jsonData.forEach((data) => {
    let percent =
      +data["metrics"]["market_data"]["percent_change_usd_last_24_hours"];
    let price = +data["metrics"]["market_data"]["price_usd"];
    percent = percent.toFixed(2);
    price = price.toFixed(2);
    let upperSlug =
      data["slug"].charAt(0).toUpperCase() + data["slug"].slice(1);
    let topCoin = document.createElement("div");
    let favCoin = document.createElement("div");
    favCoin.classList.add("top-coin");
    topCoin.classList.add("top-coin");
    topCoin.innerHTML += `
            <div class="coin-rank">
                ${data["metrics"]["marketcap"]["rank"]}
            </div>
            <div class="coin-logo-cont">
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${
                  coins_map[upperSlug] || coins_map[data["symbol"]]
                }.png" alt="">
            </div>
            <div class="coin-name" data-coin="${data['symbol']||data["slug"]}">
                ${data["slug"].charAt(0).toUpperCase() + data["slug"].slice(1)}
            </div>
            ${
              percent < 0
                ? `<div class="coin-price red-txt">
                                ${price}    
                            </div>
                            <div class="coin-price-change red-txt">
                                ${percent}
                            </div>`
                : `<div class="coin-price green-txt">
                                ${price}
                            </div>
                            <div class="coin-price-change green-txt">
                                ${percent}
                            </div>`
            }
            ${
              user.getCoins().includes(data["symbol"])
                ? `<div class="fav-linker">
                    <img class="star" data-coin="${data["symbol"]}" src="../assets/star.svg" alt="">
                </div>`
                : `<div class="fav-linker">
                    <img class="unstar" data-coin="${data["symbol"]}" src="../assets/unstar.svg" alt="">
                </div>`
            }`;
    favCoin.innerHTML=topCoin.innerHTML;
    document.querySelector(".top-coins-cont").appendChild(topCoin);
    if(user.getCoins().includes(data["symbol"])){
      document.querySelector(".fav-coins-cont").appendChild(favCoin);
    }
    topCoin
      .querySelector(".fav-linker img")
      .addEventListener("click", (e)=>{
        favClicker(e,favCoin);
      });
    favCoin
      .querySelector(".fav-linker img")
      .addEventListener("click", (e)=>{
        favlistClicker(e,topCoin,favCoin);
      });
    topCoin.querySelector(".coin-name").addEventListener("click",(e)=>{
      Redirector(e.target.dataset.coin);
    });
    favCoin.querySelector(".coin-name").addEventListener("click",(e)=>{
      Redirector(e.target.dataset.coin);
    })
  });
}

function favClicker(e,topCoin) {
  console.log("clicking");
  if (!user.getloginStatus()) return;

  if (e.target.classList.contains("unstar")) {
    e.target.classList.remove("unstar");
    e.target.classList.add("star");
    e.target.src = "../assets/star.svg";
    user.pushCoin(e.target.dataset.coin);
    topCoin.querySelector(".fav-linker img").src="../assets/star.svg";
    console.log(document.querySelector(".fav-coins-cont"),topCoin);
    document.querySelector(".fav-coins-cont").appendChild(topCoin);
  } else {
    e.target.classList.add("unstar");
    e.target.classList.remove("star");
    e.target.src = "../assets/unstar.svg";
    user.removeCoin(e.target.dataset.coin);
    document.querySelector(".fav-coins-cont").removeChild(topCoin);
  }
}

function favlistClicker(e,topCoin,favCoin){
  document.querySelector(".fav-coins-cont").removeChild(favCoin);
  topCoin.querySelector(".fav-linker img").src="../assets/unstar.svg";
  topCoin.querySelector(".fav-linker img").className="unstar";
  user.removeCoin(e.target.dataset.coin);
}

document.querySelector(".search-bar input").addEventListener("keypress",(e)=>{
  if(e.key==="Enter"){
    Redirector(e.target.value);
  }
})