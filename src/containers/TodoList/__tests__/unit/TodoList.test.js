import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import Header from '../../components/Header'

it('TodoList_components_mounted, undoList 空であるべき', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([])
})
it('TodoList_watch_Header_add_funcの時に、undoListに要素一個増える', function () {
  const wrapper = shallowMount(TodoList)
  const header = wrapper.find(Header)
  header.vm.$emit('add', 'dell lee')
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual(['dell lee'])
})
