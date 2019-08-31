import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import UndoList from '../../components/UndoList'

it('TodoList_components_mounted, undoList 空であるべき', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([])
})
it('TodoList_watch_Header_add_funcの時に、undoListに要素一個増える', function () {
  // 結合テスト
  // const content = 'dell lee'
  // const wrapper = shallowMount(TodoList)
  // const header = wrapper.find(Header)
  // header.vm.$emit('add', content)
  // const undoList = wrapper.vm.$data.undoList
  // expect(undoList).toEqual([content])
  // ユニットテスト
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [1, 2, 3]
  })
  wrapper.vm.addUndoItem(4)
  expect(wrapper.vm.$data.undoList).toEqual([1, 2, 3, 4])
})
it('TodoList UNdoListを呼ぶ, listパラメータを伝達', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.find(UndoList)
  const list = undoList.props('list')
  expect(list).toBeTruthy()
})
it('TodoListのhandleDeleteItem関数呼ばれた時に、UndoListのlist内容が-1', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [1, 2, 3]
  })
  wrapper.vm.handleItemDelete(1)
  expect(wrapper.vm.$data.undoList).toEqual([1, 3])
})
