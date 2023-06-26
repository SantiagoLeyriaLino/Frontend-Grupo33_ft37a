import Skeleton from "react-loading-skeleton"


export default function SkeletonDetail () {
        const box = [1, 2, 3, 4, 5]
        const color = [1,2,3,4]
    return (
        <section className="w-[70%] mx-[auto] flex justify-center pt-[1rem] pb-[4rem] gap-x-[3rem]">
                <article className="w-[45%] flex justify-between gap-x-[1rem]">
                    <div className="w-[15%] flex flex-col gap-y-[1rem]">
                        {
                            box.map((img, index) => {
                                return (

                                    <div key={index}><Skeleton className="h-[70px] animate-pulse transition-colors duration-300"/></div>
                                )
                            })
                        }
                    </div>

                    <div className="relative w-[85%] overflow-hidden ">
                        <Skeleton className="h-full animate-pulse transition-colors duration-300"/>
                    </div>
                </article>

                <article className="w-[35%] flex flex-col gap-y-[2rem]">
                    <div className="w-[80%] mx-[auto]">
                        <div className="flex flex-col gap-y-[1rem]">
                            <div>
                                <Skeleton className="w-[30%] h-[30px] animate-pulse transition-colors duration-300 "/>
                                <p><Skeleton className="w-[50%] h-[25px] animate-pulse transition-colors duration-300"/></p>
                            </div>

                            <div className="flex flex-col ">
                                <span><Skeleton className="w-[60%] h-[25px] animate-pulse transition-colors duration-300 "/></span>
                                <div>
                                    <h2 className="font-bold text-[1.4rem]"><Skeleton className="w-[50%] h-[30px] animate-pulse transition-colors duration-300"/></h2>
                                    <span><Skeleton className="w-[40%] h-[20px] animate-pulse transition-colors duration-300 "/></span>
                                </div>
                            </div>
                        </div>
                        <h3><Skeleton className="w-[20%] h-[20px] animate-pulse transition-colors duration-300"/></h3>
                        <span className=" w-[100%]"><Skeleton className="h-[40px] animate-pulse transition-colors duration-300"/></span>
                        <div className="flex flex-col gap-y-[0.6rem] mt-[2rem]">
                            <span className="text-white  w-[100%] "><Skeleton className="h-[40px] animate-pulse transition-colors duration-300"/></span>
                            <span className=" w-[100%] text-center "><Skeleton className="h-[40px] animate-pulse transition-colors duration-300"/></span>
                            <span className=" w-[100%] text-center "><Skeleton className="h-[40px] animate-pulse transition-colors duration-300"/></span>
                        </div>
                    </div>
                    <div className="w-[80%] flex flex-col gap-y-[1rem] mx-[auto]">
                        <h3><Skeleton className="w-[20%] animate-pulse transition-colors duration-300"/></h3>
                        <div className="flex gap-x-[1rem]">
                            {
                                color.map((img, index) => {
                                    return (
                                        <span className="w-[15%] hover:border-[1px]" key={index}><Skeleton className="h-[40px] animate-pulse transition-colors duration-300"/></span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </article>
            </section>

    )
}