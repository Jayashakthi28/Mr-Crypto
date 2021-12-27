import { coins_map } from "./coins_map";
import { topCoinsDetails } from "./home-page-coins-update";

(async function coinFiller(){
    let jsonData=await topCoinsDetails();
    jsonData=await jsonData['data'];
    let template='';
    await jsonData.forEach(data => { 
        let percent=+data["metrics"]["market_data"]['percent_change_usd_last_24_hours'];
        let price=+data["metrics"]["market_data"]["price_usd"];
        percent=percent.toFixed(2);
        price=price.toFixed(2);
        console.log(percent,price);
        template+=`
        <div class="top-coin">
            <div class="coin-rank">
                ${data['metrics']["marketcap"]["rank"]}
            </div>
            <div class="coin-logo-cont">
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${coins_map[data["symbol"]]}.png" alt="">
            </div>
            <div class="coin-name">
                ${data['slug'].charAt(0).toUpperCase()+data['slug'].slice(1)}
            </div>
            ${
                (percent<0)?`<div class="coin-price red-txt">
                                ${price}    
                            </div>
                            <div class="coin-price-change red-txt">
                                ${percent}
                            </div>`
                            :
                            `<div class="coin-price green-txt">
                                ${price}
                            </div>
                            <div class="coin-price-change green-txt">
                                ${percent}
                            </div>`
            }
            <div class="fav-linker">
                <img src="../assets/star.svg" alt="">
            </div>
        </div>
        `
    });
    document.querySelector(".top-coins-cont").innerHTML=await template;
})();
