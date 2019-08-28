<template>
    <div>
      <Header @add="addUndoItem"/>
      <ul>
        <li v-for="(item , index) in undoList" :key="index">{{item}}</li>
      </ul>
    </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'TodoList',
  components: {
    Header
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push(inputValue)
    }
  }
}
</script>

<style scoped>

</style>
