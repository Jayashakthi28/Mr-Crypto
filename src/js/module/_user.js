function User(uid='',name='',coins=[],isLogin=false){
    const getUid=()=> uid;
    const getCoins=()=>coins;
    const getloginStatus=()=> isLogin;
    const setUid=(userid)=>uid=userid;
    const setCoins=(coinArr)=>coins.push(coinArr);
    const setloginStatus=(status)=> isLogin=status;
    const setInitial=()=>{
        uid=arguments[0];
        name=arguments[1];
        coins=arguments[2];
        isLogin=true;
    }
    const removeInitial=()=>{
        uid='';
        coins=[];
        isLogin=false;
    }
    return{getUid,getCoins,getloginStatus,setUid,setCoins,setloginStatus,setInitial,removeInitial}
}

export const user=User();