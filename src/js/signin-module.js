import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, login, logout } from "./module/_login";
import {user} from "./module/_user";


document.querySelector('.user-icon').addEventListener("click",async ()=>{
    console.log(user.getloginStatus());
    if(!user.getloginStatus()){
        const data=await login();
        console.log(user.getUid(),user.getloginStatus(),user.getCoins());        
    }
    else{
        logout();
    }
})

onAuthStateChanged(auth,(firebaseuser)=>{
    if(firebaseuser){
        user.setInitial(firebaseuser.uid,firebaseuser.displayName,[],true);
    }
    else{
        user.removeInitial();
    }
})