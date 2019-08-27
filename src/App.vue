<template>
  <div id="app">
    <todo-list/>
  </div>
</template>

<script>
import TodoList from './containers/TodoList/TodoList'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>
<style lang="stylus">
</style>
