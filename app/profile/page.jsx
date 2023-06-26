'use client'
import Image from "next/image"
import editIcon from '../../public/editIcon.png'
import check from '../../public/check.png'
import { useState, useEffect } from "react"
import axios from "axios"
import { userSchema, emailSchema, phoneNumberSchema, dateSchema } from './validations'

export default function ProfilePage() {
    if (typeof localStorage !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('user'));
        const fields = ['Nombre de usuario', 'Correo electrónico', 'Teléfono', 'Fecha de nacimiento'];
        const { _id, name, email, phoneNumber, date } = user.data;
        const lsDataEntry = Object.entries({ name, email, phoneNumber, date });

        const [hover, setHover] = useState(false);
        const [image, setImage] = useState([]);
        const [data, setData] = useState(null);
        const dataEntry = Object.entries(data ? { name: data.name, email: data.email, phoneNumber: data.phoneNumber, date: data.date } : {});
        const profileImage = data ? data.image : {};
        const [values, setValues] = useState({ name: '', email: '', phoneNumber: '', date: '' });
        const [inputs, setInputs] = useState({ name: false, email: false, phoneNumber: false, date: false, image: false });
        const [errors, setErrors] = useState({ name: '', email: '', phoneNumber: '', date: '' });
        const [refresh, setRefresh] = useState({});

        useEffect(() => {
            axios.get(`https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users/${_id}`)
                .then((response) => {
                    setData(response.data);
                    setRefresh(false);
                });
        }, [refresh]);

        useEffect(() => {
            console.log(image);
        }, [image]);

        function submitChange(response, name) {
            axios.put(`https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users/${_id}`, response)
                .then((response) => {
                    setRefresh(response);
                    setErrors({ ...errors, [name]: '' });
                    setValues({ ...values, [name]: '' });
                    setInputs({ ...inputs, [name]: !inputs[name] });
                });
        }

        function handleOnClick(event) {
            const { name } = event.target;
            if (!inputs[name]) {
                setInputs({ ...inputs, [name]: !inputs[name] });
            }
            const valueOrData = values[name] || data[name];
            if (inputs[name]) {
                switch (name) {
                    case 'name':
                        userSchema.validate({ name: valueOrData })
                            .then((response) => submitChange(response, name),
                                (error) => setErrors({ ...errors, [name]: error.message }));
                        break;
                    case 'email':
                        emailSchema.validate({ email: valueOrData })
                            .then((response) => submitChange(response, name),
                                (error) => setErrors({ ...errors, [name]: error.message }));
                        break;
                    case 'phoneNumber':
                        phoneNumberSchema.validate({ phoneNumber: valueOrData })
                            .then((response) => submitChange(response, name),
                                (error) => setErrors({ ...errors, [name]: error.message }));
                        break;
                    case 'date':
                        dateSchema.validate({ date: valueOrData })
                            .then((response) => {
                                response = response.date.toISOString().slice(0, 10);
                                submitChange({ date: response }, name);
                            },
                                (error) => setErrors({ ...errors, [name]: error.message }));
                        break;
                    default:
                        break;
                }
            }
        }

        function handleOnChange(event) {
            const { value, name } = event.target;
            if (name === 'images') {
                const file = event.target.files[0];
                setImage(file);
                setInputs({ ...inputs, image: true });
            } else {
                setValues({ ...values, [name]: value });
            }
        }

        function handleMouse(event) {
            const { type } = event;
            if (type === 'mouseenter') {
                setHover(true);
            } else if (type === 'mouseleave') {
                setHover(false);
            }
        }

        function handleImageClick(event) {
            const imageInput = document.getElementById('imageInput');
            imageInput.click();
        }

        function handleSubmitImage() {
            const formData = new FormData();
            formData.append('images', image);
            axios.put(`https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users/${_id}`, formData);
            setInputs({ ...inputs, image: false });
            setImage([]);
        }

        return (
            <main className='pt-[10rem] min-h-[90vh] min-w-[90vh]'>
                <section className="m-[2rem] flex flex-row justify-center gap-x-[6rem]">
                    <div className='relative' onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
                        <Image className='flex w-[200px] h-[200px]' src={profileImage} width={200} height={200} id={'imageViewer'} atl={'profile'} />
                        {hover ?
                            <Image className="w-[25px] h-[25px] top-0 left-0 absolute cursor-pointer opacity-50" src={editIcon} alt={'username'} width={300} height={300} name={'edit'} onClick={handleImageClick} />
                            :
                            <></>}
                        {image && image.name ?
                            <Image className="w-[18px] h-[18px] top-[10px] relative cursor-pointer opacity-50" src={check} alt={'check'} width={300} height={300} onClick={handleSubmitImage} name={'image'} />
                            :
                            <></>}
                    </div>
                    <input className="relative top-[2rem] hidden" id={'imageInput'} type='file' name='images' onChange={handleOnChange}></input>
                    <div className="flex flex-col justify-left">
                        {lsDataEntry.map((dat, index) => {
                            return (
                                <div className="flex flex-col m-[0.5rem]" key={index}>
                                    <label>{fields[index]}</label>
                                    <div className="flex flex-row relative right-[20px] items-center">
                                        {!inputs[dat[0]] ?
                                            <>
                                                <Image className="w-[18px] h-[18px] relative right-[10px] cursor-pointer opacity-50" src={editIcon} alt={'username'} width={300} height={300} onClick={handleOnClick} name={dat[0]} />
                                                <h1>{data ? dataEntry[index][1] : ''}</h1>
                                            </>
                                            :
                                            <>
                                                <Image className="w-[18px] h-[18px] relative right-[10px] cursor-pointer opacity-50" src={check} alt={'username'} width={300} height={300} onClick={handleOnClick} name={dat[0]} />
                                                <input className="border w-[15rem]" value={values[dat[0]]} type={dat[0] === 'date' ? 'date' : 'text'} placeholder={dataEntry[index][1]} name={dat[0]} onChange={handleOnChange} />
                                                <h3 className="text-red-500 text-[12px] absolute left-[18rem] w-[15rem]">{errors[dat[0]]}</h3>
                                            </>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        );
    }
}