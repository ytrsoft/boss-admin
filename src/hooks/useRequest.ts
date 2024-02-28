
import axios, { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'
import { REST_API, BASE_URL } from '../common/config.ts'

type Method = 'get' | 'post' | 'delete' | 'put'

export interface RequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
}

export interface FetchState<T> {
  data?: T;
  error: Error | null
  loading: boolean
}

const _axios = axios.create({ baseURL: REST_API })

const createAxiosConfig = (config: RequestConfig): AxiosRequestConfig => {
  if (config.method == 'get') {
    return { params: config.params }
  }
  return {
    params: config.params,
    data: config.data
  }
}

const isLink = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
}

export const newRequest = (config: RequestConfig): any => {
  if (isLink(config.url)) {
    config.url = config.url.replace(BASE_URL + REST_API, '')
  }
  const cfg = createAxiosConfig(config)
  const method: Method = config.method || 'get'
  return _axios[method](config.url, cfg)
}

export const useRequest = <T>(config: RequestConfig): FetchState<T> => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const deps: any[] = [config.params, config.data, config.url]
  useEffect(() => {
    const request = newRequest(config)
    request.then((res: any) => {
      setData(res.data)
    }).catch((e: Error) => {
      setError(e)
    }).finally(() => {
      setLoading(false)
    })
  }, deps)

  return { data, error, loading }
}
