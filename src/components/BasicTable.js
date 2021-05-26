import React from 'react'
import { useMemo, useEffect, useState} from 'react'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {COLUMNS} from './columns'
import { GlobalFilter } from './GlobalFilter'

import './table.css'

export const BasicTable = () => {


    const columns= useMemo(()=>COLUMNS,[])
    

    const [data, setData] =useState([]);

    


    useEffect(()=> {

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(result=>setData(result))
        .catch(error=>console.log(error));
    },[])

    
    


    const tableInstance = useTable({

        columns,
        
        data,


    }, useGlobalFilter, useSortBy, usePagination
    )

   

    const{ 

        getTableProps,
        headerGroups,
        page,
        

        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter
    }= tableInstance

    const {globalFilter}=state

    const {pageIndex}=state

    return (

        <>

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <table {...getTableProps()}>

            <thead>

                {headerGroups.map((headerGroup)=>(

                    <tr {...headerGroup.getHeaderGroupProps()}>

                        {headerGroup.headers.map((column)=>(

                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                            <span>

                                {column.isSorted?(column.isSortedDesc?'<':'>'):''}
                            </span>
                            
                            
                            
                            
                            
                            </th>
                        ))


                        }
                    </tr>

                ))}
            </thead>

            <tbody {...getTableProps()}>

                {page.map((row)=>{

                    prepareRow(row)

                    return(

                        <tr {...row.getRowProps()}>

                            {row.cells.map((cell)=>{

                                return <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            })}
                        </tr>

                    )


                })}

                
            </tbody>
        </table>

        <div>
            <span>
                Page{' '}

                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>

            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
        </div>
        </>

        


        
    )

    
}