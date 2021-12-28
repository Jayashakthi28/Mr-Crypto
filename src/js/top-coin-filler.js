import { coins_map } from "./coins_map";
import { apiData } from "./module/_apiFetch";
import { user } from "./module/_user";

export async function coinFiller() {
  let jsonData = await apiData.getTopcoinData();
  document.querySelector(".top-coins-cont").innerHTML = "";
  jsonData = await jsonData["data"];
  let template = "";
  await jsonData.forEach((data) => {
    let percent =
      +data["metrics"]["market_data"]["percent_change_usd_last_24_hours"];
    let price = +data["metrics"]["market_data"]["price_usd"];
    percent = percent.toFixed(2);
    price = price.toFixed(2);
    let topCoin = document.createElement("div");
    topCoin.classList.add("top-coin");
    topCoin.innerHTML += `
            <div class="coin-rank">
                ${data["metrics"]["marketcap"]["rank"]}
            </div>
            <div class="coin-logo-cont">
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${
                  coins_map[data["symbol"]]
                }.png" alt="">
            </div>
            <div class="coin-name">
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
            }
        `;
    document.querySelector(".top-coins-cont").appendChild(topCoin);
    topCoin
      .querySelector(".fav-linker img")
      .addEventListener("click", favClicker);
  });
  document.querySelector(".top-coins-cont").classList.remove("none");
}

function favClicker(e) {
  if (!user.getloginStatus()) return;

  if (e.target.classList.contains("unstar")) {
    e.target.classList.remove("unstar");
    e.target.classList.add("star");
    e.target.src = "../assets/star.svg";
    user.pushCoin(e.target.dataset.coin);
  } else {
    e.target.classList.add("unstar");
    e.target.classList.remove("star");
    e.target.src = "../assets/unstar.svg";
    user.removeCoin(e.target.dataset.coin);
  }
}
