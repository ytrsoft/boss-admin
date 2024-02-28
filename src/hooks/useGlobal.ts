import { createContext, useEffect, useState } from 'react'
import { newRequest } from './useRequest'
import { values, head, keys } from 'lodash'
import { EXCLUDE_KEY } from '../common/config'


const baseInfo = async () => {
  const result: any = {}
  const profiles = await newRequest({ url: '/profile'})
  const _keys: string[] = keys(profiles.data._links)
    .filter((_: any, index: number) => index !== 0)
  const requestQuene: Promise<any>[] = values(profiles.data._links)
    .filter((_: any, index: number) => index !== 0)
    .map((k: any) => newRequest({ url: k.href}))
  const descriptor: any[] = await Promise.all(requestQuene)
  const descrs = descriptor.map((k: any) => {
    const descriptors: any[] = k.data.alps.descriptor
    const inners: any[] = head(descriptors).descriptor
    const props: any = {}
    inners.forEach((i: any) => {
      if (!EXCLUDE_KEY.includes(i.name)) {
        props[i.name] = i.doc.value
      }
    })
    return props
  })
  _keys.forEach((k: string, index: number) => {
    result[k] = descrs[index]
  })
  return result
}

export const useGlobalContext = () => {
  const [value, setValue] = useState<any>()
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    baseInfo().then((res: any) => {
      setValue(res)
    }).catch((e: Error) => {
      setError(e)
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  return { value, error, loading }
}

export const GlobalContext = createContext(null)