// HTML5 localStorage storage mechanism
module.exports = {
  get: function(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  set: function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: function(key) {
    localStorage.removeItem(key);
  },

  serial: function(key) {
    var serial = this.get(key);

    if (serial === undefined) {
      serial = 1;
    } else {
      serial++;
    }

    this.set(key, serial);
    return serial;
  }
};
