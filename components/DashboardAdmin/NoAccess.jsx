'use client'
import { useEffect } from "react"
import Swal from "sweetalert2"

export default function NoAccess (){
    useEffect(()=>{
        Swal.fire({
            title: 'Access denied!',
            text: 'You do not have permission to enter this view',
            icon: 'error',
            confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">continue</a>',
            // footer: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Go login?</a>'
        })
    },[])
    return (
        <main>
            
        </main>
    )
}