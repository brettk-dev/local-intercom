import { Message } from './types/Message'
import { config } from './config'

interface Listeners {
  [type: string]: ((payload: unknown) => void)[]
}

export const listeners: Listeners = {}

export const listen = (type: string, callback: (payload: unknown) => void) => {
  if (!listeners[type]) {
    listeners[type] = []
  }

  listeners[type] = [...listeners[type], callback]
}
