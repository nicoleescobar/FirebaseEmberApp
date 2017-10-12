import Ember from 'ember';

export default Ember.Controller.extend({
  tasks: null,
  task: {name: "", descp: "", isDone: false},
  user: null,
  taskLastIndex: 0,

  actions: {
    logOut: function () {
      firebase.auth().signOut()
    },

    addNewTask: function () {
      firebase.database().ref('tasks/' + this.taskLastIndex).set({
        name: this.task.name,
        descp: this.task.descp,
        isDone: this.task.isDone,
        userId: this.user.uid,
      });
    },

    markTaskAsDone: function (index) {
      var task = this.tasks[index];
      var tasks = firebase.database().ref('tasks/'+ index);
      tasks.set({
        name: task.name,
        descp: task.descp,
        isDone: true,
        userId: task.userId
      });
    },
  }
});
