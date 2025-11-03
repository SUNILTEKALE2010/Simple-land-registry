// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLandRegistry {
    struct Land {
        string landId;
        string ownerName;
        string ownerContact;
        address ownerAddress;
        bool isRegistered;
    }

    mapping(string => Land) private lands;
    address public admin;

    event LandRegistered(string indexed landId, string ownerName, address indexed owner);
    event OwnershipTransferred(string indexed landId, address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner(string memory _landId) {
        Land storage l = lands[_landId];
        require(l.isRegistered, "Land not registered");
        require(l.ownerAddress == msg.sender, "Caller is not the owner");
        _;
    }

    modifier validString(string memory s, string memory fieldName) {
        require(bytes(s).length > 0, string(abi.encodePacked(fieldName, " cannot be empty")));
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerLand(
        string memory _landId,
        string memory _ownerName,
        string memory _ownerContact
    )
        external
        validString(_landId, "Land ID")
        validString(_ownerName, "Owner name")
        validString(_ownerContact, "Owner contact")
    {
        Land storage existing = lands[_landId];
        require(!existing.isRegistered, "Land already registered");

        lands[_landId] = Land({
            landId: _landId,
            ownerName: _ownerName,
            ownerContact: _ownerContact,
            ownerAddress: msg.sender,
            isRegistered: true
        });

        emit LandRegistered(_landId, _ownerName, msg.sender);
    }

    function getLandDetails(
        string memory _landId
    )
        external
        view
        validString(_landId, "Land ID")
        returns (
            string memory landId,
            string memory ownerName,
            string memory ownerContact,
            address ownerAddress,
            bool isRegistered
        )
    {
        Land storage l = lands[_landId];
        require(l.isRegistered, "Land not registered");
        return (l.landId, l.ownerName, l.ownerContact, l.ownerAddress, l.isRegistered);
    }

    function transferLand(
        string memory _landId,
        address _newOwner,
        string memory _newOwnerName,
        string memory _newOwnerContact
    )
        external
        onlyOwner(_landId)
        validString(_newOwnerName, "New owner name")
        validString(_newOwnerContact, "New owner contact")
    {
        require(_newOwner != address(0), "Invalid new owner address");

        Land storage l = lands[_landId];
        address oldOwner = l.ownerAddress;

        l.ownerAddress = _newOwner;
        l.ownerName = _newOwnerName;
        l.ownerContact = _newOwnerContact;

        emit OwnershipTransferred(_landId, oldOwner, _newOwner);
    }

    function isLandRegistered(string memory _landId) external view returns (bool) {
        return lands[_landId].isRegistered;
    }
}
