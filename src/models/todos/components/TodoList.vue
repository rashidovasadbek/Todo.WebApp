<template>
      <div class="flex flex-col gap-4 w-full h-[800px] overflow-x-scroll no-scrollbar">
          <todo-card v-for="todo in todos" :key="todo.id?.toString" :todo="todo" @editTodo = "onEditToDo" @deleteTodo = "onDeleteTodo"/>
      </div>
</template>

<script setup lang="ts">

import type {PropType} from "vue";
import  {TodoItem} from "@/models/todos/madels/TodoItem";
import type {Guid} from "guid-typescript";
import TodoCard from "@/models/todos/components/TodoCard.vue";

const props = defineProps({
  todos: {
    type: Array as PropType<Array<TodoItem>>,
    required: true
  }
});

const emit = defineEmits<{
  editTodo: [id: Guid]
}>()

const onEditToDo = (id: Guid) => {
  emit("editTodo", id);
}

const onDeleteTodo = (id: Guid) => {
  const  index = props.todos?.findIndex(x => x.id === id);
  if(index !== -1)
    props.todos?.splice(index, 1)
}

</script>
