<template>
    <div class="h-20 flex gap-x-4 w-full border border-gray-500 rounded-xl p-4 px-10 group">

            <!--Primary Action -->
            <div class="flex items-center">
                  <button class="h-8 w-8 group border  theme-border flex justify-center items-center rounded-full"
                        @click ="toggleIsDone" :disabled="isOverdue">
                    <i v-if="todo.isDone || (!todo.isDone && !isOverdue)" class="simple-hover fa-solid fa-check theme-icon"
                      :class="{'text-successColor opacity-100': todo.isDone }"/>
                    <i v-if="!todo.isDone && isOverdue"
                       class="fa-solid fa-mark text-textSecondaryColor"/>
                  </button>
            </div>

            <!-- Details -->
            <div class="flex-grow">
              <h5 class="font-bold line-clamp-1">{{ todo.title }}</h5>
              <div class="flex gap-2 text-sm">
                <p class="opacity-80" :class="{ 'text-red-500': !todo.isDone && isOverdue }">
                  <i class="fa-regular fa-calendar theme-icon mr-1" :class="{ 'text-red-500': !todo.isDone && isOverdue }"/>
                  {{ dateFormatter.formatHumanize(todo.dueTime) }}
                </p>
                <span class="opacity-40">•</span>
                <p class="opacity-40">
                  <i class="fa-regular fa-bell theme-icon mr-1"></i>
                  {{ dateFormatter.formatHumanize(todo.reminderTime) }}
                </p>
              </div>
            </div>

            <!-- Secondary Actions -->
            <div class="flex opacity-0 items-center gap-x-4 group-hover:opacity-100 transition-opacity duration-200">

              <!-- Favorite button -->
              <button class="text-2xl btn-hover" @click="toggleIsFavorite">
                <i class="fa-star theme-icon" :class="todo.isFavorite ? 'fa-solid' : 'fa-regular'"></i>
              </button>

              <!-- Edit button -->
              <button class="text-2xl btn-hover" @click="onEdit">
                <i class="fa-solid fa-pen-to-square theme-icon"></i>
              </button>

              <!-- Delete button -->
              <button class="text-2xl btn-hover" @click="OnDeleteAsync">
                <i class="fa-solid fa-trash theme-icon"/>
              </button>

            </div>

    </div>
</template>

<script setup lang="ts">

import {TodoApiClient} from "@/infrastructure/apiClients/toDoAPiClient/brokers/TodoApiClient";
import  {TodoItem} from "@/models/todos/madels/TodoItem";
import {Utils} from "@/infrastructure/extensions/ObjectExtensions";
import  {Guid} from "guid-typescript";
import {computed} from "vue";
import {DateTimeFormatterService} from "@/infrastructure/services/DataCalculatorService";

const todoApiClient = new TodoApiClient()
const dateFormatter = new DateTimeFormatterService()

const props = defineProps({
  todo:{
    type: Object as () => TodoItem,
    required: true
  }
});

const emit = defineEmits<{
  editTodo: [id: Guid],
  deleteTodo: [id: Guid]

}>();
const toggleIsDone = async () => {
  const clonedToDo = Utils.deepClone(props.todo);
  clonedToDo.isDone = !clonedToDo?.isDone

  const  response = await todoApiClient.todos.updateAsync(clonedToDo);
  if(response.isSuccess)
    Object.assign(props.todo, clonedToDo);
}

const toggleIsFavorite = async () => {
  const clonedToDo = Utils.deepClone(props.todo);
  clonedToDo.isFavorite = !clonedToDo?.isFavorite

  const response = await todoApiClient.todos.updateAsync(clonedToDo);
  if(response.isSuccess)
    Object.assign(props.todo, clonedToDo);
}

const onEdit = () => {
  emit('editTodo', props.todo?.id);
}

const OnDeleteAsync = async () => {
  const response = await  todoApiClient.todos.deleteByIdAsync(props.todo?.id);
  if(response.isSuccess)
    emit('deleteTodo',props.todo?.id);
}

// create computed properties
const isOverdue = computed(() =>  new Date(props.todo?.dueTime) < new Date());
</script>