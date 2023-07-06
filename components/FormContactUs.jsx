'use client'
import { useState, useEffect } from "react"
import axios from "axios"

export default function FormContactUs(){

    const [dataForm, setDataForm] = useState({
		name:"",
		email:"",
		message:""
	})

	useEffect(()=>{
		console.log(dataForm)
	},[dataForm])

	const onChange = (e) =>{
		setDataForm({ ...dataForm, [e.target.name]: e.target.value });
	}

    const handleSubmit = (event) =>{
		event.preventDefault()
		axios.post('https://backend-33ft37a-deploy.vercel.app/contactUs', dataForm)
		.then((response)=>{
			alert("sended message")
            setDataForm({
                name:"",
                email:"",
                message:""
            })
		})
	  }

    return(
        <form>
        <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-black">name:</label>
            <input
            type="text"
            id="name"
            value={dataForm.name}
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder='Name'
            onChange={onChange}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-black">Email:</label>
            <input
            type="e-mail"
            id="email"
            value={dataForm.email}
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder='E-mail'
            onChange={onChange}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-black">Message:</label>
            <textarea
                id="message"
                name="message"
                rows="4"
                value={dataForm.message} 
                className="w-full p-2 border border-gray-300 rounded-md text-black" 
                placeholder='Message'
                onChange={onChange}
            />
            </div>
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
        >
            Send
        </button>
        </form>
    )
}