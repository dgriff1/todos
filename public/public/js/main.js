var Models = {};
var Views = {};

var util = {
  extend: function (obj, extObj) {
    for (var i in extObj) {
      obj[i] = extObj[i];
    }

    return obj;
  }
};

Models.Todo = function (config) {
  this.id = config.id || -1;
  this.name = config.name || '';
  this.done = config.done || false;
};

util.extend(Models.Todo.prototype, {

  constructor: function (name) {
    this.id = -1;
    this.name = name;
    this.done = false;
  },

  complete: function () {
    this.done = true;
  },

  parseResponse: function (response) {
    this.id = response.id;
    this.name = response.name;
    this.done = response.done;
  },

  create: function () {
    return $.ajax({
      url: '/todos',
      method: 'POST',
      contentType : 'application/json',
      dataType: 'application/json',
      context: this,
      data: JSON.stringify({
        name: this.name
      }),
      success: function (response) {
        debugger;
        this.parseResponse(response);
      },
      failure: function (response) {
        debugger;
      }
    });
  },
  update: function () {
    return $.ajax({
      url: '/todos/' + this.id,
      method: 'PUT',
      contentType : 'application/json',
      dataType: 'application/json',
      data: JSON.stringify({
        name: this.name,
        done: this.done
      })
    });
  }
});

Views.Todo = function (config) {
  this.model = config.model;
  this.el = $('<li/>');
};

util.extend(Views.Todo.prototype, {
  editMode: false,

  render: function () {
    this.el.html(this.template());
    return this;
  },

  template: function () {
    return '<label><input type="checkbox" ' + (this.model.done ? 'checked' : '') + ' /> ' + this.model.name + ' ' + this.model.id + '</label>';
  }
});

Models.TodoList = function TodoList () {
  this.list = [];
};

util.extend(Models.TodoList.prototype, {
  addTodo: function (name) {
    this.list.push(new Todo({name: name}));
  },

  getList: function () {

    return $.ajax({
      url: '/todos',
      context: this,
      success: function (todos) {
        var me = this;
        $.each(todos, function (index, response) {
          var todo = new Models.Todo({
            id: response.id,
            name: response.name,
            done: response.done
          });

          me.list.push(todo);
        });
      },
      error: function (xhr, status, error) {
        debugger;
      }
    });
  }

});

Views.TodoList = function (config) {
  this.model = config.model;
  this.el = $('<ul/>');
};

util.extend(Views.TodoList.prototype, {

  template: function () {

    var str = '';

    for (var i=0; i<this.model.length; i++) {
      var todoView = new Views.Todo({
        model: new Models.Todo(this.model[i])
      });

      debugger;
      todoView.render();
      this.el.append(todoView.el);
    }
  },

  render: function () {
    this.el.html('');
    this.template();
    return this;
  },

  addTodo: function () {
    var todo = new Models.Todo({name: $('#newTodo').val()});
    todo.create().then(function () {
      debugger;
      this.model.push(todo);
      this.render();
    });
  }
});

Views.TodoModal = function (config) {
  this.model = config.model;
};

var todoList = new Models.TodoList();
var myResponse = todoList.getList().then(function () {
  var todoListView = new Views.TodoList({
    model: todoList.list
  });

  $('#main').append(todoListView.el);
  todoListView.render();

  $('.add-todo').bind('click', function () {
    todoListView.addTodo();
  });
});