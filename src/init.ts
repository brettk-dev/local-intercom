import _ from 'underscore'
import { Message } from './types/Message'
import { config } from './config'
import { listeners } from './listen'

export const init = () => {
  window.addEventListener('storage', () => {
    const msg = window.localStorage.getItem(config.KEY)
    if (!msg) return
    try {
      const obj: Message = JSON.parse(msg)
      if (obj.type && Array.isArray(listeners[obj.type])) {
        listeners[obj.type].forEach(cb => {
          if (_.isFunction(cb)) {
            cb(obj.payload)
          }
        })
      }
    } catch (err) {
      console.error('ERROR:', err)
    }
  })
}
