
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { useState, useEffect } from 'react'

const useDate = (): string => {
  const fmt = 'EEEE yyyy-MM-dd HH:mm:ss'
  const genValue = () => format(new Date(), fmt, { locale: zhCN })
  const [date, setDate] = useState(genValue())
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(genValue())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return date
}

export default useDate
