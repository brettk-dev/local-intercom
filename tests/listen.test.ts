import { expect } from 'chai'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'
import { setupDom } from './setupDom'
import { config } from '../src/config'
import { init } from '../src/init'
import { listen } from '../src/listen'

describe('listen', () => {
  let dom: JSDOM;

  before(() => {
    dom = setupDom()
    init()
  })

  it('allows the user to listen for new messages of a type.', () => {
    const fn = sinon.fake()
    listen('test', fn)

    window.localStorage.setItem(config.KEY, '{"type":"test"}')
    const event = new dom.window.StorageEvent('storage', { bubbles: true, newValue: '{"type":"test"}' })
    window.document.dispatchEvent(event)

    expect(fn).to.have.been.calledOnceWith()
  })
})
