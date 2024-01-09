<template>

  <div class="h-full w-full p-20 flex flex-col gap-y-20 px-[20%] items-center justify-center">

    <!-- Task list -->
    <todo-list :todos="todos as TodoItem[]" @editTodo="onEditTodo"/>

    <!-- New task form -->
    <new-todo-form @addNewTodo="onAddTodo" :editTodo="editTodo as TodoItem"/>

  </div>

</template>

<script setup lang="ts">


import { onBeforeMount, ref } from "vue";
import type { Guid } from "guid-typescript";
import  {TodoItem} from "@/models/todos/madels/TodoItem";
import {TodoApiClient} from "@/infrastructure/apiClients/toDoAPiClient/brokers/TodoApiClient";
import TodoList from "@/models/todos/components/TodoList.vue";
import NewTodoForm from "@/models/todos/components/TodoForm.vue";

const todoApiClient = new TodoApiClient();
const todos = ref<Array<TodoItem>>([]);
const editTodo = ref<TodoItem | null>(null);

onBeforeMount(async () => {
  await loadTodosAsync();
});

const loadTodosAsync = async () => {
  const todosResponse = await todoApiClient.todos.getAsync();
  if (todosResponse.isSuccess && todosResponse.response) {
    todos.value = todosResponse.response;
  }
}

const onAddTodo = (todo: TodoItem) => {
  const index = todos.value.findIndex(element => element.dueTime > todo.dueTime && !element.isDone);
  if (index !== -1) todos.value.splice(index, 0, todo);
  else todos.value.unshift(todo);
}

const onEditTodo = (id: Guid) => {
  const todo = todos.value.find(x => x.Id === id);
  if (todo) {
    editTodo.value = todo;
  }
}

</script>