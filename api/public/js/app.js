
(function($){
  $(document).ready(function(){

    $.getJSON('/api/todos')
    .then(renderTodos)
    .catch(function(err) {
        console.log(err);
    });

    usrinput.keypress(function(event) {
      if (event.which === 13) {
        createTodo();
      }
    });

    list.on('click', '.delete', function(e) {
      e.stopPropagation();
      deleteTodo($(this).parent());
    });

    list.on('click', '.task', function() {
      updateTodo($(this));
    });

  });
}(jQuery));

var list = $('.todo-list ul');
var usrinput = $('#todoInput');

function renderTodos(todos) {
  todos.forEach(todo => {
    // console.log(todo.name);
    newTodo(todo);
  });
}

function createTodo() {
  //send post request
  $.post('/api/todos', { name: usrinput.val()})
  .then( function(todo) {
    newTodo(todo);
    usrinput.val('');
  })
  .catch(function(err) {
    console.log(err);
  });
}

function newTodo(todo) {
  var newTodo = $('<li class="task">' +  todo.name + '<span class="delete">x</span></li>');
  //store values for id and completed
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass('done');
  }
  list.append(newTodo);
}

function deleteTodo(todo) {
  var todoId = todo.data('id');
  var deleteurl = '/api/todos/' + todoId;
  $.ajax({
    method: 'DELETE',
    url: deleteurl
  })
  .then(function(data) {
    console.log(data);
    todo.remove();
  })
  .catch(function(err) {
    console.log(err);
  });
}

function updateTodo(todo) {
  var newCompletedStatus = !todo.data('completed');
  var updateurl = '/api/todos/' + todo.data('id');
  var updateData = { completed: newCompletedStatus };
  $.ajax({
    method: 'PUT',
    url: updateurl,
    data: updateData
  })
  .then(function(data) {
    console.log(data);
    todo.toggleClass('done');
    todo.data('completed', newCompletedStatus);
  })
  .catch(function(err) {
    console.log(err);
  });
}