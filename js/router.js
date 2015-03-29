var Backbone = require('backbone');
var $ = require('jquery');
var account = require('./account');

Backbone.$ = $;

module.exports = Backbone.Router.extend({
  routes: {
    '':         'updateUI',
    'home':     'updateUI',
    'listings': 'updateUI',
    'login':    'updateUI',
    '404':      'updateUI'
  },

  deselectTabs: function(){
    $('ul.nav li').removeClass('active');
  },

  selectTab: function(tab){
    this.deselectTabs();
    $(tab).addClass('active');
  },

  hidePanes: function(){
    $('div.pane').hide();
  },

  showPane: function(pane){
    this.hidePanes();
    $(pane).show();
  },

  updateUI: function() {
    // Show or hide elements based on authentication
    var authorized = account.authorized();

    if (authorized) {
      $('.private').show();
      $('.anonymous').hide();
    } else {
      $('.private').hide();
      $('.anonymous').show();
    }

    // Show active pane and select active tab
    var selectedPane = Backbone.history.getFragment();
    selectedPane = (selectedPane == '') ? 'home' : selectedPane;
    var selectedPaneId = 'div#' + selectedPane + '-pane';

    if (!$(selectedPaneId).hasClass('private') || authorized) {
      this.showPane(selectedPaneId);
      this.selectTab('li#' + selectedPane + '-tab');
    } else {
      this.navigate('login', true);
    }
  }
});
