import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import jsdom, { JSDOM } from 'jsdom'
import { send } from '../src/send'
import { config } from '../src/config'

chai.should()
chai.use(sinonChai)

const simpleData = {
  type: 'test'
}

const complexData = {
  type: 'test',
  payload: {
    one: 1,
    two: { too: 'to' },
    three: ['four']
  }
}

const dom = new JSDOM('', {
  url: 'http://localhost'
})
global.document = dom.window.document
// @ts-ignore
global.window = {
  ...dom.window,
  localStorage: {
    setItem(key: string, value: string) {},
    getItem(key: string): string { return '' },
    removeItem(key:string) {},
    length: 0,
    clear() {},
    key(index: number): string | null { return null }
  }
}

describe('send', () => {
  it('uses local storage to send a message.', () => {
    const setItemSpy = sinon.spy(window.localStorage, 'setItem')
    send(simpleData.type)
    
    expect(setItemSpy).to.have.been.calledOnceWith(
      config.KEY,
      JSON.stringify(simpleData)
    )

    setItemSpy.restore()
  })

  it('clears the local storage key after.', () => {
    const clock = sinon.useFakeTimers()
    const setItemSpy = sinon.spy(window.localStorage, 'setItem')
    const removeItemSpy = sinon.spy(window.localStorage, 'removeItem')
    send(simpleData.type)
    clock.tick(1)
    
    expect(removeItemSpy).to.have.been.calledAfter(setItemSpy)
    expect(removeItemSpy).to.have.been.calledOnceWith(config.KEY)

    setItemSpy.restore()
    removeItemSpy.restore()
    clock.restore()
  })

  it('throws an error if no type is provided', () => {
    // @ts-ignore
    expect(() => send()).to.throw()
  })
})
