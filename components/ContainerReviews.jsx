import Review from "./Review";
import ReviewPoster from "./ReviewPoster/ReviewPoster";
import { useEffect, useState } from "react";

export default function ContainerReviews({ reviews, productId }){
    const average = reviews.length ? 
        (reviews.reduce((acc, review) => acc + +(review.ratings), 0) / reviews.length).toFixed(1) : 0
    const averageStars = '★'.repeat(parseInt(average)) + '☆'.repeat(5 - parseInt(average))
    const [ user, setUser ] = useState()

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.data){
            setUser(user.data)
        }
    }, [])

    return <div className="flex flex-col gap-y-[2.2rem]">
        {reviews.length ?
            <div className="flex justify-between w-[80%]">
                <div className="flex gap-x-[0.5rem]">
                    <h1 className="flex text-[3.8rem] text-yellow-500 self-baseline"
                    >{average}</h1>
                    <h1 className="flex text-[1.5rem] text-yellow-500 self-baseline"
                    >{averageStars}</h1>
                    <h1 className="flex text-[1rem] w-fit h-fit self-baseline"
                    >{'(' + reviews.length + ' reviews)'}</h1>
                </div>
            </div>
            :
            <h1>No reviews for this product yet!</h1>
        }
        <ReviewPoster productId={productId} userId={user ? user._id : {}}/> {/* falta validar la entrega del producto para postear la review*/}
        {reviews.length ?
            <div className="flex flex-col gap-y-[0.8rem] content-center">
                {reviews.map((review,index)=> <Review data={review} key={index}/>)}
            </div> : <></>
        }
    </div>
}