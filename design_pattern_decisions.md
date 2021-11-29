# DESIGN PATTERN DECISION

## 1. Inheritance and Interfaces
- NFTLuxWine contract inherits the OpenZeppelin ERC721Enumerable interface in order to be compliant with the nft standard and use the built in functionality to retrieve tokenOfOwnerByIndex from web3 to display all nft associated to a specific account.
- NFTLuxWine contract inherits the OpenZeppelin Ownable contract to enable ownership to Winery to mint nft.


## 2. Access Control Design Patterns
- NFTLuxWine contract uses the Ownable design pattern in the mintWine() and setBaseURI() functions allowing only the owner to mint nft and set a new baseURI.