import { getAuth, onAuthStateChanged } from "firebase/auth";
import { readDB } from "./module/_database";
import { auth, login, logout } from "./module/_login";
import { user } from "./module/_user";
import { newsFiller } from "./news";
import { coinFiller } from "./top-coin-filler";



document.querySelector(".user-icon").addEventListener("click", async () => {
  console.log(user.getloginStatus());
  if (!user.getloginStatus()) {
    const data = await login();
    console.log(user.getUid(), user.getloginStatus(), user.getCoins());
  } else {
    logout();
  }
});

onAuthStateChanged(auth, async (firebaseuser) => {
  if (firebaseuser) {
    console.log(firebaseuser.uid);
    await user.setInitial(firebaseuser.uid, firebaseuser.displayName, [], true);
    let favCoins = await readDB(`${firebaseuser.uid}`);
    favCoins = favCoins.val();
    console.log(favCoins);
    if (favCoins !== null) {
      favCoins = [...favCoins];
      console.log(favCoins);
      await user.setCoins(favCoins);
    }
    await coinFiller();
  } else {
    user.removeInitial();
    document.querySelector(".fav-coins-cont").innerHTML=`
    <div class="alert-msg">
    Please Sigin to Use this Feature
    </div>`;
    coinFiller();
  }
  newsFiller();
});
