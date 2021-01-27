import { Message } from './types/Message'

export const makeMessage = (type: string, payload?: unknown): Message => {
  if (!type) {
    throw new Error(
      'A message type is required.'
    )
  }
  return {
    type,
    payload
  }
}
