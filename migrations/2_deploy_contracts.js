var IdToken = artifacts.require("IdToken");
var IdManager = artifacts.require("IdManager");

module.exports = function(deployer) {
  deployer.deploy(IdManager).then(function() {
    return deployer.deploy(IdToken, 'IdToken', 'IDT', 18, IdManager.address);
  });
};
