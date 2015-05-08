/**
* Create an object literal with the following key value pairs:
* type: {string} 'Goldfish'
* brand: {string} 'Pepperidge Farm'
* flavor: {string} 'Cheddar'
* count: {number} 2000
* It should be returned directly by the following function
* @return {object} - the object literal
*/

function returnObjectLiteral() {
  //your code here

  //var object = {brand: "Pepperidge Farm", count: 2000, flavor: "Cheddar", type: "Goldfish"};
  
  return object= {brand: "Pepperidge Farm", count: 2000, flavor: "Cheddar", type: "Goldfish"}; //Modify ONLY this line
  
  //end your code
}

/**
* Create a constructor function for a `MessageLog` object.
* @constructor
* @param {string} user - The user associated to the message log
* The string indicating the user should be stored in the user property of the
* object instances.
*
* In addition, the following methods should be
* callable on a MessageLog object:
* logMessage( {string} messageText, {number} direction) - This should log a
* message
* as either being sent or received. A direction of 0 indicates it is a message
* the user sent. A direction of 1 indicates it is a message the user received.
* Behavior for other numbers is undefined.

* getSentMessage({number} n) - returns as a string, the content of the nth most
* recently sent message. To conserve memory, the object should only keep the
* last 5 message. n=0 retrieves the most recent n=4 retrieves the least recent
* of the 5.

* totalSent() - returns an integer indicating the total number of messages sent

* totalReceived() - returns an integer indicating the total number of messages
* received
*/

//your code here
function MessageLog(user) {
	
  this.user = user;
  this.sentCount = 0;
  this.recCount = 0;
  this.sentMessages = new Array();
  this.recMessages = new Array();
	
	
  this.logMessage = function(messageText, direction) {
		
    if(direction == 0) {	//Message is sent by user
      this.sentMessages[this.sentCount % 5] = messageText;
      this.sentCount++;
	}
		
	else if(direction == 1) {	//Message is received by user
      this.recMessages[this.recCount] = messageText;
	  this.recCount++;
	}
  };
	
  this.getSentMessage = function(n) {
	var index = ((this.sentCount - 1) - n) % 5;
	return this.sentMessages[index];
  };
	
  this.totalSent = function() {
	return this.sentCount;
  };
	
  this.totalReceived = function() {
	return this.recCount;
  };
};

//end your code

/**
* Add a method to the MessageLog prototype:
* lastReceivedMessage() - returns the message text of the last message the user
* received.
*/
//your code here

MessageLog.prototype.lastReceivedMessage = function() {
  return this.recMessages[this.recCount - 1];
	
};
//end your code

/**
* Create an instance of a `MessageLog` for the user "BlackHatGuy". Have the
* instance receive 3 messages: "foo", "bar" and "baz", received in that order.
* Assign it to the variable myLog.
*/

//your code here

var myLog = new MessageLog('BlackHatGuy');
myLog.logMessage('foo', 1);
myLog.logMessage('bar', 1);
myLog.logMessage('baz', 1);

//end your code
