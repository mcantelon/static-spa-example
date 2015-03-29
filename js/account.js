var $ = require('jquery');
require('jquery.cookie');

// Use HTML5 localstorage to store session data
exports.storage = require('./localstorage');

// Get session-specific storage key
exports.sessionStorageKey = function() {
  return 'sessionData' + $.cookie('sessionId');
};

// Initialize session-specific data
exports.initSessionData = function() {
  this.storage.set(this.sessionStorageKey(), {});
};

// Get/set session-specific data
exports.sessionData = function(name, value) {
  // Skip if no active session
  if ($.cookie('sessionId') !== undefined) {
    var sessionData = this.storage.get(this.sessionStorageKey());

    if (value === undefined) {
      // Return value if data for the session exists
      return (sessionData === null) ? undefined : sessionData[name];
    } else {
      // Set session data
      sessionData[name] = value;
      this.storage.set(this.sessionStorageKey(), sessionData);
    }
  }
};

// Destroy session and related data
exports.logout = function() {
  this.storage.remove(this.sessionStorageKey());
  $.removeCookie('sessionId');
};

// Authorize session
exports.authenticate = function(username, password) {
  if (username == 'name' && password == 'password') {
    // Generate session ID and intitialize session data
    //var sessionId = this.getNewSessionId();
    var sessionId = this.storage.serial('sessionNumber');
    $.cookie('sessionId', sessionId);
    this.initSessionData();
    this.sessionData('user', username);

    return true;
  } else {
    return false;
  }
};

// Check if currently authorized
exports.authorized = function() {
  // Session cookie must be set and data for cookie must exist
  if ($.cookie('sessionId') !== undefined) {
    return this.sessionData('user') !== undefined;
  } else {
    return false;
  }
};
