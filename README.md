# blockchain-developer-bootcamp-final-project

## Project Preview Live on Ethereum Testnet (Ropsten)
https://nft-luxury-wine.netlify.app/

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

In the next future will be integrated the REDEEM functionality where the bottle's owner can ask the winery to ship the physical bottle to a specific physical address (after authentication).

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

## Users workflow
1. Open DAPP
2. Login with Metamask
3. Discover wine available in the marketplace page
4. Buy wine nft
5. Edit on sale / not on sale status in the profile page
6. Edit price in the profile page
7. Redeem wine (not available)

## Winery workflow
1. Open DAPP
2. Login with Metamask
3. Mint wine nft and sell it in the marketplace page
4. Edit on sale / not on sale status
5. Edit price

## Run the project locally:
### Prerequisites
- Node.js >= v14
- Truffle(Ganache)
- Npm
- git checkout Main

### URI Configuration
- Set your uri (nft images). In Truffle, constructor params go in /migrations. Add your uri param in the following file
  - migrations/2_deploy_contracts.js:
   ```deployer.deploy(Contract, "https://gateway.pinata.cloud/ipfs/QmZUn1TJScL9m51fyqm1Pnx6HtCNTci2v3FvukuSSfshYM/");```
  - test/NFTLuxWine.test.js:
   ``` beforeEach(async () => {instance = await NFTLuxWine.new("https://gateway.pinata.cloud/ipfs/QmZUn1TJScL9m51fyqm1Pnx6HtCNTci2v3FvukuSSfshYM/")});``` 
### Contracts
- Run ```npm install``` in the project root directory to install Truffle and smart contract dependencies (openZeppelin)
- Run local testnet in port 9545 with an Ethereum client, e.g. Ganache
- Run ```truffle compile``` to compile locally the contract
- Run ```truffle develop``` and then the command ```migrate```
- Copy the <b>contract address</b> deployed on local network and paste it in the following file:
  - client/js/data.js
- Run tests in Truffle console: test
- Set the Metamsk development network rpc 9545 and id 1337
### Frontend directory
- cd client
- Open index.html with live server -> http://localhost:5500 

### Create NFT to locally deployed contract
- In the terminal run: ``` truffle develop ```
- Initialize contract: ``` let contract = await NFTLuxWine.deployed() ```
- Mint the first nft: ``` contract.mintWine("https://gateway.pinata.cloud/ipfs/Qmdb6nv6TWGUhGnjNZvjwvKQ3g41pFJqdCCkNJGp6ZPmw3/1", "Barolo_XEdition_1999", web3.utils.toWei("0.0001"), true)```
- Mint another nft: ``` contract.mintWine("https://gateway.pinata.cloud/ipfs/Qmdb6nv6TWGUhGnjNZvjwvKQ3g41pFJqdCCkNJGp6ZPmw3/2", "Barolo_XEdition_2000", web3.utils.toWei("0.0003"), true)```
- Import local address to metamask using the private key or send Eth directly to it writing this function to the console: ```web3.eth.sendTransaction({ from: "<your local address>", to: "<your local network wallet>", value: web3.utils.toWei("10") })```
- Open marketplace.html with live server -> http://localhost:5500 
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

## Screencast video
https://youtu.be/IXUa5VzsAyM

## Directory structure
- client: frontend using html, css and javascript
- contracts: smart contract directory
- migrations: migration files for deploying contracts in contracts directory
- test:  tests for smart contracts

## Environment variables (not needed for running project locally)
Create an .env file with the following variables if you want deploy the project to a testnet and verify the contract on etherscan
- MNEMONIC=
- INFURAROPSTEN=
- ETHERSCAN=

## Deploy on Testnet Ropsten
```truffle compile```
```truffle deploy --network ropsten --reset```

## Verify deployed contract on Etherscan (Ropsten) with Truffle plugin
``` truffle run verify NFTLuxWine --network ropsten ```

## FUTURE IMPROVEMENT
- Use api for nft price live conversion eth-usd
- Redeem functionality (User Auth) and shipment
- Burnable nft (burn the nft and trigger another contract which mint a new nft reedemed. The new nft is sent to the user who made the redeem)
- Upgradable contract
- Handle multiple Winery 
- Create an Erc20 token for the marketplace
- Analyze Erc 1155
  
## PERSONAL ETHEREUM ACCOUNT FOR CONSENSYS NFT CERTIFICATION
0x404c74f4D7DdF401B728E146D6af010877bca04f




 