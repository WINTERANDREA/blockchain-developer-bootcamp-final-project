# blockchain-developer-bootcamp-final-project

## Project Preview Live on Ethereum Testnet(Ropsten)

## Project Name
NFT LUXURY WINE

## Project Scope
Create a Physically-Redeemable marketplace to trade Luxury Wine

## Description
 NFT Luxury Wine Marketplace is based on openZeppelin ERC721 contracts.
 The goal of the project is allow winery to mint wine associated to real bottle and sell it as physical-digital assets.
 Marketplace Users can:
 - buy 
 - sell
 - set on sale / not on sale status
 - set new price
 
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

## How to run this project locally:
### Prerequisites
- Node.js >= v14
- Truffle(Ganache)
- Npm
- git checkout Main

### Contracts
- Run npm install in project root to install Truffle and smart contract dependencies (openZeppelin)
- Run local testnet in port 9545 with an Ethereum client, e.g. Ganache
  - ```truffle compile```
- truffle migrate --network development
- truffle console --network development
- Run tests in Truffle console: test
development network id is 1337, remember to change it in Metamask as well!
## Frontend directory
./client

## ABI - Address settings
Deploy the smart contract and edit the file at: ./client/js/data.js

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
