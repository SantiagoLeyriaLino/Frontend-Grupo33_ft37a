import Image from "next/image"
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import sold from "../public/soldout.png"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function ProductCard({ product }) {

    const notify = (message) => {
        toast.success(message, {
            autoClose: 2000,
        });
    };

    const notifyError = (message) => toast.error(message);

    const route = useRouter()
    const path = usePathname()


    const [toolTip, setTooltip] = useState({})
    const [cant, setCant] = useState(1)
    const [priceModify, setPriceModify] = useState(product.price)
    const [sizeCheck, setSizeCheck] = useState([])

    // const [productos, setProductos] = useState([])

    const handleOnClick = (id) => {
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
        path.includes('/search') && route.push(`/search/${id}`)
    }

    const addMyCart = () => {
        console.log(product.cant);
        const myCartLocal = window.localStorage.getItem('myCart')||""
        const myCartParse = JSON.parse(myCartLocal)
        const productFind = myCartParse.find(prod => (prod._id === product._id) && (prod.cant === cant))
        if (!productFind) {
            if (myCartParse.length === 0) {
                window.localStorage.setItem('myCart', JSON.stringify([{ ...product, cant: cant }]))
                notify('Add to Cart')
            } else {
                const productMyCart = { ...product, cant: cant }
                const sameProduct = myCartParse.find(prod => prod._id === product._id)
                if (!sameProduct) {
                    const myCart = [...myCartParse, productMyCart]
                    console.log(myCart);
                    window.localStorage.setItem('myCart', JSON.stringify(myCart))
                    notify('Add to Cart')
                } else {

                    console.log(sameProduct);
                    const arrayFilter = myCartParse.filter(prod => prod._id !== sameProduct._id)
                    const newArray = [...arrayFilter, productMyCart]
                    window.localStorage.setItem('myCart', JSON.stringify(newArray))
                    notify('Add to Cart')
                }
            }

        } else {
            notifyError('Already added to cart')
        }

    }

    const resCant = () => {
        if (cant > 1) {
            setCant(cant - 1)
        }
    }

    const sumCant = () => {
        setCant(cant + 1)

    }

    const handleCheckSize = (event) => {
        const { checked, name } = event.target
        const index = parseInt(name)
        if (checked) {
            setSizeCheck([...sizeCheck, index]);
        } else {
            const newArray = sizeCheck.filter(size => size !== index)
            setSizeCheck(newArray);
        }
    }
    console.log(sizeCheck);

    useEffect(() => {

        // setTooltip(product)
    }, [cant, sizeCheck])

    // const handlePrice = () =>{

    //     setPriceModify(priceModify * cant)
    // }

    return (

        <Tippy
            interactive={true}
            placement="left"
            content={
                <div className="flex gap-x-[1rem] py-[1rem] z-0">
                    {
                        (product?.sameCode?.length > 0)
                            ?
                            <div className="w-[20%] flex flex-col gap-y-[1rem]">
                                {
                                    product?.sameCode?.map((color, index) => {
                                        if (product?._id !== color?._id) {
                                            return (
                                                <Image
                                                    key={index}
                                                    src={color?.images[0]} alt={color?.name} width={200} height={400} />
                                            )
                                        }
                                    })
                                }
                            </div>
                            :
                            <></>
                    }

                    <div className={`flex flex-col gap-y-[1rem] ${(product.sameCode.length > 0) ? 'w-[70%]' : 'w-[90%] mx-[auto]'}`}>
                        <div className="relative">
                            <Image
                                className="w-[100%] cursor-pointer"
                                src={product?.images[0]} alt={product?.name} width={200} height={400} />
                            {
                                (product?.stock === 0)
                                    ?
                                    <Image src={sold} alt="sold-out" width={200} height={200} className="absolute top-[10px] left-[10px] w-[45%]" />
                                    :
                                    <></>
                            }
                        </div>

                        <div className="w-[90%] mx-[auto] flex flex-col gap-y-[0.6rem]" >
                            <h2 className="font-bold">{product?.brand}</h2>
                            <p>{product?.name}</p>
                            {
                                (product?.stock > 0)
                                    ?
                                    <div className="flex gap-x-[1rem]">
                                        <span>Cant</span>
                                        <div className="flex">
                                            <span
                                                className="bg-[#FA8B61] hover:bg-[#F8652A] px-[0.6rem] rounded-l-[0.4rem]  cursor-pointer"
                                                onClick={resCant}>{`<`}</span>
                                            <span

                                                className="w-[30px] bg-white text-center text-black ">{cant}</span>
                                            <span
                                                className="bg-[#FA8B61] hover:bg-[#F8652A] px-[0.6rem] rounded-r-[0.4rem] cursor-pointer"
                                                onClick={sumCant}>{`>`}</span>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }

                            <span

                                className="font-bold text-[#F8652A]">$ {product.price * cant}</span>
                            {
                                product?.stock > 0
                                    ?
                                    <div className="flex flex-col gap-y-[0.2rem]">
                                        Size
                                        {
                                            product?.size?.map((size, index) => {
                                                return (
                                                    <div key={index} className="flex items-center gap-x-[0.4rem]">
                                                        <input onChange={handleCheckSize} type="checkbox" name={index} id="" />
                                                        <span className="w-[16px]">{size.size}</span>

                                                        <div className={`${sizeCheck.includes(index) ? "opacity-1" : "opacity-0"} flex h-[fit-content] gap-x-[0.4rem]`}>
                                                            <span>Cant</span>
                                                            <div className="flex">
                                                                <div
                                                                    className="flex items-center justify-center bg-[#FA8B61] hover:bg-[#F8652A] px-[0.2rem] rounded-l-[0.6rem]  cursor-pointer"
                                                                    onClick={resCant}><span className="text-[0.7rem]">{`<`}</span></div>
                                                                <div className="flex items-center justify-center w-[20px] bg-white text-center  text-black ">
                                                                    <span className="text-[0.7rem]">{cant}</span>
                                                                </div>
                                                                <div
                                                                    className="flex items-center justify-center bg-[#FA8B61] hover:bg-[#F8652A] px-[0.2rem] rounded-r-[0.6rem] cursor-pointer"
                                                                    onClick={sumCant}><span className="text-[0.7rem]">{`>`}</span></div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <></>
                            }
                            {
                                ((product?.stock > 0) && (sizeCheck.length > 0))
                                    ?
                                    <span
                                        onClick={addMyCart}
                                        className="cursor-pointer w-[100%] py-[0.6rem] text-center bg-[white] text-black rounded-[0.6rem] hover:bg-[#F8652A] hover:text-white">Añadir a carrito</span>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            }
        >
            <div
                onClick={() => { handleOnClick(product?._id) }}
                className="w-[28%]  flex flex-col gap-y-[0.6rem] h-[340px] "
            >
                <div className="relative h-[70%] ">
                    <Image
                        className="w-[90%] h-[100%] object-cover mx-[auto] cursor-pointer"
                        src={product?.images[0]} alt={product?.name} width={200} height={400} />
                    {
                        (product?.stock === 0)
                            ?
                            <Image src={sold} alt="sold-out" width={200} height={200} className="absolute top-[10px] left-[15px] w-[45%]" />
                            :
                            <></>
                    }
                </div>
                <div className="w-[90%] mx-[auto] h-[30%]">
                    <h2 className="font-bold">{product?.brand}</h2>
                    <p>{product?.name}</p>
                    <span className="font-bold">$ {product.price}</span>
                </div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={2000}
                    theme="light" />
            </div>
        </Tippy>
    )
}