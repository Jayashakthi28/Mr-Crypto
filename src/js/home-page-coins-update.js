import { apiData } from "./module/_apiFetch";
import { Redirector } from "./module/_redirect";
import { user } from "./module/_user";
import { newsFiller } from "./news";
import { coinFiller } from "./top-coin-filler";

async function majorCardpriceUpdate(){
    const coin_arr=["BTC","ETH","DOT"];
    const elements=document.querySelectorAll(".major-price");
    let coinData=await apiData.getTopcoinData();
    coinData=await coinData.data;
    coinData=coinData.filter(d=>{
        return coin_arr.includes(d['symbol']);
    }) 
    console.log(coinData);   
    for(let i=0;i<3;i++){
        let num=coinData[i].metrics.market_data.price_usd;
        num=num.toFixed(2);
        elements[i].textContent=num;
    }
}

function CoinCardClicker(){
    const elements=document.querySelectorAll(".major_coin_card");
    elements.forEach((d,i)=>{
        d.addEventListener("click",(e)=>{
            if(i===0) Redirector("BTC");
            if(i===1) Redirector("ETH");
            if(i===2) Redirector("DOT");
        })
    })
}

export function tabSwitcher(){
    const tab_btn= document.querySelectorAll(".tab_btn");
   tab_btn.forEach((data,index)=>{
        data.addEventListener("click",()=>{
            if(index===0){
                tab_btn[index].classList.add("focus-card");
                tab_btn[1].classList.remove("focus-card");
                tab_btn[2].classList.remove("focus-card");
                coinFiller();
            }
            if(index===1){
                tab_btn[index].classList.add("focus-card");
                tab_btn[0].classList.remove("focus-card");
                tab_btn[2].classList.remove("focus-card");
                document.querySelector(".top-coins-cont").classList.add("none");
                document.querySelector(".news-cont").classList.remove("none");
                document.querySelector(".fav-coins-cont").classList.add("none");
            }
            if(index===2){
                if(!user.getloginStatus()){
                    document.querySelector(".fav-coins-cont").innerHTML=`
                    <div class="alert-msg">
                    Please Sigin to Use this Feature
                    </div>`;
                }
                tab_btn[index].classList.add("focus-card");
                tab_btn[0].classList.remove("focus-card");
                tab_btn[1].classList.remove("focus-card");
                document.querySelector(".top-coins-cont").classList.add("none");
                document.querySelector(".news-cont").classList.add("none");
                document.querySelector(".fav-coins-cont").classList.remove("none");
            }

        });
    })
}

CoinCardClicker();
tabSwitcher();
majorCardpriceUpdate();
export{majorCardpriceUpdate}