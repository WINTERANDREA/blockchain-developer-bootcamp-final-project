# Solidity architecture (function names and their inputs and outputs)

## This project is based on ERC721 Open Zeppelin smart contracts:
Counters.sol, Ownable.sol, ReentrancyGuard.sol, ERC721Enumerable.sol

## Custom Function
1. Winery will be able to mint their own nft
    ``` solidity
    function mintWine( string memory _uri, string memory _name, uint256 _price, bool _onSale) {
      // wine id
    }
    ```
	
2. User will be able to purchase the nft
   ``` solidity
   function purchaseWine(uint256 _wineId)  {
    // transfer wine from seller to msg.sender
    // transfer ETH from msg.sender to seller
   }
   ```

3. Nft will be listed in the marketplace page
   ``` solidity
   function getWineAllOnSale () {
    // wineOnSale array
   }
   ```
