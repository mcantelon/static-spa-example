var Backbone = require('backbone');
var $ = require('jquery');
var ApplicationRouter = require('./router');
var account = require('./account');

Backbone.$ = $;

exports.run = function() {
  var ApplicationView = Backbone.View.extend({

    el: $('body'),

    events: {
      'click ul.nav li a': 'tabClick',
      'click #login-button': 'login',
      'click #logout-tab': 'logout',
      'keypress #login-username,#login-password': 'loginSubmitCheck'
    },

    initialize: function(){
      this.router = new ApplicationRouter();
 
     // Start router and show 404 pane if route is invalid
     if (!Backbone.history.start()) this.router.navigate('404', {trigger:true});

      $('#app').show();
    },

    tabClick: function(e) {
      var tabId = $(e.target).parent().attr('id');
      var pane = tabId.split('-')[0];
      this.router.navigate(pane, true);
    },

    login: function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();

      if (account.authenticate(username, password)) {
        $('#login-form')[0].reset();

        this.router.navigate('home', true);
      } else {
        alert('Incorrect login.');
      }
    },

    loginSubmitCheck: function(event) {
      if (event.which == 13) {
        this.login();
      }
    },

    logout: function() {
      account.logout();
      this.router.navigate('home', true);
    }
  });

  new ApplicationView();
};
