import { JSDOM } from 'jsdom'

export const setupStorage = () => {
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
}
