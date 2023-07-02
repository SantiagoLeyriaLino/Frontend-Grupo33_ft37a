import axios from "axios";
import { useState } from "react";
import { reviewSchema } from "./validations";

export default function ReviewPoster({ productId, userId }){
    const [ stars, setStars ] = useState(['☆', '☆', '☆', '☆', '☆'])
    const [ ratingStars, setRatingStars ] = useState(['☆', '☆', '☆', '☆', '☆'])
    const [ rating, setRating ] = useState(0)
    const [ error, setError ] = useState('')

    function handleMouseEnter(event){
        const { id } = event.target
        let newStars = []
        newStars = stars.map((star, index) =>
            parseInt(id[5]) >= index + 1 ? '★' : '☆')
        setStars(newStars)
    }

    function handleMouseLeave(){
        setStars(ratingStars)
    }

    function handleClick(event){
        const { id } = event.target

        if (id.includes('star')) {
            let newStars = []
            newStars = stars.map((star, index) =>
                parseInt(id[5]) >= index + 1 ? '★' : '☆')
            setRatingStars(newStars)
            setRating(parseInt(id[5]))
        } else if (id === 'review_post'){
            const { value } = document.getElementById('review')
            reviewSchema.validate({review: value, rating: rating})
            .then(response => {
                const formData = new FormData
                formData.append('UserID', userId)
                formData.append('ratings', response.rating)
                formData.append('comment', response.review)
                formData.append('ProductID', productId)
                axios.post('https://backend-33ft37a-deploy.vercel.app/reviews', formData)
                setError('')
            },
                error => setError(error.message))
        }
    }

    return <div className="flex flex-col border-[2px] border-blue-200 p-[1rem] rounded-xl gap-y-[0.8rem] w-[75%]">
        <div className="flex text-[1.4rem] gap-x-[0.5rem] cursor-pointer w-fit" onMouseLeave={handleMouseLeave}>
            <h1 onMouseEnter={handleMouseEnter} id='star_1'
            onClick={handleClick}>
                {stars[0]}</h1>
            <h1 onMouseEnter={handleMouseEnter} id='star_2'
            onClick={handleClick}>
                {stars[1]}</h1>
            <h1 onMouseEnter={handleMouseEnter} id='star_3'
            onClick={handleClick}>
                {stars[2]}</h1>
            <h1 onMouseEnter={handleMouseEnter} id='star_4'
            onClick={handleClick}>
                {stars[3]}</h1>
            <h1 onMouseEnter={handleMouseEnter} id='star_5'
            onClick={handleClick}>
                {stars[4]}</h1>
        </div>
        <input className="outline-none mb-[0.3rem] p-[0.4rem]"
        placeholder="Write a review ..." id="review"/>
        <div className="flex gap-x-[1rem]">
            <button id='review_post' className="w-[3.8rem] h-[1.8rem] text-white bg-blue-500"
            onClick={handleClick}
            >Post</button>
            <h1 className="flex self-center text-sm text-red-500">{error}</h1>
        </div>
    </div>   
}