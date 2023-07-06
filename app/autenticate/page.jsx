'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import axios from "axios";
import Swal from "sweetalert2";

import imageAlert from '../../public/regalos-39871.png'
import Image from "next/image"
// import confirm from '../../public/tiendajaja.jpg'
import confirm from '../../public/tiendaRopa2.jpg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Autenticate(){
    

    const notifyError = (message) => toast.error(message);

    const router = useRouter()

    const [user, setUser] = useState()

    useEffect(()=>{
        let userEmail =JSON.parse(localStorage.getItem('userEmail'));
        if(userEmail && userEmail.length>0){
        axios.get(`https://backend-33ft37a-deploy.vercel.app/users/auth/${userEmail}`)
        .then((response)=>{
            setUser(response.data)
        })}
    },[])

    useEffect(()=>{
        if(user && user.isActive){
            let token = user.token
            axios.put(`https://backend-33ft37a-deploy.vercel.app/users/${user._id}`,{validated:true}, {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            })
            .then((response)=>{
                localStorage.setItem('user',JSON.stringify({
                    data:response.data,
                    validated: true
                }))
                return Swal.fire({
                    title: 'Successful!',
                    text: 'Profile activation done',
                    icon: 'success',
                    confirmButtonText: 'Accept',
                  });
                })
                .then(() => {
                  return Swal.fire({
                    title: '¡I have a gift for you!',
                    text: '15% discount on any purchase you make, valid only once.',
                    imageUrl: 'https://www.opiniones.hosting/wp-content/uploads/2021/04/cupon-descuento.png',
                    imageAlt: 'imagen de un regalo',
                    confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Continue</a>',
                  });
                
            })
            .catch((err)=>{
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo completar la acción.',
                    icon: 'error',
                    confirmButtonText:'<a href="https://frontend-grupo33-ft37a.vercel.app/">Aceptar</a>'
                  });
            }) 
        }
    },[user])

    return(
        <div className="flex items-center justify-center h-screen">
            <Image src={confirm} alt="img" className="w-full h-full object-cover" />
        </div>
    )
}