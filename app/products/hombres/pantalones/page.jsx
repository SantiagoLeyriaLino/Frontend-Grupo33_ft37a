'use client'
import ContainerProducts from "@/components/ContainerProducts"
import {useState, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProducts } from "@/redux/Slice"
import FilterBar from "@/components/FilterBar"
import Paginate from "@/components/Paginate/Paginate"
import SkeletonFilterBar from "@/components/SkeletonComponents/SkeletonFilterBar"
import SkeletonContainerProducts from "@/components/SkeletonComponents/SkeletonContainerProducts"

export default function HombresPantalonesPage() {

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.allProducts);
    const renderProducts = useSelector((state)=>state.products.renderProducts)
    const [products, setProducts] = useState([]);
    const [render, setRender] = useState([])
  
    useEffect(() => {
      dispatch(getProducts("male", "pants"));
    }, [dispatch]);
  
    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
          setProducts(allProducts);
        }
      }, [allProducts]);
    
      useEffect(() => {
        if (renderProducts && renderProducts.length > 0) {
            console.log({RENDER:renderProducts})
          setRender(renderProducts);
        }
      }, [renderProducts]);

    return (
      <main className="pt-[9rem] min-h-[100vh]">
      <section className="w-[70%] mx-[auto] flex py-[3rem]">

        {products && products.length > 0 ? <FilterBar products={products} gender={"male"} category={"pants"} /> : <SkeletonFilterBar />}

        <div className="w-[80%] relative">
          <Paginate />
          {render && render.length > 0 ? <ContainerProducts products={render} /> : <SkeletonContainerProducts />}
        </div>
      </section>
    </main>
)
}