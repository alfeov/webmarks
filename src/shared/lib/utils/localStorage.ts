export const getLocalStorageData = <T>(storageKey: string): T | undefined => {
  try {
    const data = localStorage.getItem(storageKey)

    if (data === null) return undefined

    return JSON.parse(data)
  } catch (error) {
    if (error instanceof Error) console.error(error)
    return undefined
  }
}

export const setLocalStorageData = <T>(storageKey: string, data: T) => {
  try {
    const stringifiedData = JSON.stringify(data)
    localStorage.setItem(storageKey, stringifiedData)
  } catch (error) {
    if (error instanceof Error) console.error(error)
  }
}
