"use client"
import { use, useState, useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid';
// import { classNames } from './classNames'?

interface SelectProps {
    options: string[];
    value: string;
    onChange: (e: any) => void
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)

    const [id] = useState(uuidv4());
    useEffect(() => {
       function handOutsideClick(e: any){
        if(!e.target.closest(`Toogle-{id} `) && !e.target.closest(`#select-${id}`)){
            setOpen(false)
        }
       }
         document.addEventListener('mousedown', handOutsideClick)

         return () => {
             document.removeEventListener('mousedown', handOutsideClick)
         }
    }, [open])

    const opt = useMemo(() => {
       const OPTIONS = options.filter(o => o.toString().toLowerCase().indexOf(search.toString().toLowerCase()) !== -1)

       return OPTIONS.length > 0 ? OPTIONS.map((o, i) => (
           <div key={i} onClick={() => {
               onChange(o.toString())
               setOpen(false)
           }} className='px-3 py-1  text-neutral-600 hover:bg-neutral-300 cursor-pointer '>{o}</div>
       )) : [(
              <div key={'not-found'} className='px-2 py-1 cursor-pointer text-neutral-600'>No options found</div>
        
       )]
    }, [search, options])


    const val = useMemo(() => {
       setSearch(value)
    }, [value])
    return (
        <div
            id={`select-${id}`}
            className='relative flex flex-col items-center justify-center'
        >
            <div className='flex items-center justify-between divide-x divide-neutral-400 gap-1 border border-neutral-500 rounded-md overflow-hidden'>
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='outline-none px-2' placeholder='Search...' onFocus={() => setOpen(true)}/>
                <span className='relative p-4 cursor-pointer bg-gray-500' onClick={() => setOpen((p) => !p)} id={`Toggle-${id}`}>
                    <span
                        className={
                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[6px] border-1-transperent border-r-transperent border-b-0 border-t-neutral-900 transition-[transform] ' +
                            (open ? 'transform rotate-180' : 'transform rotate-0')
                        }
                    ></span>
                </span>
            </div>
            <div id='options' className={('absolute top-10 border border-neutral-400 w-full rounded-md overflow-auto transition-all' + (open ? 'max-h-40 border' : 'max-h-0 border-0'))}>
                {opt}
            </div>
        </div>
    )
}

export default Select