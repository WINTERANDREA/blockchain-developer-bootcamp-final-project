import { abi, address, networks } from "./data.js";

const initializeWeb3 = (ethProvider) => {
  let web3 = new Web3(ethProvider);
  return web3;
};

var web3instance = initializeWeb3(window.ethereum);
var contract = new web3instance.eth.Contract(abi, address);

// Discover all user's owned tokens
const getBalanceOf = async () => {
  const balance = await contract.methods.balanceOf(ethereum.selectedAddress).call();
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

      <button class="btnprice" data-price="${Web3.utils.fromWei(i.price, "ether")}" data-id="${i.id}" style="width: 100%; margin-top: 5px"><h2 style="display: inline">Set Price</h2></button>

      <button style="width: 100%; margin-top: 5px" disabled><h4 style="display: inline" >REDEEM</h4></button>
    </div> 
  </div>
  `;

    // Append newyly created card element to the container
    document.getElementById("mylistwine").innerHTML += wineNFT;
  }
};

const setOnSale = async () => {
  var btnonsale = document.getElementsByClassName("btnonsale");
  for (let i of btnonsale) {
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

const setPrice = async () => {
  var btnprice = document.getElementsByClassName("btnprice");
  for (let i of btnprice) {
    i.addEventListener("click", async (e) => {
      let wineId = parseInt(e.currentTarget.dataset.id);
      let winePrice = e.currentTarget.dataset.price;
      // Get the modal and <span> element that closes the modal
      let modal = document.getElementById("priceModal");
      let span = document.getElementsByClassName("close")[0];
      let currentPrice = document.getElementById("currentPrice");
      let btnNewPrice = document.getElementById("btnNewPrice");

      btnNewPrice.setAttribute("data-wineid", wineId);

      // When the user clicks the button, open the modal
      modal.style.display = "block";
      currentPrice.value = winePrice;
      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    });
  }
};

const displayWineHtml = async () => {
  let wineMeta = await getWineMeta();
  await renderWineOwned(wineMeta);
  await setOnSale();
  await setPrice();
};

displayWineHtml();
