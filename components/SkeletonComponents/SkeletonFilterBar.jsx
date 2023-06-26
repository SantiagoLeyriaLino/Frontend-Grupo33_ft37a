import Skeleton from "react-loading-skeleton"

export default function SkeletonFilterBar() {

    const box = [1, 2, 3, 4, 5]
    return (
        <div className="w-[20%]">


            <article className="w-[100%]  p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="w-[50%]"><Skeleton className=" animate-pulse transition-colors duration-300" height={20} /></h3>
                <span className="w-[100%] "><Skeleton className=" animate-pulse transition-colors duration-300" height={35} /></span>

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                    {
                        box.map((box, index) => {
                            return (
                                <div key={index} style={{ display: 'flex' }} className="w-[35%]">
                                    <Skeleton className=" animate-pulse transition-colors duration-300 w-[20%]" containerClassName="flex-1" width={25}/>
                                    <Skeleton className=" animate-pulse transition-colors duration-300 w-[80%]" containerClassName="flex-1 "  />
                                </div>
                            )
                        })
                    }
                </div>
            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="w-[50%]"><Skeleton  className=" animate-pulse transition-colors duration-300" height={20} /></h3>
                <span className="w-[100%] "><Skeleton className=" animate-pulse transition-colors duration-300"  height={35} /></span>

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                    {
                        box.map((box, index) => {
                            return (
                                <div key={index} style={{ display: 'flex' }} className="w-[35%]">
                                    <Skeleton className=" animate-pulse transition-colors duration-300 w-[20%]" containerClassName="flex-1" width={25}/>
                                    <Skeleton className=" animate-pulse transition-colors duration-300 w-[80%]" containerClassName="flex-1 "  />
                                </div>
                            )
                        })
                    }
                </div>
            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
            <h3 className="w-[50%]"><Skeleton  className=" animate-pulse transition-colors duration-300" height={20} /></h3>
                <span className="w-[100%]"><Skeleton className=" animate-pulse transition-colors duration-300"/></span>
                <span><Skeleton className=" animate-pulse transition-colors duration-300" width={20}/></span>

            </article>

        </div>
    )
}