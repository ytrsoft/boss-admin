import { useMemo, useState } from 'react'
import { Page } from './rest'

const usePage = (p: Page) => {
  const [page, setPage] = useState((p?.number || 0) + 1)
  const totalPages = p.totalPages || 0
  const pages = useMemo<number[]>(() => {
    const ret: number[] = []
    let startPage = page - 2;
    let endPage = page + 3;
    if (startPage <= 0) {
      startPage = 1
      endPage = 6
    }
    if (endPage >= totalPages) {
      endPage = totalPages
      startPage = endPage - 5
    }
    for(let i = startPage; i <= endPage; i++) {
      ret.push(i)
    }
    return ret
  }, [page, totalPages])
  return { page, setPage, pages, totalPages }
}

export default usePage