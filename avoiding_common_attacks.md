# AVOIDING COMMON ATTACKS

## From Solidity Pitfalls and Attacks

### SWC-103 Floating Pragma
NFTLuxWine contract use specific compiler Pragma 8.0.0 to ensure that contracts do not accidentally get deployed using, for example, an outdated compiler version that might introduce bugs that affect the contract system negatively.

### SWC-131 Presence of unused variables
NFTLuxWine contract dont' have any unused variables and, also if them are allowed in Solidity and do not pose a direct security issue it is best practice though to avoid them. 

### SWC-107 Reentrancy
NFTLuxWine contract inherit from openZeppelin's ReentrancyGuard the nonReentrant modifier which is applied to the purchaseWine() function to make sure there are no nested (reentrant) calls to it.

### Pull Over Push 
Prioritize receiving contract calls over making contract calls,
