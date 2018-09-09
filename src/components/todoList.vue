<template>
  <div>
    <base-input  type="text" v-model="newTodoText" placeholder="New Todo" @keydown.enter="addTodo"></base-input>
    <ul class="todoList">
      <todo-item v-for="item in items" :item="item" :key="item.id" @removeItem="removeItem($event)"></todo-item>
    </ul>
  </div>

</template>

<script>
import todoItem from './todoItem'
import baseInput from './baseInput'

let nextTodoId = 1

export default {
  name: 'todoList',
  components: {
    'todo-item': todoItem,
    'base-input': baseInput
  },
  data: function () {
    return {
      newTodoText: '',
      switchValue: true,
      items: [
        {
          id: nextTodoId++,
          text: 'Learn Vue'
        },
        {
          id: nextTodoId++,
          text: 'Learn about single-file components'
        },
        {
          id: nextTodoId++,
          text: 'Fall in love'
        }
      ]
    }
  },
  methods: {
    addTodo: function () {
      const trimmedText = this.newTodoText.trim()
      if (trimmedText) {
        this.items.push({
          id: nextTodoId++,
          text: trimmedText
        })
        this.newTodoText = ''
      }
    },
    removeItem: function (id) {
      this.items = this.items.filter(function (item) {
        return item.id !== id
      })
    }
  }
}
</script>
<style scoped>
  .todoList{
    margin-top: 20px;
  }
</style>
