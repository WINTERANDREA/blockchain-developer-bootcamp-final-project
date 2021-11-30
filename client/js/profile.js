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
      <img src="${i.uri}.png" width="100%" alt="${i.name}">
    </div>
    <div class="textContainer">
      <h2>${i.name}</h2>

      <div class="price-label">
        <img width="15px; margin-top:3px" src="./img/ethereum-1.svg" alt="ethereum-icon">
        <span>${Web3.utils.fromWei(i.price, "ether")}</span>
      </div>

      <h4 class='${i.onSale == true ? "saleText " : "notsaleText "}'>${i.onSale ? "On Sale" : "Locked"}</h4>
      
      <input style="width:90%" class="form-input" type="text" disabled value=${ethereum.selectedAddress}></input>

      <button class='${i.onSale == true ? "sale " : "notsale "}btnonsale btn' data-onsale="${i.onSale}" data-id="${i.id}" ><h2 >${i.onSale ? "Lock" : "Sell"}</h2></button>

      <button class="btnprice btn" data-price="${Web3.utils.fromWei(i.price, "ether")}" data-id="${i.id}" ><h2>Set Price</h2></button>

      <button class="btn btnredeem" disabled><h2 class="redeem">Redeem Wine</h2><div class="not-redeem">Not Available</div></button>
      
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
          alert(`The NFT Luxury Wine with id ${wineId} is now locked and not available on the marketplace!`);
          window.location.reload();
          return;
        }
        if (onsale === false) {
          let setOnSale = await contract.methods.setWineonSale(wineId, !onsale).send({ from: ethereum.selectedAddress });
          alert(`The NFT Luxury Wine with id ${wineId} is now listed on the marketplace!`);
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

btnNewPrice.addEventListener("click", async (e) => {
  let newPrice = document.getElementById("newPrice").value;
  let wineId = parseInt(e.target.dataset.wineid);
  console.log(newPrice);
  console.log(Web3.utils.toWei(newPrice, "ether"));
  let priceFormat = Web3.utils.toWei(newPrice, "ether");
  await contract.methods.setWinePrice(wineId, priceFormat).send({ from: ethereum.selectedAddress });
  alert(`Price successfully updated! The new price is ${newPrice} ETH`);
  window.location.reload();
});
