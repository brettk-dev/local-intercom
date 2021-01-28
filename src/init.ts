import { Message } from './types/Message'
import { config } from './config'
import { listeners } from './listen'

export const init = () => {
  window.addEventListener('storage', (event) => {
    const msg = event.newValue
    if (!msg) return
    try {
      const obj: Message = JSON.parse(msg)
      if (obj.type && Array.isArray(listeners[obj.type])) {
        listeners[obj.type].forEach(cb => {
          if (typeof cb === 'function') {
            console.log(cb)
            cb(obj.payload)
          }
        })
      }
    } catch (err) {
      console.error('ERROR:', err)
    }
  })
}
