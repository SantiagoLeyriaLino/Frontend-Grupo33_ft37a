'use client'
import UserMenu from "@/components/UserMenu"
import UserProfile from "@/components/UserProfile/UserProfile"
import { useState } from "react"

export default function ProfilePage(){
    const [view, setView] = useState('profile')

    function showView(view){
        if (view === 'profile')
            return <UserProfile/>
        else if (view === 'purchase_history')
            return <>PURCHASE HISTORY</>
    }

    return <main className='flex relative pt-[8.2rem] min-h-[90vh] min-w-[90vh]'>
            <UserMenu setView={setView}/>
        <div className="pl-[4rem]">
            {showView(view)}
        </div>
    </main>
}