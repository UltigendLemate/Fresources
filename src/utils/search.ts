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
    useCallback(
      (query: string) => {
        if (!query) {
          setData(propsData)
        } else {
          const results = fuse.current.search(query)
          setData(results.map((result) => result.item))
        }
      },
      [propsData]
    ),
  ]
}

/*
export function useSearchExact<T>(
  propsData: T[],
  key: keyof T,
  nestedKey: keyof T[typeof key]
): ReturnType<T> {
  const [data, setData] = useState(propsData)

  return [
    data,
    useCallback(
      (query: string) => {
        if (!query) {
          setData(propsData)
        } else {
          const results = propsData.filter((item) =>
            (item[key] as { [nestedKey]: string }[]).forEach((nestedItem) =>
              nestedItem.beginsWith(query)
            )
          )
          setData(results)
        }
      },
      [key, nestedKey, propsData]
    ),
  ]
}
*/
