const PKI = artifacts.require("PKI");

module.exports = function (deployer) {
  deployer.deploy(PKI);
};
