import { useState, useEffect } from 'react'

/**
 * Синхронизирует state с localStorage
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, (v: T) => void]}
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
