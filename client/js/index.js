//ABI
import { abi, address, networks } from "./data.js";

//HTML Elements
const metamaskDetected = document.querySelector("#metamaskDetected");
const connectMetamaskButtonContainer = document.querySelector("#connectMetamaskButtonContainer");
const connectMetamaskButton = document.querySelector("#connectMetamaskButton");
const pendingApproval = document.querySelector("#pendingApproval");
const metamaskIcon = document.querySelector("#metamaskIcon");
//const inputNumber = document.querySelector("#inputNumber");
//const submitInputNumber = document.querySelector("#submitInputNumber");
const mintWine = document.querySelector("#mintWine");

//Variables
const metamaskExtensionLink = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

//Functions
const browserDetection = () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    return true;
  }
  return false;
};

const initializeWeb3 = (ethProvider) => {
  let web3 = new Web3(ethProvider);
  return web3;
};

const connectMetamask = async () => {
  connectMetamaskButton.disabled = true;
  pendingApproval.innerText = "Pending approval";
  try {
    let account = await ethereum.request({ method: "eth_requestAccounts" });
    if (window.ethereum.chainId !== "0x3") {
      alert("Please switch to the Ropsten network");
    }
    pendingApproval.innerText = `Connected account: ${account[0]}`;
  } catch (e) {
    console.log(e);
    // if error alert and refresh page?
    alert("Ops");
    window.location.reload();
    // connectMetamaskButton.disabled = false
    // pendingApproval.innerText = ""
  }
};

const connectionSuccessful = () => {
  connectMetamaskButton.disabled = true;
  pendingApproval.innerText = `Connected account: ${window.ethereum.selectedAddress}`;
  metamaskIcon.classList.add("hide");
};

// const triggerNetworkChange = async (chainId) => {
//   try {
//     await ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chainId }] });
//   } catch (e) {
//     console.log(e);
//   }
// };

const networkChanged = () => {
  alert(`Network switched to ${networks[ethereum.chainId]}\n`);
  console.log(networks[ethereum.chainId]);
  if (networks[ethereum.chainId] === "Ropsten Test Network") {
    window.location.reload();
    console.log("yes");
  } else {
    console.log("Else");
  }
  //Aggiungere condizionali
};

const ifMetamask = () => {
  metamaskDetected.innerText = "Metamask detected";
  connectMetamaskButtonContainer.classList.remove("hide");
};

const ifNotMetamask = () => {
  metamaskDetected.innerHTML = `<a href=${metamaskExtensionLink}>Please install Metamask</a>`;
};

//Logic
if (browserDetection() === true) {
  window.ethereum.on("chainChanged", networkChanged);

  if (window.ethereum.selectedAddress !== null) {
    connectionSuccessful();
  }

  var web3instance = initializeWeb3(window.ethereum);
  var contract = new web3instance.eth.Contract(abi, address);

  ifMetamask();
} else {
  ifNotMetamask();
}

//Listeners
connectMetamaskButton.onclick = () => {
  connectMetamask();
};
