'use client'
import FormProducts from "@/components/FormProducts/FormProducts"
import PurchaseHistory from "@/components/ProfileUser/PurchaseHistory"
import UserMenu from "@/components/UserMenu"
import UserProfile from "@/components/UserProfile/UserProfile"
import { useState } from "react"


export default function ProfilePage(){
    const [view, setView] = useState('profile')

    function showView(view){
        if (view === 'profile') return <UserProfile/>
        else if (view === 'purchase_history') return <PurchaseHistory/>
        else if (view === 'create') return <FormProducts/>
    }

    return <main className='flex relative pt-[8.2rem] min-h-[90vh] min-w-[90vh]'>
        <div className="w-[20%]">
            <UserMenu setView={setView} view={view}/>
        </div>
        <div className="w-[80%] min-h-[90vh] flex justify-center  pb-[4rem]">
            {showView(view)}
        </div>
    </main>
}