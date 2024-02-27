
import axios, { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'
import { REST_API } from '../common/config'

type Method = 'get' | 'post' | 'delete' | 'put'

export interface RequestConfig {
  url: string
  method: Method
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

export const useRequest = <T>(config: RequestConfig): FetchState<T> => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const cfg = createAxiosConfig(config)
    const request = _axios[config.method](config.url, cfg)
    request.then((res: any) => {
      setData(res.data)
    }).catch((e) => {
      setError(e)
    }).finally(() => {
      setLoading(false)
    })
  }, [config.params, config.data])

  return { data, error, loading }
}
