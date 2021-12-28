function apiFetch() {
  let TopapiData = null;
  let NewsData=null;
  let i=0;
  const setTopData = (data) => (TopapiData = data);
  const getTopcoinData = async () => {
    if (TopapiData === null) {
      let data = await TopCoinfetcher();
      setTopData(data);
    }
    return TopapiData;
  };
  const setNewsData = (data) => (NewsData = data);
  const getNewsData = async () => {
    if (NewsData === null) {
      let data = await NewsFetcher(i++);
      setNewsData(data);
    }
    return TopapiData;
  };
  return { getTopcoinData,getNewsData};
}

async function TopCoinfetcher() {
  let url = `https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd,metrics/marketcap/rank,metrics/market_data/percent_change_usd_last_24_hours&limit=100`;
  let data = await fetch(url);
  data = await data.json();
  return data;
}

async function NewsFetcher(i){
    let url=`https://data.messari.io/api/v1/news?page=${i}`
    let data = await fetch(url);
    data = await data.json();
    return data;
}

export const apiData = apiFetch();
