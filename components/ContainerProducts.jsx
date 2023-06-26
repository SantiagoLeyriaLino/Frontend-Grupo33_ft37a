'use client'
import ProductCard from "./ProductCard"
import SkeletonContainerProducts from "./SkeletonComponents/SkeletonContainerProducts"

export default function ContainerProducts({products}) {
    return (
        <div className="flex flex-wrap p-[2rem] justify-between gap-y-[2rem]">
            {
                products
                ?
                products.map((product)=>{
                    return(
                        <ProductCard
                        key={product._id}
                        product={product}
                        />
                    )
                })

                :
                <SkeletonContainerProducts/>
            }

        </div>
    )
}