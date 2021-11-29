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
  var wineId = document.querySelector("#wineId").innerHTML;
  var uri = document.querySelector("#uri").value;
  var name = document.querySelector("#name").value;
  var price = document.querySelector("#price").value;
  var onsale = document.querySelector("#onsale");
  wineId = parseInt(wineId);
  let newWineId = wineId + 1;
  let newUri = uri + newWineId;
  let newName = name + "_" + newWineId;

  if (onsale.checked) {
    onsale.value = true;
  } else {
    onsale.value = false;
  }

  console.log(newUri);
  console.log(newName);
  console.log(Web3.utils.toWei(price, "ether"));
  var mintedWine = await contract.methods.mintWine(newUri, newName, Web3.utils.toWei(price, "ether"), onsale).send({ from: ethereum.selectedAddress });
  //console.log("tokenId", mintedWine.events.WineMetadata.returnValues);
  var tokenId = mintedWine.events.Transfer.returnValues.tokenId;
  console.log(tokenId);
  window.location.reload();
};

// balance.onclick = async () => {
//   const balanceOf = await contract.methods.balanceOf(ethereum.selectedAddress).call();
//   console.log(balanceOf);
//   alert(`The new balance of${ethereum.selectedAddress} is ${balanceOf}`);
// };

// symbol.onclick = async () => {
//   const symbol = await contract.methods.symbol().call();
//   console.log(symbol);
// };

// async function getURI(wineId) {
//   const uri = await contract.methods.tokenURI(wineId).call();
//   return uri;
// }

// wineuri.onclick = async () => {
//   var value = document.querySelector("#wineuri-value");
//   var wineId = document.querySelector("#wineId").value;
//   var uri = await getURI(wineId);
//   value.innerHTML = `This is the URI of token ${wineId}: ${uri}`;
//   //;
// };
