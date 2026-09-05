import { useEffect, useRef } from 'react'

export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) callback()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [callback])

  return ref
}
