export class LocalStorageHandler {
  static getFromLocalStorage(key: string) {
    return localStorage.getItem(key)
  }

  static setLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  static removeFromLocalStorage(key: string) {
    return localStorage.removeItem(key)
  }
}