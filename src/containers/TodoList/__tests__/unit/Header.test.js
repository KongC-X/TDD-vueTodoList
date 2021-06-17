import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Header 组件', () => {
  it('style变化时的通知', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper).toMatchSnapshot()
  })

  it('input 存在', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    expect(input.exists()).toBe(true)
  })

  it('input 的初始值为 null', () => {
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })
  it('如果 input 的 value 发生变化，数据也会一起变化', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('zhang yiming')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('zhang yiming')
  })
  it('input 的 value 为 null 时 enter，无反应', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })
  it('如果存在 input 的 value，执行 keyup.enter，$emit，input 的 value 变成 null', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('zhang yiming')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })
})
