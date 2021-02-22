pragma solidity ^0.4.25;

contract InboxContract{
    string public message;
    constructor (string initialMessage)  {
       message = initialMessage;
    }
   
    function setMessage (string newMessage) public {
         message=newMessage;
    }
}