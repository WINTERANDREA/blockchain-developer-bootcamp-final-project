const Contract = artifacts.require("NFTLuxWine");

module.exports = function (deployer) {
  deployer.deploy(Contract);
};
