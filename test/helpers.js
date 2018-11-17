assert.eventOfType = function(response, eventName) {
    return this.equal(response.logs[0].event, eventName, eventName + ' event should fire.');
}

assert.revertError = function(e, message) {
  return this.equal(e.message, `VM Exception while processing transaction: revert${message ? ' ' + message : ''}`);
}
