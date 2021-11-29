# blockchain-developer-bootcamp-final-project

## Project Name
NFT LUXURY WINE

## Project Scope
Create a Physically-Redeemable marketplace for wines

## Description
 Luxury Wine NFT Marketplace based on openZeppelin ERC721 contract.
 The goal of the project is allow winery to publish unique wine collection selling the bottle as a physical-digital asset.
 Marketplace users can buy the bottle, set on sale and price.
 The marketplace will have a key features that allow nft owner to redeem the bottle asking the winery to ship it(still figuring out which will be the best method to handle it within the smart contract/backend).

 At the moment the minting process is not automated that means Winery needs to upload nft image on IPFS (easily through pinata service) and mint manually one by one. In the future the entire process will be automated.

## Requirements
Winery (contract owner) can mint nft.
User can't mint nft.
User can buy the nft.
User can set onsale metadata.
User can set price metadata.
User can sell the nft that was bought.
Transferring ETH to the previous token holder.
Display all nft on sale in the marketplace page
Display owned nft in the profile page
Reedem the physical assets associated to nft (will be implemented in the future)

## ABI & CONTRACT ADDRESS SETTINGS
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



