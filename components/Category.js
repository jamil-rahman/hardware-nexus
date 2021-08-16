import React, {useState,useEffect} from 'react'
import { filtering } from '../utils/filtering'
import { getData } from '../utils/fetchData'
import { useRouter } from 'next/router'
import Items from '../models/itemModel'


export default function Category() {
    // const [title, setTitle] = useState("")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    

    const handleSort = (e) => {
        setSort(e.target.value)
        filtering({router, sort: e.target.value})
    }

    useEffect(() => {
        filtering({router, search: search ? search.toLowerCase() : 'all'})
    },[search])


    const router = useRouter()
    return (
        <div className="input-group">

            <form autoComplete="off" className="mt-2 col-md-8 px-0">
               
                <input type="text" className="form-control" list="title_product"
                placeholder="Try 'CPU, GPU, Ryzen, GTX 1660'"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            </form>


            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="custom-select text-capitalize"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Newest</option>
                     <option value="-price">Price: High-Low</option>
                     <option value="price">Price: Low-High</option>
                     <option value="brand">Brand</option>

                </select>
            </div>

        
        </div>
    )
}
