import { shallowMount } from '@vue/test-utils'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../utils/testUtils'

it('UndoList,パラメータは[], countは0,list内容無し', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: { list: [] }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'item')
  expect(countElem.at(0).text()).toEqual('0')
  expect(listItems.length).toEqual(0)
})
it('UndoListのパラメータが[1,2,3],count=3,list内容あり, 削除ポタんが存在する', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: { list: [1, 2, 3] }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'item')
  const deleteButtons = findTestWrapper(wrapper, 'delete-button')
  expect(countElem.at(0).text()).toEqual('3')
  expect(listItems.length).toEqual(3)
  expect(deleteButtons.length).toEqual(3)
})
it('UndoList 削除ボタンクリックされたら、削除メソッド実行する', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: { list: [1, 2, 3] }
  })
  const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
  deleteButton.trigger('click')
  expect(wrapper.emitted().delete).toBeTruthy()
  // click事件が何回起きた == 1
  expect(wrapper.emitted().delete[0][0]).toBe(1)
})
