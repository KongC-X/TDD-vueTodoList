import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header'

it('Headerのstyle変化時にお知らせ', () => {
  const wrapper = shallowMount(Header)
  expect(wrapper).toMatchSnapshot()
})

it('Header内にinput存在します', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('[data-test="input"]')
  expect(input.exists()).toBe(true)
})

it('Headerのinputの初期値はnull', () => {
  const wrapper = shallowMount(Header)
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('')
})
it('Headerのinputのvalueが変化すれば、データも共に変化する', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('input[data-test="input"]')
  input.setValue('dell lee')
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('dell lee')
})
it('Headerのinputのvalueがnullの場合enter,無反応', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('input[data-test="input"]')
  input.setValue('')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeFalsy()
})
it('Headerのinputのvalueが存在すれば、keyup.enter,$emitを実行,inputのvalueがnullになる', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('input[data-test="input"]')
  input.setValue('dell lee')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeTruthy()
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('')
})
