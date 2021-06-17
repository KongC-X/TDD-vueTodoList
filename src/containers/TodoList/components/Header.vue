<template>
    <div class="header">
      <div class="header-content">
        TodoList
        <input
          class="header-input"
          data-test="input"
          v-model="inputValue"
          @keyup.enter="addTodoItem"
          placeholder="Add TodoItem"
        />
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.header{
  line-height 60px
  background #333
}
.header-content{
  width 600px
  margin 0 auto
  color #ffffff
  font-size 28px
}
.header-input{
  float right
  width 360px
  margin-top 16px
  line-height 24px
  border-radius 5px
  outline none
  color #333
  text-indent: 2em
  text-indent 10px
}
</style>
