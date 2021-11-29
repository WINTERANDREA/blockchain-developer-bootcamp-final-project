# blockchain-developer-bootcamp-final-project

## Project Preview Live on Ethereum Testnet(Ropsten)

## Project Name
NFT LUXURY WINE

## Project Scope
Create a Physically-Redeemable marketplace to trade Luxury Wine

## Description
 NFT Luxury Wine Marketplace is based on openZeppelin ERC721 contracts.
 The goal of the project is allow winery to mint wine associated to real bottle and sell it as physical-digital assets.
 1. Users can:
 - buy 
 - sell
 - set on sale / not on sale status
 - set new price

2. Winery (address contract owner) can also mint nft

 
 At the moment the minting process is not automated that means Winery needs to upload nft image on IPFS (ex. through pinata service) and mint manually one by one. In the future the entire process will be automated.
 Default uri for testing: https://gateway.pinata.cloud/ipfs/QmZUn1TJScL9m51fyqm1Pnx6HtCNTci2v3FvukuSSfshYM/


## Project Requirements
- Winery (contract owner) can mint nft.
- User can't mint nft.
- User can buy the nft.
- User can set onsale metadata.
- User can set price metadata.
- User can sell the nft that was bought.
- Transferring ETH to the previous token holder.
- Display all nft on sale in the marketplace page
- Display owned nft in the profile page
- Reedem the physical assets associated to the nft (will be implemented in the future)

## How to run this project locally:
### Prerequisites
- Node.js >= v14
- Truffle(Ganache)
- Npm
- git checkout Main

### Contracts
- Run npm install in the project root directory to install Truffle and smart contract dependencies (openZeppelin)
- Run ```truffle compile``` to compile locally the contract
- Run ```truffle develop``` and then the command ```migrate```
- Copy from the terminal the NFTLuxWine <b>contract address</b> and paste it to the address variable (line 1) of the following file:
  - client/js/data.js
- Run tests in Truffle console typing <b>test</b>
- Add/change in Metamask the development network rpc 9545 and id 1337
### Frontend directory
- cd client
- Open index.html with live server -> http://localhost:5500 

## Create NFT to locally deployed contract
- In the terminal run: ``` truffle develop ```
- Initialize contract: ``` let contract = await NFTLuxWine.deployed ```
- Mint the first nft: ``` contract.mintWine("https://gateway.pinata.cloud/ipfs/QmZUn1TJScL9m51fyqm1Pnx6HtCNTci2v3FvukuSSfshYM/1", "Barolo_XEdition1999", web3.utils.toWei("1"), true)```
- Mint another nft: ``` contract.mintWine("https://gateway.pinata.cloud/ipfs/QmZUn1TJScL9m51fyqm1Pnx6HtCNTci2v3FvukuSSfshYM/2", "Barolo_XEdition1992", web3.utils.toWei("4"), true)```
- Import local address to metamask using the private key or send Eth directly to it writing this function to the console:
  - web3.eth.sendTransaction({ from: "<your local address>", to: "<your local network wallet>", value: web3.utils.toWei("10") })
- Open local UI with live server at http://localhost:5500
- Make sure your Metamask localhost network is in port 9545 and chain id is 1337
- If you get TXRejectedError when sending a transaction, reset your Metamask account from Advanced settings.
- Buy and sell nft directly from the UI in the marketplace page using another address account
- Set the on sale status and price of yours nft in the profile page

## The following functionalities were tested:

1. CONTRACT
   1. Should have an owner
   2. Is owned by the winery

2. MINT
   1. Should be minted only by the Winery

3. PURCHASE
   1. Should be purchased only by other account
   2. Should be not purchased by the owner
   3. Price should be equal to the price offers


## PERSONAL ETHEREUM ACCOUNT FOR CONSENSYS NFT CERTIFICATION
0x404c74f4D7DdF401B728E146D6af010877bca04f


## FUTURE IMPROVEMENT

 In the next future will be integrated the REDEEM functionality where the bottle's owner can ask the winery to ship the physical bottle to a specific physical address (after authentication).