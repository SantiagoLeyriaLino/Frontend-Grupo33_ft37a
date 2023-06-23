'use client'
import { useSelector } from "react-redux"
import FilterBar from "@/components/FilterBar"
import ContainerProducts from "@/components/ContainerProducts"

export default function Search(){

    const productsSearch = useSelector((state)=>state.products.productsSearch)
    const nameSearch = useSelector((state)=>state.products.nameSearch)
    const render = useSelector((state)=>state.products.filterProducts)

    return(
        <main className="pt-[9rem] min-h-[100vh]">
        <section className="w-[70%] mx-[auto] flex py-[3rem]">
            
            {productsSearch&&productsSearch.length>0?<FilterBar products={productsSearch} name={nameSearch}/>:<p>loading...</p>}

            <div className="w-[80%]">
                {render&&render.length>0?<ContainerProducts products={render}/>:<p>loading...</p>}
            </div>
        </section>
    </main>
    )
}