'use client'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import FilterBar from "@/components/FilterBar"
import ContainerProducts from "@/components/ContainerProducts"
import { clearState } from "@/redux/Slice"
import Paginate from "@/components/Paginate/Paginate"

export default function Search(){

    const dispatch = useDispatch()

    useEffect(() => {
        return ()=>{
            dispatch(clearState())
        }
    },[])

    const productsSearch = useSelector((state)=>state.products.productsSearch)
    const nameSearch = useSelector((state)=>state.products.nameSearch)
    const render = useSelector((state)=>state.products.renderProducts)

    return(
        <main className="pt-[9rem] min-h-[100vh]">
        <section className="w-[70%] mx-[auto] flex py-[3rem]">
            
            {productsSearch&&productsSearch.length>0?<FilterBar products={productsSearch} name={nameSearch}/>:<p>loading...</p>}

            <div className="w-[80%] relative">
                <Paginate />
                <ContainerProducts products={render}/>
            </div>
        </section>
    </main>
    )
}