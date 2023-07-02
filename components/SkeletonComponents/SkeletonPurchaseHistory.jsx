import Skeleton from "react-loading-skeleton";

export default function SkeletonPurchaseHistory() {

    const array = [1,2,3,4,5]

    return (
        <table className="w-[100%] ">
            <thead>
                <tr>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] "><Skeleton className="animate-pulse transition-colors duration-300" height={30}/></th>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] "><Skeleton className="animate-pulse transition-colors duration-300" height={30}/></th>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] text-start "><Skeleton height={30}/></th>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] "><Skeleton className="animate-pulse transition-colors duration-300" height={30}/></th>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] "><Skeleton className="animate-pulse transition-colors duration-300" height={30}/></th>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] "><Skeleton className="animate-pulse transition-colors duration-300" height={30}/></th>
                    <th className=" px-[0.2rem] py-[0.2rem] border-[1px] "><Skeleton className="animate-pulse transition-colors duration-300" height={30}/></th>
                </tr>
            </thead>
            <tbody className="">

                {
                    array.map((array, index) => {
                        return (
                            <tr key={index} className="py-[1rem]">
                                <td className="w-[5%] text-center py-[1rem] font-light text-[0.5rem]">
                                        <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>
                                <td className="w-[20%] text-center py-[1rem]">
                                    <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>

                                <td className="text-start py-[1rem] font-light text-[0.7rem]">
                                        <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>


                                <td className="w-[5%] text-center py-[1rem] font-light text-[0.7rem]">
                                        <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>


                                <td className="w-[5%] text-center py-[1rem] font-light text-[0.7rem]">
                                        <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>


                                <td className="text-center py-[1rem] w-[5%] font-light text-[0.7rem]">
                                        <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>


                                <td className="w-[10%] text-center py-[1rem]">
                                    <Skeleton className="animate-pulse transition-colors duration-300" height={60}/>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    )
}