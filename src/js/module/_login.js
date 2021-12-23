import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { user } from "./_user";

export const auth=getAuth()
const provider=new GoogleAuthProvider();

export function login(){
    signInWithPopup(auth, provider)
    .then((result) => {
        user.setloginStatus(true);
        user.setUid(result.user.uid);
        return result.user;
    }).catch((error) => {
        console.log(error);
    });
}

export function logout(){
    signOut(auth).then(()=>{}).catch(()=>{});
    user.setloginStatus(false);
    user.removeInitial();
}
