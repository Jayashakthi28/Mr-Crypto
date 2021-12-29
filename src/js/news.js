import { apiData } from "./module/_apiFetch";

const loadMore=document.createElement("div");
const news_cont=document.querySelector(".news-cont");
loadMore.classList.add("load-more");
loadMore.innerHTML="Load More";

export async function newsFiller(){
    let newsData=await apiData.getNewsData();
    newsData=await newsData["data"];
    const brRegex=/\\n/g;
    const lesRegex=/\\u003c/g;
    const greRegex=/\\u003e/g;
    newsData.forEach(data=>{
        if(typeof(data["content"])==='string'){
            data["content"]=data["content"].replace(greRegex,">");
            data["content"]=data["content"].replace(lesRegex,"<");
            data["content"]=data["content"].split("\n");
            data["content"]=data["content"].filter(w=>w!='');
        }
        const news_ele=document.createElement("div");
        news_ele.classList.add("news-data");
        news_ele.innerHTML+=`<h2 class="news-title"><a href="${data["url"]}" target="_blank">${data["title"]}</a></h2>
        <div class="news-content">
          <article>
            ${data["content"][0]}
          </article>
          <article>
            ${data["content"][1]}
        </article>   
        </div>`
        news_cont.appendChild(news_ele);
    });
    if([...news_cont.childNodes].includes(loadMore,0)){
        news_cont.removeChild(loadMore);
    }
    news_cont.appendChild(loadMore);
}

loadMore.addEventListener("click",async ()=>{
    await apiData.fetchNewsData();
    await newsFiller();
});