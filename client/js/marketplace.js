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
            <h2>${i.name}</h2>

            <div class="price-label">
              <img width="15px; margin-top:3px" src="./img/ethereum-1.svg" alt="ethereum-icon">
              <span>${Web3.utils.fromWei(i.price, "ether")}</span>
            </div>

            <input style="width:90%" class="form-input" type="text" disabled value=${owner}></input>

            <button class="btnbuy btn" data-price="${i.price}" data-id="${i.id}" class="buyBtns"  id="btn${i.id}"><h2 >BUY</h2></button>
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
  var buyBtns = document.getElementsByClassName("btnbuy");
  for (let i of buyBtns) {
    i.addEventListener("click", (e) => {
      console.log(e.currentTarget.dataset.id);
      let id = parseInt(e.currentTarget.dataset.id);
      let price = parseInt(e.currentTarget.dataset.price);
      purchaseWineF(id, price);
    });
  }
};

let loader = document.querySelector(".loader-container");
async function purchaseWineF(id, price) {
  let wineOwner = await contract.methods.ownerOf(id).call();
  console.log(wineOwner);
  console.log(ethereum.selectedAddress);

  if (wineOwner.toLowerCase() == ethereum.selectedAddress.toLowerCase()) {
    alert("Lucky! You are already the owner of this NFT Luxury Wine");
    return;
  }
  loader.classList.remove("hide");
  await contract.methods
    .purchaseWine(id)
    .send({ from: ethereum.selectedAddress, value: price })
    .catch(() => {
      loader.classList.add("hide");
    });
  const priceString = price.toString();
  alert(`You have succefully purchase the NFT Luxury Wine for ${Web3.utils.fromWei(priceString, "ether")} ETH `);
  loader.classList.add("hide");
  window.location.reload();
}

async function getWineOwner(wineId) {
  const owner = await contract.methods.ownerOf(wineId).call();
  return owner;
}

setWines().then(() => setBtns());
