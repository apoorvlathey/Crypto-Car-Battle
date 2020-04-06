pragma solidity ^0.6.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract CarBattle is ERC721 {
    
    struct Car {
        uint index;
        uint level;
        uint speed;
    }
    
    struct Battle {
        uint index;
        address payable p1;
        uint p1CarId;
        uint scoreToBeat;     //Unit: 100*second
        uint amount;
        address payable p2;
        uint p2CarId;
        address winner;
        bool ended;
        uint createdAt;
    }
    
    Car[] public cars;
    Battle[] public battles;
    address public owner;
    
    constructor () ERC721("Car", "CAR") public {
        owner = msg.sender;
    }
    
    function mintCar() public {
        require(balanceOf(msg.sender) == 0);
        uint id = cars.length;
        cars.push(Car(id, 1, 9));
        _mint(msg.sender, id);
    }
    
    function createBattle (uint _p1CarId, uint _score) public payable {
        require(msg.value > 0);
        require(ownerOf(_p1CarId) == msg.sender);
        uint id = battles.length;
        battles.push(Battle(id, msg.sender, _p1CarId, _score, msg.value, address(0), 0, address(0), false, now));
    }
    
    function acceptBattle (uint _battleId, uint _p2CarId) public payable {
        // require(msg.sender != battles[_battleId].p1);
        require(battles[_battleId].amount == msg.value);
        require(ownerOf(_p2CarId) == msg.sender);
        
        Battle storage b = battles[_battleId];
        b.p2 = msg.sender;
        b.p2CarId = _p2CarId;
    }
    
    function endBattle (uint _battleId, uint _score) public {
        require(msg.sender == battles[_battleId].p2);
        Battle storage b = battles[_battleId];
        if(_score < b.scoreToBeat) {
            b.winner = b.p2;
            upgradeLevel(b.p2CarId);
            b.p2.transfer(b.amount * 2);
            b.ended = true;
        } else if (_score > b.scoreToBeat) {
            b.winner = b.p1;
            upgradeLevel(b.p1CarId);
            b.p1.transfer(b.amount * 2);
            b.ended = true;
        } else {
            b.p1.transfer(b.amount);
            b.p2.transfer(b.amount);
            b.ended = true;
        }
    }
    
    function upgradeLevel(uint _carId) internal {
        Car storage c = cars[_carId];
        if(c.level < 7) {
            c.level++;
            c.speed = c.level * 2 + 7;
        }
    }
    
    function cancelBattle (uint _battleId) public {
        require(now > battles[_battleId].createdAt + 86400);
        Battle storage b = battles[_battleId];
        b.p1.transfer(b.amount);
        b.ended = true;
    }
    
    function getBattlesCount() public view returns(uint) {
        return battles.length;
    }
}