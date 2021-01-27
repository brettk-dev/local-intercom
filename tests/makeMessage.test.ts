import { expect } from 'chai'
import { makeMessage } from '../src/makeMessage'


const simpleMessage = 'A simple message'
const complexMessage = {
  one: 1,
  two: { too: 'to' },
  three: [1, 2, 3]
}

describe('makeMessage', () => {
  it('creates a simple Message', () => {
    const msg = makeMessage('simple', simpleMessage)

    expect(msg.type).to.equal('simple')
    expect(msg.payload).to.deep.equal(simpleMessage)
  })

  it('creates a complex message', () => {
    const msg = makeMessage('complex', complexMessage)

    expect(msg.type).to.equal('complex')
    expect(msg.payload).to.deep.equal(complexMessage)
  })

  it('throws an error if no type is provided', () => {
    // @ts-ignore
    expect(() => makeMessage()).to.throw()
  })

  it('does not throw an error when no payload is provided', () => {
    const msg = makeMessage('event')

    expect(msg.type).to.equal('event')
    expect(msg.payload).to.be.undefined
  })
})

