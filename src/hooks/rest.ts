// 简化SpringDataRest调用

import { isString, isArray, keys, isEmpty } from 'lodash'
import { FetchState, useRequest } from './useRequest'

interface Link {
  href: string;
}

interface PageLinks {
  first: Link;
  self: Link;
  next: Link;
  last: Link;
  profile: Link;
}

interface Links {
  self: Link;
  [key: string]: Link
}

interface BaseEntity {
  id?: string; 
  created?: string; 
  updated?: string; 
  deleted?: boolean;
  _links?: Links
}

interface Embedded<T> {
  [key: string]: T | T[];
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface PageEntity<T extends BaseEntity> {
  _embedded: Embedded<T>;
  _links: PageLinks;
  page: Page
}
               
type Query<T extends BaseEntity> = PageEntity<T> | T

export interface Sort {
  field: string
  mode: 'desc' | 'asc'
}

export interface Params {
  page?: number
  size?: number
  sort?: Sort | Sort[]
  [key: string]: any
}

export interface UpdateParams {
  search: any;
  data: any;
}

const isLink = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
}

const buildRestUri = (params: any): string => {
  if (isString(params)) {
    return params
  }
  const list: string[] = []
  for (const key in params) {
    list.push(key)
    list.push(params[key])
  }
  return list.join(',')
}

const buildQuerySearch = (params?: Params): string => {
  const search = new URLSearchParams()
  if (params?.page != null) {
    search.append('page', String(params.page))
  }
  if (params?.size != null) {
    search.append('size',String(params.size))
  }
  if (params?.sort != null) {
    if (!isArray(params.sort)) {
      params.sort = [params.sort]
    }
    params.sort.forEach((sort: Sort) => {
      const value = sort.field + '' + sort.mode
      search.append('sort', value);
    })
  }
  keys(params).forEach((key: string) => {
    if (params && !(key === 'page' || key === 'size' || key === 'sort')) {
      search.append(key, String(params[key]));
    }
  })
  const result = search.toString()
  return isEmpty(result) ? `` : `?${result}`
}

export const useRead = <E extends BaseEntity>(endpoint: string, params?: Params): FetchState<Query<E>> => {
  const search = buildQuerySearch(params)
  const url = isLink(endpoint) ? endpoint : `/${endpoint}${search}`
  return useRequest({ url, method: 'get' })
}

export const useCreate = <E extends BaseEntity>(endpoint: string, params: E): FetchState<E> => {
  const url = isLink(endpoint) ? endpoint : `/${endpoint}`
  return useRequest({ url, method: 'post', data: params })
}

export const useUpdate = <E extends BaseEntity>(endpoint: string, params: UpdateParams): FetchState<E> => {
  const uri = buildRestUri(params.search)
  const url = isLink(endpoint) ? endpoint : `/${endpoint}/${uri}`
  return useRequest({ url, method: 'put', data: params.data })
}

export const useDelete = (endpoint: string, params: any): FetchState<any> => {
  const uri = buildRestUri(params)
  const url = isLink(endpoint) ? endpoint : `/${endpoint}/${uri}`
  return useRequest({ url, method: 'delete' })
}
