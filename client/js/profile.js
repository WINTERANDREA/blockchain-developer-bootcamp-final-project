import { abi, address, networks } from "./data.js";

const initializeWeb3 = (ethProvider) => {
  let web3 = new Web3(ethProvider);
  return web3;
};

var web3instance = initializeWeb3(window.ethereum);
var contract = new web3instance.eth.Contract(abi, address);

// const listToken = contract
//   .getPastEvents("Transfer", {
//     filter: {
//       _from: "0x0000000000000000000000000000000000000000",
//     },
//     fromBlock: 0,
//   })
//   .then((events) => {
//     console.log(events);
//     for (let event of events) {
//       console.log(event.returnValues.tokenId);
//     }
//   });

// Per https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md, there's an optional "enumeration extension". If this is implemented for the token you're interested in, then you can just call balanceOf to get the number of tokens owned by the account, followed by tokenOfOwnerByIndex in a loop to get each owned token ID.

// Discover all of a user's owned tokens
const getBalanceOf = async () => {
  const balance = await contract.methods.balanceOf(ethereum.selectedAddress).call();
  console.log("balance", balance);
  return balance;
};

const tokenOfOwnerByIndex = async () => {
  let balance = await getBalanceOf();
  let wineOwned = [];
  for (let i = 0; i < balance; i++) {
    let wineId = await contract.methods.tokenOfOwnerByIndex(ethereum.selectedAddress, i).call();
    wineOwned.push(parseInt(wineId));
  }

  return wineOwned.sort((a, b) => {
    return a - b;
  });
};

const getWineMeta = async () => {
  let wineOwnedIds = await tokenOfOwnerByIndex();
  let wineOwnedMeta = [];
  for (let i of wineOwnedIds) {
    let wineMeta = await contract.methods.wineMeta(i).call();
    wineOwnedMeta.push(wineMeta);
  }
  return wineOwnedMeta.sort((a, b) => {
    return a[0] - b[0];
  });
};

const renderWineOwned = async (wineOwnedMeta) => {
  for (let i of wineOwnedMeta) {
    const wineNFT = `
  <div class="wineCard" id="${i.id}" style="width:200px; text-align:center; margin: 20px" >
    <div class="imageContainer">
      <img src="${i.uri}.png" width="100%" alt="name">
    </div>
    <div class="textContainer">
      <h4>${i.name}</h4>
      <h4 class='${i.onSale == true ? "saleText " : "notsaleText "}'>${i.onSale ? "On Sale" : "Locked"}</h4>
      <input class="form-input" type="text" disabled value=${ethereum.selectedAddress}></input>
      <button data-price="${i.price}" data-id="${i.id}" id="btn${i.id}" style="width: 100%"><h2 class="eth-icon" style="display: inline">${Web3.utils.fromWei(i.price, "ether")}</button>

      <button class='${i.onSale == true ? "sale " : "notsale "}btnonsale ' data-onsale="${i.onSale}" data-id="${i.id}" style="width: 100%; margin-top: 5px"><h2 style="display: inline">${i.onSale ? "Lock" : "Sell"}</h2></button>

      <button style="width: 100%; margin-top: 5px" disabled><h4 style="display: inline" >REDEEM</h4></button>
    </div> 
  </div>
  `;

    // Append newyly created card element to the container
    document.getElementById("mylistwine").innerHTML += wineNFT;
  }
};

//getWineMeta().then((data) => renderWineOwned(data).then(() => setOnSale()));

const setOnSale = async () => {
  var btnonsale = document.getElementsByClassName("btnonsale");
  const symbol = await contract.methods.symbol().call();
  console.log(symbol, btnonsale);
  for (let i of btnonsale) {
    let onsalestring = i.dataset.onsale;
    let onsale = onsalestring === "true";
    console.log(onsale, typeof onsale);

    i.addEventListener("click", async (e) => {
      let wineId = parseInt(e.currentTarget.dataset.id);
      let saleState = e.currentTarget.dataset.onsale;
      let onsale = saleState === "true";
      try {
        if (onsale === true) {
          let setOnSale = await contract.methods.setWineonSale(wineId, !onsale).send({ from: ethereum.selectedAddress });
          console.log(setOnSale);
          window.location.reload();
          return;
        }
        if (onsale === false) {
          let setOnSale = await contract.methods.setWineonSale(wineId, !onsale).send({ from: ethereum.selectedAddress });
          console.log(setOnSale);
          window.location.reload();
          return;
        }
        return;
      } catch (e) {
        console.log(e);
      }
    });
  }
};

const funzioneFinale = async () => {
  let wineMeta = await getWineMeta();
  let wineOwned = await renderWineOwned(wineMeta);
  await setOnSale(wineOwned);
};

funzioneFinale();
