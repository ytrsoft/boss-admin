import React, { useContext, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { useRead } from '../../hooks/rest'
import { GlobalContext } from '../../hooks/useGlobal'
import { keys, values } from 'lodash';
import usePage from '../../hooks/usePage'

export interface DataTableProps {
  name: string
}

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
  const [number, setNumber] = useState<number>(0)
  const global: any = useContext(GlobalContext)
  const { data } = useRead(props.name, {
    page: number,
  })
  const { page, setPage, pages, totalPages } = usePage(data?.page || {})
  const setPageNum = (val: number) => {
    setPage(val)
    setNumber(val - 1)
  }
  return (
    <DefaultLayout>
      <div className="card pb-5 card-compact w-auto bg-base-100 shadow-xl">
      <div className="overflow-x-auto">
        <table className="table">
            <thead>
              <tr>
                {
                  values(global[props.name]).map((item: any) => {
                    return (
                      <th key={item}>{ item }</th>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                data?._embedded[props.name].map((item: any, index: number) => {
                  const _keys = keys(global[props.name])
                  return (
                    <tr key={index}>
                       {
                        _keys.map((k: string) => {
                          return (
                            <td key={item[k]}>
                              {/* <div className="tooltip" data-tip={item[k]}> */}
                                <div className="max-w-xs truncate">{ item[k] }</div>
                              {/* </div> */}
                            </td>
                          )
                        })
                       }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className="flex justify-end pr-5 mt-2">
            <div className="join">
            <button className="join-item btn" onClick={() => setPageNum(1)} disabled={totalPages === 0}>首页</button>
              <button className="join-item btn" onClick={() => setPageNum(page - 1)} disabled={page === 1}>上一页</button>
              {pages.map(p => (
                <button
                  key={p}
                  className={`join-item btn ${page === p ? 'btn-active' : ''}`}
                  onClick={() => setPageNum(p)}
                >
                  {p}
                </button>
              ))}
              <button className="join-item btn" onClick={() => setPageNum(page + 1)} disabled={page === totalPages}>下一页</button>
              <button className="join-item btn" onClick={() => setPageNum(totalPages)} disabled={totalPages === 0}>末页</button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DataTable;
