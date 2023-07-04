import Review from "./Review";
import ReviewPoster from "./ReviewPoster/ReviewPoster";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ContainerReviews({ reviews, productId, setRefresh}){
    const [ user, setUser ] = useState([])
    const [ showPost, setShowPost ] = useState(false)

    const showReviewPost = async ()=>{
        if (user && user._id) {
            for (const transaction of user.purchaseHistory){ // busca en las transacciones del usuario, hasta que algún producto adquirido coincida con el del detail
                const result = transaction.products.filter(product => product.productId._id === productId)
                if (result.length) {
                    const review = await axios.get(`https://backend-33ft37a-deploy.vercel.app/reviews/search?user=${user._id}&product=${productId}`) // busca si existe una review del producto hecha por el usuario
                    if (review.data.length) setShowPost(false)
                    else setShowPost(true)
                    break;
                }
            }
        }
    }

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.data){
            setUser(user.data)
        }
    }, [])

    useEffect(()=>{
        showReviewPost()
    }, [reviews])

    return <div className="flex flex-col gap-y-[2.2rem]">
        {reviews.length ?
            <div className="flex justify-between w-[80%]">
                <div className="flex gap-x-[0.5rem]">
                    <h1 className="flex text-[1rem] w-fit h-fit self-baseline"
                    >{'(' + reviews.length + ` review${reviews.length !== 1 ? 's' : ''})`}</h1>
                </div>
            </div>
            :
            <h1>No reviews for this product yet!</h1>
        }
        {
            showPost ?
            <ReviewPoster reviews={reviews} productId={productId} userId={user ? user._id : {}} 
                setRefresh={setRefresh}/>
            : <></>
        }
        {reviews.length ?
            <div className="flex flex-col gap-y-[0.8rem] content-center">
                {reviews.map((review)=> <Review data={review}/>)}
            </div> : <></>
        }
    </div>
}
