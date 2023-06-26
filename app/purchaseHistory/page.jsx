'use client'
import { useState, useEffect } from "react"
import CardHistoryPurchase from "@/components/CardHistoryPurchase"
import axios from "axios"

export default function PurchaseHistory(){
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)

    const [getUser, setGetUser] = useState();
    const [localUser, setLocalUser] = useState();
    
    useEffect(()=>{
        const userId = user.data._id
        axios.get(`https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users/${userId}`)
        .then((response)=>setGetUser(response.data))
    },[])

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        user.data = getUser;
        localStorage.setItem('user', JSON.stringify(user));
        console.log({ESTEESELUSUARIOKAPO:getUser})
        setLocalUser(user)
    },[getUser])

    return( 
        <main className="flex flex-col pt-[9rem] min-h-[100vh] bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        {localUser && localUser.data && localUser.data.purchaseHistory ? (
            user.data.purchaseHistory.map((purchase, index) => {
            return (
                <div key={index}>
                <hr className="border-1 border-black" />
                <div>
                    <p>Date of purchase: {purchase.date}</p>
                    <p>Total amount: {purchase.amount}</p>
                    <hr />
                    <br className="w-full" />
                </div>
                <div className="flex">
                    {purchase.products.map((product, index) => {
                    if (index === 0) {
                        return (
                        <div key={index} className="ml-auto">
                            <CardHistoryPurchase
                            product={product.productId}
                            size={product.size}
                            cant={product.cant}
                            />
                        </div>
                        );
                    } else {
                        return (
                        <div key={index}>
                            <CardHistoryPurchase
                            product={product.productId}
                            size={product.size}
                            cant={product.cant}
                            />
                        </div>
                        );
                    }
                    })}
                </div>
                <hr className="border-1 border-black my-1" />
                <br className="w-full" />
                </div>
            );
            })
        ) : (
            <span>loading...</span>
        )}
        </main>
    )
}