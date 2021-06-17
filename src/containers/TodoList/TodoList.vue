<template>
    <div>
      <todo-header @add="addUndoItem"></todo-header>
      <undo-list
        :list="undoList"
        @delete="handleDeleteItem"
        @status="changeStatus"
        @reset="resetStatus"
    ></undo-list>
  </div>
</template>

<script>
import TodoHeader from './components/Header'
import UndoList from './components/UndoList'
export default {
  name: 'TodoList',
  components: {
    TodoHeader,
    UndoList
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({
        status: 'div',
        value: inputValue
      })
    },
    handleDeleteItem (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      this.undoList = this.undoList.map((item, idx) => ({ value: item.value, status: idx === index ? 'input' : 'div' }))
    },
    resetStatus () {
      this.undoList = this.undoList.map(item => ({ value: item.value, status: 'div' }))
    },
    changeItemValue ({ index, value }) {
      this.undoList[index].value = value
    }
  }
}
</script>

<style scoped>

</style>
