import { makeMessage } from './makeMessage'
import { config } from './config'

export const send = (type: string, payload?: unknown) => {
  const msg = makeMessage(type, payload)
  window.localStorage.setItem(config.KEY, JSON.stringify(msg))
  window.setTimeout(() => {
    window.localStorage.removeItem(config.KEY)
  }, 0)
}
