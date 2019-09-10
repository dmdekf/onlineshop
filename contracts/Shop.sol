pragma solidity ^0.5.0;

contract Shop {
  mapping (address => uint256) myApple;

  function buyApple() public payable {
    myApple[msg.sender] ++;
  }

  function getApples() external view returns(uint256) {
    return myApple[msg.sender];
  }

  function sellMyApple(uint _applePrice) external payable {
    uint refund = myApple[msg.sender] + _applePrice;
    myApple[msg.sender] = 0;
    msg.sender.transfer(refund);
  } 
}
