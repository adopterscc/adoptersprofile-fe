var AdoptersProfile = artifacts.require("./AdoptersProfile.sol");

contract('AdoptersProfile', function(accounts) {
  var fullName1 = "Parag Arora";
  it("should add a new profile to AdoptersProfile contract", function() {
    return AdoptersProfile.deployed().then(function(instance){
      instance.updateProfile(fullName1, 521251200, "parag-arora", "paragarora", "paragarora", "parag", [0,1]);
      return instance.getProfile.call(accounts[0]);
    }).then(function(profile){
      assert.equal(profile[0], fullName1, "fullName was found different than what was set");
    });
  });
  var fullName2 = "Parag";
  it("should update profile to AdoptersProfile contract", function() {
    return AdoptersProfile.deployed().then(function(instance){
      instance.updateProfile(fullName2, 521251200, "parag-arora", "paragarora", "paragarora", "parag", [0,1]);
      return instance.getProfile.call(accounts[0]);
    }).then(function(profile){
      assert.equal(profile[0], fullName2, "fullName was found different than what was set");
    });
  });
});
