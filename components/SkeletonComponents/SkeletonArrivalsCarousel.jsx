import Skeleton from "react-loading-skeleton"
import styles from "../../app/globals.css"

export default function SkeletonArrivalsCarousel() {
    const skeletons = [1, 2, 3]
    return (<>
        {skeletons.map((index)=> {
            <div key={index} className="w-[30%] flex flex-col gap-y-[1rem]">
                <div className="w-[90%] mx-[auto] cursor-pointer">
                    <Skeleton  className="animate-pulse transition-colors duration-500" height={210} />
                </div>
                <div className="w-[90%] mx-[auto]">
                    <h2><Skeleton  className="animate-pulse transition-colors duration-300 " width={80}/></h2>
                    <p><Skeleton  className="animate-pulse transition-colors duration-300 " /></p>
                    <span><Skeleton  className=" animate-pulse transition-colors duration-300" width={100} /></span>
                </div>
            </div>
        })}
    </>)
}