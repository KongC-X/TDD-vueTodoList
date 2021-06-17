import { shallowMount } from '@vue/test-utils'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('UndoList', () => {
  it('参数为[]，count为0，无list内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [] }
    })
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'item')
    expect(countElem.at(0).text()).toEqual('0')
    expect(listItems.length).toEqual(0)
  })
  it('参数为[1,2,3]，count=3，有list内容，存在删除按钮', () => {
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
  it('点击删除按钮后，执行删除方法', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }] }
    })
    const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
    deleteButton.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
    // click事件发生次数 == 1
    expect(wrapper.emitted().delete[0][0]).toBe(1)
  })
  it('listitem被点击后，向外部发送status事件', () => {
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
  it('一个列表是input，另外两个是一般内容', () => {
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
  it('input失去焦点后，向外部发出reset事件', () => {
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
  it('input变化时，启动change事件', () => {
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
