import { shallowMount } from '@vue/test-utils'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('UndoList', () => {
  it('パラメータは[], countは0,list内容無し', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [] }
    })
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    expect(countElem.at(0).text()).toEqual('0')
    expect(listItems.length).toEqual(0)
  })
  it('パラメータが[1,2,3],count=3,list内容あり, 削除ポタんが存在する', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }] }
    })
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    const deleteButtons = findTestWrapper(wrapper, 'delete-button')
    expect(countElem.at(0).text()).toEqual('3')
    expect(listItems.length).toEqual(3)
    expect(deleteButtons.length).toEqual(3)
  })
  it('削除ボタンクリックされたら、削除メソッド実行する', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }] }
    })
    const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
    deleteButton.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
    // click事件が何回起きた == 1
    expect(wrapper.emitted().delete[0][0]).toBe(1)
  })
  it('list-itemがクリックされたら、外部に status イベントを送る', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ] }
    })
    const deleteButton = findTestWrapper(wrapper, 'item').at(1)
    deleteButton.trigger('click')
    expect(wrapper.emitted().status).toBeTruthy()
    expect(wrapper.emitted().status[0][0]).toBe(1)
  })
  it('リスト一つがinput, 二つが一般内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ] }
    })
    const input = findTestWrapper(wrapper, 'input')
    expect(input.at(0).element.value).toBe('2')
    expect(input.length).toBe(1)
  })
  it('inputの焦点失ったら、外部にresetイベントを出す', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ] }
    })
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.trigger('blur')
    expect(wrapper.emitted().reset).toBeTruthy()
  })
  it('input変化時に、changeイベントを発動', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 123 },
        { status: 'div', value: 3 }
      ] }
    })
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.trigger('change')
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual({
      value: '123',
      index: 1
    })
  })
})
