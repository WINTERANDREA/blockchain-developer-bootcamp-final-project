const Contract = artifacts.require("NFTLuxWine");

module.exports = function (deployer) {
  deployer.deploy(Contract, "https://gateway.pinata.cloud/ipfs/QmZUn1TJScL9m51fyqm1Pnx6HtCNTci2v3FvukuSSfshYM/");
};
