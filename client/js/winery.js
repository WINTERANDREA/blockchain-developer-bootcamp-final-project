import { abi, address, networks } from "./data.js";

const initializeWeb3 = (ethProvider) => {
  let web3 = new Web3(ethProvider);
  return web3;
};

var web3instance = initializeWeb3(window.ethereum);
var contract = new web3instance.eth.Contract(abi, address);

const totalsupply = async () => {
  let totalsupply = document.querySelector("#totalsupply");
  var h3 = document.createElement("h3");
  const totalSupply = await contract.methods.totalSupply().call();
  if (!totalSupply) {
    totalSupply == 0;
  }
  h3.innerHTML = `The Winery has already minted <h2 id="wineId" style="display:inline; color: purple"> ${totalSupply}</h2> NFT Luxury Wine`;
  totalsupply.appendChild(h3);
};

totalsupply();

// const weiValue = Web3.utils.toWei('1', 'ether');
// console.log(weiValue);
// // => 1000000000000000000

// const etherValue = Web3.utils.fromWei('1000000000000000000', 'ether');
// console.log(etherValue);
// // => 1

mintWine.onclick = async () => {
  let contractOwner = await contract.methods.getOwnerAddress().call();
  if (contractOwner.toLowerCase() != ethereum.selectedAddress.toLowerCase()) {
    alert("Sorry! Only the owner of the contract can mint NFT Luxury Wine");
    return;
  }

  var wineId = document.querySelector("#wineId").innerHTML;
  var uri = document.querySelector("#uri").value;
  var name = document.querySelector("#name").value;
  var price = document.querySelector("#price").value;
  var onsale = document.querySelector("#onsale");
  wineId = parseInt(wineId);
  let newWineId = wineId + 1;
  let newUri = uri + newWineId;
  let newName = name + "_" + newWineId;
  let newOnsale = new Boolean();
  if (onsale.checked) {
    newOnsale = true;
  } else {
    newOnsale = false;
  }
  console.log(newOnsale, typeof newOnsale);

  var mintedWine = await contract.methods.mintWine(newUri, newName, Web3.utils.toWei(price, "ether"), newOnsale).send({ from: ethereum.selectedAddress }, (err, res) => {
    if (err) {
      alert(err);
    }
  });
  var tokenId = mintedWine.events.Transfer.returnValues.tokenId;
  alert(`Succesfully minted NFT Luxury Wine with id ${tokenId}`);
  window.location.reload();
};
