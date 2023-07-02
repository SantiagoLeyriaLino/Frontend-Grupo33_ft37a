'use client'
import { useState, useEffect } from "react"
import CardHistoryPurchase from "@/components/CardHistoryPurchase"
import SkeletonPurchaseHistory from "@/components/SkeletonComponents/SkeletonPurchaseHistory"
import axios from "axios"
import Image from "next/image"

export default function PurchaseHistory() {
    // const user = JSON.parse(window.localStorage.getItem('user'))
    // console.log(user)

    const [user, setUser] = useState()
    const [getUser, setGetUser] = useState();
    const [localUser, setLocalUser] = useState();
    const [imgProducts, setImgProducts] = useState([]);

    useEffect(() => {
        const userLocal = JSON.parse(window.localStorage.getItem('user'))
        console.log(userLocal);
        if (userLocal) {
            setUser(userLocal)
        }
        console.log(user);
    }, [])

    const addGetUser = async (userId) => {
        const response = await axios.get(`https://backend-33ft37a-deploy.vercel.app/users/${userId}`)
        console.log(response.data);
        setGetUser(response.data)
    }

    useEffect(() => {
        console.log(user);
        if (user && user.data) {
            addGetUser(user.data._id)
            // axios.get(`https://backend-33ft37a-deploy.vercel.app/users/${userId}`)
            // .then((response)=>setGetUser(response.data))
        }
    }, [user])

    useEffect(() => {
        if (getUser) {

            user.data = getUser;
            localStorage.setItem('user', JSON.stringify(user));
            console.log({ ESTEESELUSUARIOKAPO: getUser })
            setLocalUser(user)

        }
    }, [getUser, user, localUser])


    console.log(localUser);

    return (
        <main className="flex  pt-[9rem] min-h-[100vh] bg-gray-100  rounded-lg shadow-md w-full">
            <div className="w-[20%] bg-white"></div>
            <div className="w-[80%] p-[2rem]">

                {
                    (localUser && localUser?.data && localUser?.data?.purchaseHistory)
                        ?
                        (

                            <table className="w-[100%] ">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-[1px] ">id_transaction</th>
                                        <th className="py-2 px-4 border-[1px] ">img_product</th>
                                        <th className="py-2 px-4 border-[1px] text-start ">Description</th>
                                        <th className="py-2 px-4 border-[1px] ">Price</th>
                                        <th className="py-2 px-4 border-[1px] ">cant</th>
                                        <th className="py-2 px-4 border-[1px] ">date</th>
                                        <th className="py-2 px-4 border-[1px] ">ammount</th>
                                    </tr>
                                </thead>
                                <tbody className="">

                                {
                                    user?.data?.purchaseHistory?.map((purchase, index) => {
                                        return (
                                            // <div key={index} className="flex">
                                            //     <div className="flex">
                                            //         {purchase?.products?.map((product, index) => {
                                            //             return (
                                            //                 <div key={index} className="ml-auto">
                                            //                     <CardHistoryPurchase
                                            //                         product={product.productId}
                                            //                         size={product.size}
                                            //                         cant={product.cant}
                                            //                     />
                                            //                 </div>
                                            //             );
                                            //         })}
                                            //     </div>
                                            //     <hr className="border-1 border-black" />
                                            //     <div>
                                            //         <p>Date of purchase: {purchase.date}</p>
                                            //         <p>Total amount: {purchase.amount}</p>
                                            //         <hr />
                                            //         <br className="w-full" />
                                            //     </div>
                                            //     <hr className="border-1 border-black my-1" />
                                            //     <br className="w-full" />
                                            // </div>
                                            <tr key={index} className="py-[1rem]">
                                                <td className="w-[5%] text-center py-[1rem] font-light text-[0.5rem]">
                                                    <div>
                                                        <h2>{purchase._id}</h2>
                                                    </div>
                                                </td>
                                                <td className="w-[20%] text-center py-[1rem]">
                                                    <div className="flex gap-x-[0.4rem]">
                                                    {
                                                        purchase?.products.map((product,index)=>{
                                                            
                                                            return(
                                                                <div  key={index} className="relative w-[20%]">
                                                                    {/* <span className="absolute">{`size ${product.size}`}</span> */}
                                                                    <Image
                                                                        className="w-[100%] mx-[auto] "
                                                                        src={product?.productId?.images[0]} alt="img" width={200} height={200} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    {/* <Image
                                                        className="w-[50%] mx-[auto] "
                                                        src={purchase?.products[0]?.productId?.images[0]} alt="img" width={200} height={200} /> */}
                                                </td>
                                                <td className="text-start py-[1rem] font-light text-[0.7rem]">
                                                <div>
                                                    {
                                                        purchase?.products.map((product,index)=>{
                                                            return(
                                                                <h2 key={index}>{`${product?.productId?.name} - size ${product?.size}`}</h2>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    
                                                    
                                                </td>
                                                <td className="w-[5%] text-center py-[1rem] font-light text-[0.7rem]">
                                                    <div>
                                                        {
                                                            purchase?.products.map((product,index) =>{
                                                                return (
                                                                    <h2 key={index}>{`$${product?.productId?.price.toFixed(2)}`}</h2>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                </td>
                                                <td className="w-[5%] text-center py-[1rem] font-light text-[0.7rem]">
                                                    <div>
                                                        {
                                                            purchase?.products.map((product,index) =>{
                                                                return (
                                                                    <h2 key={index}>{`${product?.cant}`}</h2>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                </td>
                                                <td className="text-center py-[1rem] w-[5%] font-light text-[0.7rem]">
                                                    <span>{purchase?.date}</span>
                                                </td>
                                                <td className="w-[10%] text-center py-[1rem]">
                                                    <span>$ {purchase?.amount.toFixed(2)}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
            ) :
            <SkeletonPurchaseHistory/>
}
        </div>
        </main >
    )
}