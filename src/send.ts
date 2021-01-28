import { makeMessage } from './makeMessage'
import { config } from './config'

export const send = (type: string, payload?: unknown) => {
  const msg = makeMessage(type, payload)
  console.log('message made', msg)
  localStorage.setItem(config.KEY, JSON.stringify(msg))
  localStorage.removeItem(config.KEY)
}
