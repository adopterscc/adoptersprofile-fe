pragma solidity ^0.4.13;

/*
** Adopters Profile Contract
** @author: Parag Arora
** TODO:handle overflow
*/

import './Strings.sol';
import "./Ownable.sol";

contract AdoptersProfile is Ownable {
  using strings for *;

  event onProfileUpdated(address adopter);

  struct Profile {
    string fullName;
    uint dateOfBirth;
    bytes32 github;
    bytes32 twitter;
    bytes32 linkedIn;
    bytes32 slackId;
    uint8[] languages;
  }
  mapping( address => Profile ) profiles;

  function updateProfile(string fullName, uint dateOfBirth, bytes32 github, bytes32 twitter, bytes32 linkedIn, bytes32 slackId, uint8[] languages) {
    // fullName is mandatory field for Adopters
    require(bytes(fullName).length > 0);
    Profile memory profile;
    profile.fullName = fullName;
    profile.dateOfBirth = dateOfBirth;
    profile.github = github;
    profile.twitter = twitter;
    profile.linkedIn = linkedIn;
    profile.slackId = slackId;
    profile.languages = languages;
    profiles[msg.sender] = profile;
    onProfileUpdated(msg.sender);
  }

  function getProfile(address adopterAddress) constant returns(string,uint,bytes32,bytes32,bytes32,bytes32,uint8[]) {
    return(profiles[adopterAddress].fullName, profiles[adopterAddress].dateOfBirth, profiles[adopterAddress].github, profiles[adopterAddress].twitter, profiles[adopterAddress].linkedIn, profiles[adopterAddress].slackId, profiles[adopterAddress].languages);
  }

  function numberOfUsers() constant returns(uint) {
    return 0;
  }

}
