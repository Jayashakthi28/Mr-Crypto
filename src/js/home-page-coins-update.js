import { newsFiller } from "./news";
import { coinFiller } from "./top-coin-filler";

async function majorCardpriceUpdate(){
    const coin_arr=["btc","eth","dot"];
    const elements=document.querySelectorAll(".major-price");
    for(let i=0;i<3;i++){
        let url=`https://data.messari.io/api/v1/assets/${coin_arr[i]}/metrics/market-data`;
        let data=await fetch(url,{
            headers: { "x-messari-api-key": "e86bac73-6740-4069-b806-6661cc65f979" }
        });
        data=await data.json();
        let num=await +data.data.market_data.price_usd;
        num=num.toFixed(2);
        elements[i].textContent=num;
    }
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
            }

        });
    })
}

tabSwitcher();
majorCardpriceUpdate();
export{majorCardpriceUpdate}