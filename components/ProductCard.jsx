import Image from "next/image"
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import sold from "../public/soldout.png"
import { addNotifyCart, addTotalPay } from "@/redux/Slice";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import SizeSelected from "./productCard/SizeSelected";
import { useDispatch } from "react-redux";

import 'tippy.js/themes/light.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/light-border.css';


export default function ProductCard({ product }) {
    const average = product.rating || null
    const averageStars = '★'.repeat(parseInt(average)) + '☆'.repeat(5 - parseInt(average))

    const notify = (message) => {
        toast.success(message, {
            position:"bottom-left",
            autoClose: 2000,
        });
    };

    const notifyError = (message) => toast.error(message);

    const route = useRouter()
    const path = usePathname()
    const dispatch = useDispatch()


    const [toolTip, setTooltip] = useState({})
    const [cant, setCant] = useState(1)
    const [priceModify, setPriceModify] = useState(product.price)
    const [sizeCheck, setSizeCheck] = useState([])
    const [cantSelect,setCantSelect] = useState([{cant: 0, index: 0, size: ""}])
    
    const [sizes,setSize] = useState(0)

    const myUser = window.localStorage.getItem('user')
    const myUserParse = JSON.parse(myUser)

    // const [productos, setProductos] = useState([])

    const handleOnClick = (id) => {
        path.includes('/boy/pants') && route.push(`/products/boy/pants/${id}`)
        path.includes('/boy/shirt') && route.push(`/products/boy/shirt/${id}`)
        path.includes('/boy/shoes') && route.push(`/products/boy/shoes/${id}`)
        path.includes('/boy/sweatshirt') && route.push(`/products/boy/sweatshirt/${id}`)
        path.includes('/girl/pants') && route.push(`/products/girl/pants/${id}`)
        path.includes('/girl/shirt') && route.push(`/products/girl/shirt/${id}`)
        path.includes('/girl/shoes') && route.push(`/products/girl/shoes/${id}`)
        path.includes('/girl/sweatshirt') && route.push(`/products/girl/sweatshirt/${id}`)
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
        const myCartLocal = localStorage.getItem('myCart')
        const myCartParse = JSON.parse(myCartLocal)
        const productFind = myCartParse.find(prod => (prod._id === product._id) && (prod.cant === cant))
        if (!productFind) {
            if (myCartParse.length === 0) {
                dispatch(addTotalPay(0))
                const cantzero = cantSelect.shift()
                localStorage.setItem('myCart', JSON.stringify([{ ...product, cant: cant, cantSelect: cantSelect }]))
                notify('Add to Cart')
                dispatch(addNotifyCart())
            } else {
                const cantzero = cantSelect.shift()
                const productMyCart = { ...product, cant: cant, cantSelect:cantSelect }
                const sameProduct = myCartParse.find(prod => prod._id === product._id)
                if (!sameProduct) {
                    const myCart = [...myCartParse, productMyCart]
                    console.log(myCart);
                    localStorage.setItem('myCart', JSON.stringify(myCart))
                    notify('Add to Cart')
                    dispatch(addNotifyCart())
                } else {

                    console.log(sameProduct);
                    const arrayFilter = myCartParse.filter(prod => prod._id !== sameProduct._id)
                    const newArray = [...arrayFilter, productMyCart]
                    localStorage.setItem('myCart', JSON.stringify(newArray))
                    notify('Add to Cart')
                    dispatch(addNotifyCart())
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

    

    const handleCantSelected = (size) =>{
        console.log(size);
        if(cantSelect.length === 0){
            setCantSelect(size)
            }else{
                const sizeSelect = cantSelect.find(elem=> elem.size === size.size)
                if(!sizeSelect){
                    setCantSelect([...cantSelect,size])
                }
        
        else {
            const newArray = cantSelect.filter(elem=> elem.size !== size.size)
            const sumArray = [...newArray,size]
            setCantSelect(sumArray)
        }
       
            
        }
        
    }

    const handleResSelected = (size) =>{
        console.log(size);
        const newArray = cantSelect.filter(ele=> ele.size !== size)
        console.log(newArray);
        setCantSelect(newArray)
    }


    const handleSumActiveCart = (value) =>{
        setSize(sizes+1)
    }
    const handleResActiveCart = (value) =>{
        setSize(sizes-1)
    }

    useEffect(() => {
        console.log(myUserParse);
    }, [cant, sizeCheck,cantSelect])
    console.log(cantSelect);
    return (

        <Tippy
            interactive={true}
            placement="left"
            delay={100}
            theme="material"
            content={
                <div className="flex gap-x-[0.3rem] pb-[0.6rem] z-0 ">
                    {
                        (product?.sameCode?.length > 0)
                            ?
                            <div className="w-[40px] flex flex-col gap-y-[1rem]">
                                {
                                    product?.sameCode?.map((color, index) => {
                                        if (product?._id !== color?._id) {
                                            return (
                                                <div key={index} className="h-[60px]  bg-white flex items-center">
                                                    <Image
                                                    className=""    
                                                        src={color?.images[0]} alt={color?.name} width={200} height={400} />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            :
                            <></>
                    }

                    {/* <div className={`flex flex-col gap-y-[1rem] ${(product.sameCode.length > 0) ? 'w-[100%]' : 'w-[100%] mx-[auto]'}`}> */}
                    <div className={`flex flex-col gap-y-[1rem] w-[230px]`}>
                        <div className="relative">
                            <div className="bg-white w-[230px]">
                            <Image
                                className=" cursor-pointer h-[350px] object-contain w-full"
                                src={product?.images[0]} alt={product?.name} width={200} height={400} />
                            </div>
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
                            {/* {
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
                            } */}

                            <span

                                className="font-bold text-[#F8652A]">{(product.price * cant)
                                    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                    .replace(/\./g, '#').replace(/,/g, '.').replace(/#/g, ',')}</span>
                            {
                                product?.stock > 0
                                    ?
                                    myUserParse?.data?.isAdmin 
                                    ?
                                    <div className="flex flex-col gap-y-[0.2rem]">
                                        Size
                                        {
                                            product?.size?.map((size,index)=>{
                                                return (
                                                    <span key={index}>{size.size}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="flex flex-col gap-y-[0.2rem]">
                                        Size
                                        {
                                            product?.size?.map((size, index) => {
                                                return (
                                                    <SizeSelected 
                                                    key={index}
                                                    size={size.size}
                                                    stock={size.stock}
                                                    handleCantSelected={handleCantSelected}
                                                    handleResSelected={handleResSelected}
                                                    handleSumActiveCart={handleSumActiveCart}
                                                    handleResActiveCart={handleResActiveCart}
                                                    />
                                                    // <div key={index} className="flex items-center gap-x-[0.4rem]">
                                                    //     <input onChange={handleCheckSize} type="checkbox" name={index} value={size.size} id="" />
                                                    //     <span className="w-[16px]">{size.size}</span>

                                                    //     <div className={`${sizeCheck.includes(index) ? "opacity-1" : "opacity-0"} flex h-[fit-content] gap-x-[0.4rem]`}>
                                                    //         <span>Cant</span>
                                                    //         <div className="flex">
                                                    //             <div
                                                    //                 className="flex items-center justify-center bg-[#FA8B61] hover:bg-[#F8652A] px-[0.2rem] rounded-l-[0.6rem]  cursor-pointer"
                                                    //                 onClick={()=>{handleResCantSelect(index,size.size,size.stock)}}><span className="text-[0.7rem]">{`<`}</span></div>
                                                    //             <div className="flex items-center justify-center w-[20px] bg-white text-center  text-black ">
                                                    //                 <span className="text-[0.7rem]">{

                                                    //                 }</span>
                                                    //             </div>
                                                    //             <div
                                                    //                 className="flex items-center justify-center bg-[#FA8B61] hover:bg-[#F8652A] px-[0.2rem] rounded-r-[0.6rem] cursor-pointer"
                                                    //                 onClick={()=>{handleSumCantSelect(index,size.size,size.stock)}}><span className="text-[0.7rem]">{`>`}</span></div>
                                                    //         </div>
                                                    //     </div>

                                                    // </div>

                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <></>
                            }
                            {
                                (sizes > 0)
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
                className="w-[28%]  flex flex-col gap-y-[0.6rem] h-[450px] "
            >
                <div className="relative h-[70%] ">
                    <Image
                        className="w-[90%] h-[100%] object-contain mx-[auto] cursor-pointer"
                        src={product?.images[0]} alt={product?.name} width={400} height={400} />
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
                    <span className="font-bold">{product.price
                        .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                        .replace(/\./g, '#').replace(/,/g, '.').replace(/#/g, ',')}</span>
                    { product.rating !== 0 ?
                        <div className="flex gap-x-[0.4rem]">
                            <h1 className="flex text-[1.2rem] text-blue-500 self-baseline"
                            >{averageStars}</h1>
                            <h1 className="flex text-[0.7rem] self-baseline"
                            >({average})</h1>
                        </div>
                        : <></>
                    }
                </div>
                <ToastContainer
                    autoClose={2000}
                    theme="light" />
            </div>
        </Tippy>
    )
}