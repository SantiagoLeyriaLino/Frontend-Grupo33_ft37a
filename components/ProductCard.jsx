import Image from "next/image"
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function ProductCard({ product }) {

    const route = useRouter()
    const path = usePathname()

    const [toolTip, setTooltip] = useState({
        
    })
    
    // const [productos, setProductos] = useState([])

    const handleOnClick =(id) =>{
        path.includes('/children/pants') && route.push(`/products/children/pants/${id}`)
        path.includes('/children/shirt') && route.push(`/products/children/shirt/${id}`)
        path.includes('/children/shoes') && route.push(`/products/children/shoes/${id}`)
        path.includes('/children/sweatshirt') && route.push(`/products/children/sweatshirt/${id}`)
        path.includes('/female/hoodie') && route.push(`/products/female/hoodie/${id}`)
        path.includes('/female/pants') && route.push(`/products/female/pants/${id}`)
        path.includes('/female/shoes') && route.push(`/products/female/shoes/${id}`)
        path.includes('/female/t-shirt') && route.push(`/products/female/t-shirt/${id}`)
        path.includes('/hombres/buzos') && route.push(`/products/hombres/buzos/${id}`)
        path.includes('/hombres/pantalones') && route.push(`/products/hombres/pantalones/${id}`)
        path.includes('/hombres/remeras') && route.push(`/products/hombres/remeras/${id}`)
        path.includes('/hombres/zapatillas') && route.push(`/products/hombres/zapatillas/${id}`)
    }

    useEffect(()=>{
        setTooltip(product)
    },[])

    return (

        <Tippy
            interactive={true}
            placement="left"
            content={
                <div className="flex gap-x-[1rem] py-[1rem] z-0">
                    <div className="w-[20%] flex flex-col gap-y-[1rem]">
                        {
                            product?.sameCode?.map((color, index) => {
                                return (
                                    <Image
                                        key={index}
                                        src={color?.images[0]} alt={color?.name} width={200} height={400} />
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col gap-y-[1rem] w-[70%]">
                        <Image
                            className="w-[100%] cursor-pointer"
                            src={product?.images[0]} alt={product?.name} width={200} height={400} />
                        <div className="w-[90%] mx-[auto] flex flex-col gap-y-[0.6rem]" >
                            <h2 className="font-bold">{product?.brand}</h2>
                            <p>{product?.name}</p>
                            <span className="font-bold">$ {product.price}</span>
                            {/* <select
                                name="" id="" className="text-black p-[0.6rem] rounded-[0.6rem]">
                                <option value="" disabled>Elegir talle</option>
                                {
                                    product?.size?.map((elemento,index)=>{
                                        return (
                                            <option key={index} value="">{elemento}</option>
                                        )
                                    })
                                }
                                
                            </select> */}
                            <span className="w-[100%] py-[0.6rem] text-center bg-[white] text-black rounded-[0.6rem]">Añadir a carrito</span>
                        </div>
                    </div>
                </div>
            }
            >
            <div
                onClick={() => { handleOnClick(product?._id) }}
                className="w-[30%] flex flex-col gap-y-[1rem]"
            >
                <Image
                    className="w-[90%] mx-[auto] cursor-pointer"
                    src={product?.images[0]} alt={product?.name} width={200} height={400} />
                <div className="w-[90%] mx-[auto]">
                    <h2 className="font-bold">{product?.brand}</h2>
                    <p>{product?.name}</p>
                    <span className="font-bold">$ {product.price}</span>
                </div>

            </div>
        </Tippy>
    )
}