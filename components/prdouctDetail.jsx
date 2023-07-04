'use client'
import axios from "axios";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import soldout from '../public/soldout.png'

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react"
import { addTotalPay } from "@/redux/Slice";
import Link from "next/link";
import SkeletonDetail from "./SkeletonComponents/SkeletonDetail";
import ContainerReviews from "./ContainerReviews";
import SizeSelected from "./productCard/SizeSelected";
import { useDispatch } from "react-redux";

export default function ProductDetail() {
    const router = useRouter()
    const dispatch= useDispatch()
    
    const [productDetail, setProductDetail] = useState([])
    const [currentImg, setCurrentImage] = useState("")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(true)
    const [sizeSelect,setSizeSelect] = useState("")
    const [cantSelect, setCantSelect] = useState()
    const [cart,setCart] = useState()

    const myUser = window.localStorage.getItem('user')
    const myUserParse = JSON.parse(myUser)

    const [refresh, setRefresh] = useState()

    
    const notify = (message) => {
        toast.success(message, {
            autoClose: 2000,
        });
    };
    
    const notifyError = (message) => toast.error(message);
    
    const path = usePathname()
    const idPath = path.split('/').pop()
    const [detail, setDetail] = useState({});
    const [ reviews, setReviews ] = useState([])
    const average = productDetail[0]?.rating || null
    const averageStars = '★'.repeat(parseInt(average)) + '☆'.repeat(5 - parseInt(average))
    
    const getDetail = async () => {
        const response = await axios(`https://backend-33ft37a-deploy.vercel.app/products/${idPath}`)
        const arrayProduct = response.data
        console.log(arrayProduct); //
        getReviews(arrayProduct[0])
        setProductDetail(arrayProduct)
        const imgBase = arrayProduct[0].images[0]
        setCurrentImage(arrayProduct[0]?.images[0])
        setLoading(false)
    }

    const handleSelect = (event) =>{
        console.log(event.target.value);
        setSizeSelect(event.target.value)
        setCantSelect({size:event.target.value,cant:1})
    }

    const getReviews = async (product)=> {
        const response = await axios.get(`https://backend-33ft37a-deploy.vercel.app/reviews/search?product=${product._id}`)
        setReviews(response.data)
    }

    const handleImgBase = (img) => {
        setCurrentImage(img)
    }

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const addMyCart = () => {
        const myCartLocal = localStorage.getItem('myCart')
        const myCart = JSON.parse(myCartLocal)
        if (Array.isArray(myCart)) {
            // Acceder a la propiedad .length
            const arrayLength = myCart.length;
            console.log(arrayLength);
          } else {
            console.log("El valor almacenado no es un array válido.");
          }          
          
        console.log(myCart.length);
        console.log(myCart);

        if(myCart.length === 0){
            console.log('entre');
            dispatch(addTotalPay(0))
            window.localStorage.setItem('myCart', JSON.stringify([{...productDetail[0],cantSelect:[cantSelect]}]))
        }
        else{
            const product = myCart.find(prod => prod._id === productDetail[0]._id)
            if (!product) {
                productDetail[0].cant = 1;
                const newCart = [...myCart, {...productDetail[0],cantSelect:[cantSelect]}]
                window.localStorage.setItem('myCart', JSON.stringify(newCart))
                notify('Add to Cart')
            } else {
                notifyError('Already added to cart')
            }
        }


    }

    const goBuy = () => {
        const myCartLocal = localStorage.getItem('myCart')
        const myCart = JSON.parse(myCartLocal)
        const product = myCart.find(prod => prod._id === productDetail[0]._id)
        if (!product) {
            productDetail[0].cant = 1;
            const newCart = [...myCart, productDetail[0]]
            localStorage.setItem('myCart', JSON.stringify(newCart))
            notify('Add to Cart')
        } else {
            notifyError('Already added to cart')
        }
        router.push('/checkout')
    }

    useEffect(() => {
        getDetail()
        const myCartLocal = localStorage.getItem('myCart')
        const myCart = JSON.parse(myCartLocal)
        setCart(myCart)
    }, [idPath, refresh])


    console.log(productDetail[0]);
    console.log(cart);
    return (
        <main className="min-h-[100vh] pt-[9rem]">
            {
                loading
                    ?
                    <SkeletonDetail />
                    :
                    <>
                    <section className="w-[70%] mx-[auto] flex justify-center pt-[1rem] pb-[4rem] gap-x-[3rem]">
                        <article className="w-[45%] flex justify-between gap-x-[1rem]">
                            <div className="w-[15%] flex flex-col gap-y-[1rem]">
                                {
                                    productDetail[0]?.images?.map((img, index) => {
                                        return (

                                            <Image
                                                className="cursor-pointer"
                                                onMouseEnter={() => { handleImgBase(img) }}
                                                key={index} src={img} alt="photo" width={500} height={500} />
                                        )
                                    })
                                }

                            </div>
                            <div className="relative w-[85%] overflow-hidden ">
                                <Image
                                    onMouseMove={handleMouseMove}
                                    style={{
                                        transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                                    }}
                                    className="w-full  object-cover hover:scale-150 transform transition-transform"
                                    src={currentImg} alt={`img`} width={1000} height={1000} />
                            </div>
                        </article>
                        <article className="w-[35%] flex flex-col gap-y-[2rem]">
                            <div className="w-[80%] mx-[auto]">
                                <div className="flex flex-col gap-y-[1rem]">
                                    <div>
                                        <h2 className="font-bold text-[1.4rem]">{productDetail[0]?.brand}</h2>
                                        <p>{productDetail[0]?.name}</p>
                                    </div>
                                    { average ? 
                                        <div className="flex gap-x-[0.4rem]">
                                            <h1 className="flex text-[1.5rem] text-blue-500 self-baseline"
                                            >{averageStars}</h1>
                                            <h1 className="flex text-[1rem] self-center"
                                            >({average})</h1>
                                        </div>
                                        : <></>
                                    }
                                    <div className="flex flex-col gap-y-[0.6rem]">
                                        <div>

                                            {/* <h2 className="font-bold text-[1.4rem]">$ {productDetail[0]?.price}</h2>
                                            {
                                                (!myUserParse?.data?.isAdmin)
                                                ?
                                                <span>ver cuotas</span>
                                                :
                                                <></>
                                            } */}

                                            <h2 className="font-bold text-[1.4rem]">{productDetail[0]?.price
                                            .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                            .replace(/\./g, '#').replace(/,/g, '.').replace(/#/g, ',')}</h2>
                                           

                                        </div>
                                    </div>
                                </div>
                                <h3>Talles</h3>
                                {
                                    (myUserParse?.data?.isAdmin)
                                    ?
                                    <div className=" p-[1rem] px-[2rem] rounded-[0.4rem] border-[#11111150] border-[1px]">
                                        {
                                            productDetail[0]?.size?.map((size,index)=>{
                                                return (
                                                    <div key={index} className="flex gap-x-[1rem]">
                                                        <span>{size.size}</span>
                                                        <span>Stock: {size.stock}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :

                                <select
                                    onChange={handleSelect}
                                    name="" id="" className="text-black p-[0.6rem] w-[100%] text-center">

                                    <option value="" selected disabled>Elegir talle</option>
                                    {
                                        productDetail[0]?.size?.map((size,index)=>{
                                            if(size.stock > 0 ){
                                                return(
                                                <option key={index} value={size.size}>
                                                    {size.size}</option>   
                                                )
                                            }else{
                                                return (
                                                    <option key={index} value=""disabled>
                                                    {size.size}</option>  
                                                )
                                            }
                                        })
                                    }
                                </select>
                                }

                                {
                                    (myUserParse?.data?.isAdmin)
                                    ?
                                    <></>
                                    :

                                    (productDetail[0]?.stock > 0)
                                        ?
                                        <div className="flex flex-col gap-y-[0.6rem] mt-[2rem]">
                                            {cantSelect
                                                ?
                                                <span
                                                    onClick={goBuy}
                                                    className="text-white p-[0.6rem] w-[100%] text-center bg-[#FA8B61] hover:bg-[#F8652A] font-bold cursor-pointer">Comprar</span>
                                                :
                                                <span
                                                className="text-white p-[0.6rem] w-[100%] text-center bg-[#11111180] font-bold cursor-default">Comprar</span> 
                                            }
                                                {
                                                    cantSelect
                                                    ?
                                                    <span
                                                        onClick={addMyCart}
                                                        className="text-[#F8652A] p-[0.6rem] w-[100%] text-center border-[1px] border-[#F8652A] cursor-pointer hover:bg-[#E9E9ED]">Agregar a carrito</span>
                                                        :
                                                        <span
                                                        className="text-[#11111180] p-[0.6rem] w-[100%] text-center border-[1px] border-[#11111180] cursor-default ">Agregar a carrito</span>
                                                }
                                            <span className="text-[#11111180] border-[1px] border-[#11111180]  p-[0.6rem] w-[100%] text-center bg-[#E9E9ED] cursor-pointer hover:text-black">♥ Agregar a favoritos</span>
                                        </div>

                                        :

                                        <div className="flex flex-col gap-y-[0.6rem] mt-[2rem]">
                                            <span className="text-white p-[0.6rem] w-[100%] text-center bg-red-400 font-bold cursor-default">Sold Out</span>
                                            <span 
                                            onClick={addMyCart}
                                            className="text-[#11111180] border-[1px] border-[#11111180]  p-[0.6rem] w-[100%] text-center bg-[#E9E9ED] cursor-pointer hover:text-black">♥ Agregar a favoritos</span>
                                        </div>
                                }
                            </div>
                            {
                                (productDetail[1]?.length > 0)
                                    ?
                                    <div className="w-[80%] flex flex-col gap-y-[1rem] mx-[auto]">
                                        <h3>Mas colores</h3>
                                        <div className="flex gap-x-[1rem]">

                                            {
                                                productDetail[1]?.map((img, index) => {
                                                    return (
                                                        <Link
                                                            className="w-[15%] hover:border-[1px] hover:border-[#F8652A]"
                                                            href={`/products/hombres/zapatillas/${img?._id}`} key={index}>
                                                            <Image
                                                                src={img?.images[0]} alt={img?.name} width={500} height={500} />
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    : <></>
                            }
                        </article>
                        <ToastContainer
                            position="bottom-left"
                            autoClose={2000}
                            theme="light" />
                    </section>
                    <section className="w-[70%] mx-[auto] flex flex-col justify-left pt-[1rem] pb-[4rem] gap-y-[0.5rem]">
                        <h1 className="text-[1.8rem]">Reviews: <strong>{productDetail[0]?.name}</strong></h1>
                        <ContainerReviews productId={productDetail[0]._id} reviews={reviews} setRefresh={setRefresh}/>
                    </section>
                    </>
            }
        </main>
    )
}