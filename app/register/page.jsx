'use client'
import Image from "next/image"
import register from '../../public/register.jpg'
import logo from '../../public/logo-white.png'
import Link from "next/link"
import { motion } from "framer-motion"
import { Form, Formik, Field, ErrorMessage } from "formik"
import validate from "./validate"
import { useState } from "react"
import axios from "axios"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
    const [formularioSend, setFormularioSend] = useState(false);

    const notify = (message) => {
        toast.success(message, {
            autoClose: 6000,
        });
    };

    const notifyError = (message) => toast.error(message);


    return (
        <main className="min-h-[100vh] bg-black">
            <section className="flex">
                <article className="w-[55%] min-h-[100vh] flex items-center">
                    <Image
                        className="relative h-[100%] w-[100%] object-cover object-bottom"
                        src={register} alt="img-login" width={2000} height={2000} />
                    <motion.span className="absolute font-playfair text-white font-light text-[3rem]
                        bottom-[2rem] right-[820px]"
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}>
                        Fashion that defines you <br />with just one{' '}
                        <strong className="font-bold underline ">CLICK</strong>.</motion.span>
                </article>

                <article
                    className="h-[100vh] w-[45%] flex align-center justify-center bg-black">
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            confirm_password: "",
                            phoneNumber: "",
                            date: "",
                        }}
                        validate={validate}
                        onSubmit={async (values, { resetForm }) => {
                            // resetForm()
                            setFormularioSend(true)
                            setTimeout(() => setFormularioSend(false), 5000);
                            try {
                                const response = await axios.post("https://backend-33ft37a-deploy.vercel.app/users", values);
                                localStorage.setItem('userEmail', JSON.stringify(response.data.email))
                                console.log(response);
                                notify("User created successfully, check your email to activate your account");
                            } catch (error) {
                                console.log(error);

                                notifyError("User already exists");
                            }

                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <motion.div className="flex items-center h-[100%] w-fit pt-[1rem] px-[2rem] flex-col gap-y-[1rem]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}>
                                    <div className="flex flex-col gap-y-[1rem]">
                                        <Link href={'/'}>
                                            <Image
                                                className="mx-[auto]"
                                                src={logo} alt="img-logo" width={150} height={150} />
                                        </Link>
                                        <div className="flex bg-[#909090] w-[fit-content] p-[0.2rem] rounded-[1.6rem]">
                                            <Link
                                                className="font-semibold text-[1rem] py-[0.4rem] px-[1.4rem] text-white rounded-[1rem]"
                                                href={'/login'}>Login</Link>
                                            <Link
                                                className="font-semibold text-[1rem] py-[0.4rem] px-[1.6rem] bg-white text-black rounded-[1rem]"
                                                href={'/register'}>Register</Link>
                                        </div>

                                    </div>

                                    <div className="flex flex-col gap-y-[2rem] align-center">

                                        <div className="flex justify-center gap-x-[2rem]">
                                            <label
                                                className="relative flex flex-col gap-y-[0.4rem]"
                                                htmlFor="">
                                                <span className="font-black text-[1rem] text-white">Username:</span>
                                                <Field
                                                    name="name"
                                                    className="p-[0.3rem] pl-[0.7rem] w-[220px] rounded"
                                                    type="text" />
                                                <ErrorMessage
                                                    name="name"
                                                    component={() => (
                                                        <div className="absolute top-[110%] text-red-500 text-xs">
                                                            {errors.name}
                                                        </div>
                                                    )}
                                                />
                                            </label>

                                            <label
                                                className="relative flex flex-col gap-y-[0.4rem]"
                                                htmlFor="">
                                                <span className="font-black text-[1rem] text-white">Email:</span>
                                                <Field
                                                    name="email"
                                                    className="p-[0.3rem] pl-[0.7rem] w-[220px] rounded"
                                                    type="text" />
                                                <ErrorMessage
                                                    name="email"
                                                    component={() => (
                                                        <div className="absolute top-[110%] text-red-500 text-xs">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                />
                                            </label>
                                        </div>

                                        <div className="flex justify-center gap-x-[2rem]">

                                            <label
                                                className="relative flex flex-col gap-y-[0.4rem]"
                                                htmlFor="">
                                                <span className="font-black text-[1rem] text-white">Password:</span>
                                                <Field
                                                    name="password"
                                                    className="p-[0.3rem] pl-[0.7rem] w-[220px] rounded"
                                                    type="password" />
                                                <ErrorMessage
                                                    name="password"
                                                    component={() => (
                                                        <div className="absolute top-[110%] text-red-500 text-xs">
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                />
                                            </label>

                                            <label
                                                className="relative flex flex-col gap-y-[0.4rem]"
                                                htmlFor="">
                                                <span className="font-black text-[1rem] text-white">Confirm Password:</span>
                                                <Field
                                                    name="confirm_password"
                                                    className="p-[0.3rem] pl-[0.7rem] w-[220px] rounded"
                                                    type="password" />

                                                <ErrorMessage
                                                    name="confirm_password"
                                                    component={() => (
                                                        <div className="absolute top-[110%] text-red-500 text-xs">
                                                            {errors.confirm_password}
                                                        </div>
                                                    )}
                                                />
                                            </label>
                                        </div>

                                        <div className="flex justify-center gap-x-[2rem]">

                                            <label
                                                className="relative flex flex-col gap-y-[0.4rem]"
                                                htmlFor="">
                                                <span className="font-black text-[1rem] text-white">Phone number:</span>
                                                <Field
                                                    name="phoneNumber"
                                                    className="p-[0.3rem] pl-[0.7rem] w-[220px] rounded"
                                                    type="text" />
                                                <ErrorMessage
                                                    name="phoneNumber"
                                                    component={() => (
                                                        <div className="absolute top-[110%] text-red-500 text-xs">
                                                            {errors.phoneNumber}
                                                        </div>
                                                    )}
                                                />
                                            </label>

                                            <label
                                                className="relative flex flex-col gap-y-[0.4rem] w-[45%]"
                                                htmlFor="">
                                                <span className="font-black text-[1rem] text-white">Date:</span>
                                                <Field
                                                    name="date"
                                                    className="p-[0.3rem] pl-[0.7rem] w-[220px] rounded"
                                                    type="date" />
                                                <ErrorMessage
                                                    name="date"
                                                    component={() => (
                                                        <div className="absolute top-[110%] text-red-500 text-xs">
                                                            {errors.date}
                                                        </div>
                                                    )}
                                                />
                                            </label>
                                        </div>
                                        <motion.button
                                            whileTap={{scale: 0.92}}
                                            type="submit"
                                            className="font-black self-center text-[1rem] py-[0.3rem] bg-white text-black
                                            rounded-[1rem] w-[120px]"
                                            >REGISTER
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </Form>
                        )}
                    </Formik>
                <ToastContainer />
                </article>
            </section>
        </main>
    )
}