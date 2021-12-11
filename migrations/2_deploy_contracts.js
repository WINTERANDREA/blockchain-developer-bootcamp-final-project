const Contract = artifacts.require("NFTLuxWine_Rinkeby");

module.exports = function (deployer) {
  deployer.deploy(Contract);
};
