import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    this.checkUser();
    this.loadTasks();
  },

  checkUser: function () {
    var that = this;
    var controller = this.controllerFor("home");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        controller.set('user', user.providerData[0]);
      } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().languageCode = 'en';
        firebase.auth().signInWithRedirect(provider);
      }
    });
  },

  loadTasks: function () {
    var controller = this.controllerFor("home");
    var tasks = firebase.database().ref('tasks');
    tasks.on('value', function(snapshot) {
      controller.set("tasks", snapshot.val());
      controller.set("taskLastIndex", controller.tasks.length);
      controller.set("task", {name: "", descp: "", isDone: false});
    });
  }


});
