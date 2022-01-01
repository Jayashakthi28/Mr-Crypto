import { coins_map } from "./coins_map";
import { apiData } from "./module/_apiFetch";

const url=new URLSearchParams(window.location.search);
const coin=url.get("coin");
console.log(coin);
function regexReplace(data){
    if(data===null) return "N/A";
    const brRegex=/\n/g;
    const lesRegex=/\u003c/g;
    const greRegex=/\u003e/g;
    data=data.replace(brRegex,"<br>")||" ";
    data=data.replace(greRegex,">")||" ";
    data=data.replace(lesRegex,"<")||" ";
    console.log(data);
    return data;
}

async function coinFiller(){
    let coinData=await apiData.fetCoinProfile(coin);
    if(!coinData["data"]){
      alert("Sorry no Coin Found/Api Error");
      location.href='./index.html';
    }
    coinData=await coinData["data"];
    let coinprice=await fetch(`https://data.messari.io/api/v1/assets/${coin}/metrics/market-data`);
    let main_card=document.createElement("div");
    let overview=document.createElement("div");
    let background=document.createElement('div');
    let technology=document.createElement("div");
    let token_det=document.createElement("div");
    let organisations=document.createElement("div");
    let resources=document.createElement("div");
    if(coinData["organizations"]){
        coinData["organizations"]=coinData["organizations"].map(d=>d["name"]);
    }
    else{
        coinData["organizations"]=["N/A"];
    }
    main_card.classList.add("main-card");
    overview.classList.add("wrapper");
    background.classList.add("wrapper");
    technology.classList.add("wrapper");
    token_det.classList.add("wrapper");
    organisations.classList.add("wrapper");
    resources.classList.add("wrapper");
    coinprice=await coinprice.json();
    coinprice=coinprice.data.market_data.price_usd;
    if(coinprice){
        coinprice=coinprice.toFixed(2);
    }
    else{
        coinprice="N/A"
    }
    console.log(coinData);
    main_card.innerHTML=`      <img
    src="https://s2.coinmarketcap.com/static/img/coins/128x128/${coins_map[coinData['name']]||coins_map[coinData['symbol']]}.png"
    alt=""
    />
    <div class="coin-det">
        <div class="coin-name">
        <h2>${coinData["name"]}</h2>
        <h3 class="coin-price">${coinprice}</h3>
        </div>
        <div class="coin-tag">${coinData["tagline"]||"CryptoCurrency"}</div>
    </div>`;
    overview.innerHTML=`<h2 class="heading">Overview</h2><div class="p-cont">${regexReplace(coinData["overview"])||"N/A"}</div>`;
    background.innerHTML=`<h2 class="heading">Background</h2><div class="p-cont">${regexReplace(coinData["background"])||"N/A"}</div>`;
    technology.innerHTML=`<h2 class="heading">Technology</h2><div class="p-cont">${regexReplace(coinData["technology"])||"N/A"}</div>`;
    token_det.innerHTML=`<h2 class="heading">Token Details</h2>
    <div class="li-cont">
      <ul>
        <li>
          <div>
            <div class="li-head">Usage</div>
            <div class="li-content">${coinData["token_details"]["usage"]||"N/A"}</div>
          </div>
        </li>
        <li>
          <div>
            <div class="li-head">Type</div>
            <div class="li-content">${coinData["token_details"]["usage"]||"N/A"}</div>
          </div>
        </li>
        <li>
          <div>
            <div class="li-head">Mining Algorithm</div>
            <div class="li-content">${coinData["token_details"]["mining_algorithm"]||"N/A"}</div>
          </div>
        </li>
        <li>
          <div>
            <div class="li-head">Max Supply</div>
            <div class="li-content">${coinData["token_details"]["max_supply"]||"N/A"}</div>
          </div>
        </li>
        <li>
          <div>
            <div class="li-head">Consensus Algorithm</div>
            <div class="li-content">${coinData["consensus_algorithm"]||"N/A"}</div>
          </div>
        </li>
      </ul>
    </div>`;
    let template=` <h2 class="heading">Organizations</h2> <div class="li-cont"> <ul>`;
    coinData["organizations"].forEach(d=>{
        template+=`<li>
        <div>
          <div class="li-content">${d}</div>
        </div>
      </li>`;
    });
    template+="</ul></div>";
    organisations.innerHTML+=template;
    template=`<h2 class="heading">Relevant Resources</h2> <ul>`;
    if(coinData["relevant_resources"]){
      coinData["relevant_resources"].forEach(d=>{
        template+=`<li>
        <div>
          <a class="li-content" href="${d["url"]}">${d["name"]}</a>
        </div>
      </li>`;
    });
    }
    else{
      template+=`<li>
        <div>
          <div class="li-content">N/A</div>
        </div>
      </li>
      `;
    }
    template+="</ul>";
    resources.innerHTML=template;

    document.querySelector("body").appendChild(main_card);
    document.querySelector("body").appendChild(overview);
    document.querySelector("body").appendChild(background);
    document.querySelector("body").appendChild(technology);
    document.querySelector("body").appendChild(token_det);
    document.querySelector("body").appendChild(organisations);
    document.querySelector("body").appendChild(resources);
}
coinFiller();