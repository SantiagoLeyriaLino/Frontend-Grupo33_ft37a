import Image from "next/image"
import axios from "axios"
import { useState, useEffect } from "react"

export default function Review({ data }){
    const { UserID, ratings, comment, StoreID, ProductID } = data
    const stars = '★'.repeat(+ratings) + '☆'.repeat(5 - +ratings)

    const [ user, setUser ] = useState([])

    useEffect(()=>{
        axios.get(`https://backend-33ft37a-deploy.vercel.app/users/${UserID}`)
        .then(response => {
            setUser(response.data)
        })
    }, [])
    
    return <div className="flex flex-col border p-[1rem] rounded-xl gap-y-[0.8rem] w-[75%]">
        { user && user._id ? <>
            <div className="flex flex-row gap-x-[1rem]">
                <Image className="w-[3rem] h-[3rem] rounded-full" alt='image'
                src={user.image[0]} width={400} height={400}/>
                <div className="flex flex-col">
                    <h1>{user.name}</h1>
                    <div>{stars}</div>
                </div>
            </div>
            <div>
                <p className="p-[0.5rem]">{comment}</p>
            </div>
            </>
        :
        <></>
        }
    </div>
}