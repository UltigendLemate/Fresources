import Fuse from 'fuse.js'
import { useCallback, useRef, useState } from 'react'

interface ReturnType<T> extends Array<any> {
  0: T[]
  1: ({}: string) => void
}

export function useSearch<T>(
  propsData: T[],
  keys: string[],
  options: Fuse.IFuseOptions<T> = {}
): ReturnType<T> {
  const [data, setData] = useState(propsData)

  const fuse = useRef(new Fuse(propsData, { ...options, keys }))

  return [
    data,
    useCallback((query: string) => {
      const results = fuse.current.search(query)
      setData(results.map((result) => result.item))
    }, []),
  ]
}
