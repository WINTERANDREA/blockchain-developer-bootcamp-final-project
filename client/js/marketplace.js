import { abi, address, networks } from "./data.js";

const initializeWeb3 = (ethProvider) => {
  let web3 = new Web3(ethProvider);
  return web3;
};

var web3instance = initializeWeb3(window.ethereum);
var contract = new web3instance.eth.Contract(abi, address);

// const weiValue = Web3.utils.toWei('1', 'ether');
// console.log(weiValue);
// // => 1000000000000000000

// const etherValue = Web3.utils.fromWei('1000000000000000000', 'ether');
// console.log(etherValue);
// // => 1

const setWines = async () => {
  const allWines = await contract.methods.getWineAllOnSale().call();
  console.log(allWines);
  for (let i of allWines) {
    console.log(i.price);
    console.log(Web3.utils.fromWei(i.price, "ether"));
    if (i.onSale === false) {
      return;
    }
    try {
      let owner = await getWineOwner(i.id);
      const wineNFT = `
        <div class="wineCard" id="${i.id}" style="width:200px; text-align:center" >
          <div class="imageContainer">
            <img src="${i.uri}.png" width="100%" alt="${i.name}">
          </div>
          <div class="textContainer">
            <h4>${i.name}</h4>
            <input class="form-input" type="text" disabled value=${owner}></input>
            <button data-price="${i.price}" data-id="${i.id}" class="buyBtns"  id="btn${i.id}" style="width: 100%; margin-top: 5px"><h2 class="eth-icon" style="display: inline">${Web3.utils.fromWei(i.price, "ether")}</h2></button>
          </div>
        </div>
      `;
      // Append newyly created card element to the container
      document.getElementById("listwine").innerHTML += wineNFT;
    } catch (e) {
      console.log(e);
    }
  }
};

const setBtns = () => {
  var buyBtns = document.getElementsByClassName("buyBtns");
  for (let i of buyBtns) {
    i.addEventListener("click", (e) => {
      console.log(e.currentTarget.dataset.id);
      let id = parseInt(e.currentTarget.dataset.id);
      let price = parseInt(e.currentTarget.dataset.price);
      purchaseWineF(id, price);
    });
  }
};

async function purchaseWineF(id, price) {
  let wineOwner = await contract.methods.ownerOf(id).call();
  console.log(wineOwner);
  console.log(ethereum.selectedAddress);

  if (wineOwner.toLowerCase() == ethereum.selectedAddress.toLowerCase()) {
    alert("Lucky! You are already the owner of this NFT Luxury Wine");
    return;
  }
  var wineBought = await contract.methods.purchaseWine(id).send({ from: ethereum.selectedAddress, value: price });
  var receipt = wineBought.events;
  console.log(receipt);
  const priceString = price.toString();
  alert(`You have succefully purchase the NFT Luxury Wine for ${Web3.utils.fromWei(priceString, "ether")} ETH `);
  window.location.reload();
}

async function getWineOwner(wineId) {
  const owner = await contract.methods.ownerOf(wineId).call();
  return owner;
}

setWines().then(() => setBtns());
