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

async function topCoinsDetails(){
    let url=`https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd,metrics/marketcap/rank,metrics/market_data/percent_change_usd_last_24_hours&limit=100`;
    let data=await fetch(url);
    data=await data.json();
    return data;
}

majorCardpriceUpdate();
export{majorCardpriceUpdate,topCoinsDetails}