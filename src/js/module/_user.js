import { writeDB } from "./_database";

function User(uid = "", name = "", coins = [], isLogin = false) {
  const getUid = () => uid;
  const getCoins = () => coins;
  const getloginStatus = () => isLogin;
  const setUid = (userid) => (uid = userid);
  const setCoins = (coinArr) => (coins = coinArr);
  const setloginStatus = (status) => (isLogin = status);
  const setInitial = (user_id, user_name, coin) => {
    uid = user_id;
    name = user_name;
    if (coin !== undefined) {
      coins = coin;
    } else {
      coins = [];
    }
    isLogin = true;
  };
  const removeInitial = () => {
    uid = "";
    coins = [];
    isLogin = false;
  };
  function pushCoin(coin) {
    console.log(coins, coin);
    coins.push(coin);
    writeDB(`${uid}`, coins);
  }
  function removeCoin(coin) {
    let idx = coins.findIndex((d) => {
      return d === coin;
    });
    console.log(idx);
    coins.splice(idx, 1);
    writeDB(`${uid}`, coins);
  }

  return {
    getUid,
    getCoins,
    getloginStatus,
    setUid,
    setCoins,
    setloginStatus,
    setInitial,
    removeInitial,
    pushCoin,
    removeCoin,
  };
}

export const user = User();
