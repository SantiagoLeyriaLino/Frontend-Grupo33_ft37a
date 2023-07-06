'use client'
import Image from "next/image"
import editIcon from '../../public/editIcon.png'
import check from '../../public/check.png'
import { useState, useEffect } from "react"
import axios from "axios"
import { userSchema, emailSchema, phoneNumberSchema, dateSchema } from './validations'

export default function UserProfile(){

    const fields = [ 'Username', 'Email', 'Phone Number', 'Birthdate' ]

    const [ hover, setHover ] = useState(false)

    const [ userId, setUserId ]= useState(null)

    const [ data, setData ] = useState(null)
    const dataEntry = Object.entries(data ? { name: data.name, email: data.email,
        phoneNumber: data.phoneNumber, date: data.date} : {})
    const profileImage = data ? data.image[0] : {}

    const [ values, setValues ] = useState({ // values de los inputs
        name: '',
        email: '',
        phoneNumber: '',
        date: '',
        image: [],
        imageName: ''
    })
    
    const [ inputs, setInputs ] = useState({ // notifica la visibilidad de los 'input'
        name: false,
        email: false,
        phoneNumber: false,
        date: false,
        image: false
    })

    const [ errors, setErrors ] = useState({
        name:'',
        email: '',
        phoneNumber: '',
        date: '',
        image: ''
    })

    const [ refresh, setRefresh ] = useState({})        // refresca la pagina luego de que la peticion PUT sea exitosa

    
    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.data){
            setUserId(user.data._id)
        }
    })

    useEffect(()=> {        // pide la información del usuario con '_id' de localStorage
        if (userId){
            axios.get(`https://backend-33ft37a-deploy.vercel.app/users/${userId}`)
            .then((response)=> setData(response.data))
            setRefresh(false)
        }
    }, [refresh, userId])
    
    function submitChange(response, name) {        // cuando se resuelven los errores, se realiza el PUT
        let token = data.token
        axios.put(`https://backend-33ft37a-deploy.vercel.app/users/${data._id}`, response, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        .then((response)=>{
            setRefresh(response) // pide la información actualizada del usuario
            setErrors({...errors, [name]: ''}) // limpia los errors
            setValues({...values, [name]: ''}) // limpia el input
            setValues({ ...values, imageName: '' })
            setInputs({...inputs, [name]: !inputs[name]}) // esconde el input
        })
    }

    function handleOnClick(event){
        const { name } = event.target
        if (!inputs[name]) {        // si está oculto, muestra el input
            setInputs({...inputs, [name]: !inputs[name]})
        }
        const valueOrData = (values[name] || data[name]) // valida el estado 'values'. si está vacío, ingresa el valor de localStorage
        if (inputs[name]) {         // al ser true, el input esta visible y se requiere confirmar una edición
            switch (name){          // validación
                case 'name':
                    userSchema.validate({ name: valueOrData })
                    .then((response)=> submitChange(response, name),
                        (error)=> setErrors({...errors, [name]: error.message}))
                    break;
                case 'email':
                    emailSchema.validate({ email: valueOrData })
                    .then((response)=> submitChange(response, name),
                        (error)=> setErrors({...errors, [name]: error.message}))
                    break;
                case 'phoneNumber':
                    phoneNumberSchema.validate({ phoneNumber: valueOrData })
                    .then((response)=> submitChange(response, name),
                        (error)=> setErrors({...errors, [name]: error.message}))
                    break;
                case 'date':
                    dateSchema.validate({ date: valueOrData })
                    .then((response)=> {
                        response = response.date.toISOString().slice(0, 10)
                        submitChange({ date: response }, name)},
                        (error)=> setErrors({...errors, [name]: error.message}))
                    break;
                case 'image':
                    const formData = new FormData
                    formData.append('images', values.image)
                    submitChange(formData, name)
                default:
                    break;
            }
        }
    }

    function handleOnChange(event){
        const { value, name } = event.target
        if (name === 'images'){
            const { name } = document.getElementById('imageInput').files[0]
            const file = Array.from(event.target.files)
            setValues({...values, image: file[0], imageName: name })
            setInputs({...inputs, image: true})
        } else {
            setValues({...values, [name]: value})
        }
    }

    function handleMouse(event){
       const { type } = event
        if (type === 'mouseenter'){
            setHover(true)
        } else if (type === 'mouseleave'){
            setHover(false)
        }
    }

    function handleImageClick(){
        const imageInput = document.getElementById('imageInput')
        imageInput.click()
    }

    return <section className="m-[4rem] flex justify-center gap-x-[6rem]">
        <div className="flex flex-col gap-y-[1rem] items-center">
            <h1 className="text-4xl font-black leading-[3.5rem]">Account profile</h1>
            <div className='relative'
                onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
                <Image className='flex w-[250px] h-[250px] border-[1px] object-fill border-black border-[3px]' // imagen de perfil
                    src={profileImage} width={1000} height={1000} id={'imageViewer'} alt={'profile'}/>
                { hover ? 
                    <Image className="w-[25px] h-[25px] top-0 left-0 absolute cursor-pointer opacity-50" // boton edit
                        src={editIcon} alt={'username'} width={300} height={300} name={'edit'}
                        onClick={handleImageClick}/>
                    :
                    <></>}
                { inputs.image ? <>
                    <Image className="w-[18px] h-[18px] top-[10px] relative cursor-pointer opacity-50"
                        src={check} alt={'check'} width={300} height={300} // botón 'check image'
                        onClick={handleOnClick} name={'image'}/>
                    <label className="relative left-[2rem] bottom-[0.6rem]">{values.imageName}</label>
                    </>
                    :
                    <></> }
            </div>
        </div>
        <input className={`relative top-[2rem] hidden`}
            id={'imageInput'} type='file' name='images' onChange={handleOnChange}></input>
        <div className="flex flex-col gap-y-[1rem]  w-[250px]">

            { dataEntry?.map((prop, index)=>{ // mapea los datos, los inputs y los errors
                return (
                <div className="flex flex-col gap-y-[1rem]" key={index}>
                    <label
                    className="font-black">{fields[index]}</label>
                    <div className="flex flex-row relative w-full items-center ">
                        {
                            !inputs[prop[0]] ? <>
                                <Image className="w-[20px] h-[20px] absolute right-[100%] cursor-pointer opacity-50"
                                    src={editIcon} alt={'username'} width={300} height={300} // botón 'edit'
                                    onClick={handleOnClick} name={prop[0]}/>
                                <h2 className="w-full text-[1rem] py-[7.4px] pl-[0.4rem] ">{data ? dataEntry[index][1] : ''}</h2></>
                                : <>
                                <Image className="w-[20px] h-[20px] absolute right-[100%] cursor-pointer opacity-50"
                                    src={check} alt={'username'} width={300} height={300} // botón 'check'
                                    onClick={handleOnClick} name={prop[0]}/>
                                <input className="w-full border text-[1rem] pl-[0.4rem] py-[0.4rem]" value={values[prop[0]]}
                                    type={prop[0] === 'date' ? 'date': 'text'} placeholder={dataEntry[index][1]} name={prop[0]}
                                    onChange={handleOnChange}/>
                                <h3 className="text-red-500 text-[12px] absolute left-[18rem] w-[15rem]">{errors[prop[0]]}</h3></>
                        }
                    </div>
                </div>)
                })
            }
        </div>
    </section>
}