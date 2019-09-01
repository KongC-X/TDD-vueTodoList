import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('Headerコンポーネント', () => {
  it('style変化時にお知らせ', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper).toMatchSnapshot()
  })

  it('input存在します', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    expect(input.exists()).toBe(true)
  })

  it('inputの初期値はnull', () => {
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })
  it('inputのvalueが変化すれば、データも共に変化する', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('dell lee')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('dell lee')
  })
  it('inputのvalueがnullの場合enter,無反応', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })
  it('inputのvalueが存在すれば、keyup.enter,$emitを実行,inputのvalueがnullになる', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('dell lee')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })
})
