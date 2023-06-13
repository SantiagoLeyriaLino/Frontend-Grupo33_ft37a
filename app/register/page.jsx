'use client'
import Image from "next/image"
import register from '../../public/register.jpg'
import logo from '../../public/logocommerce.png'
import Link from "next/link"
import { motion } from "framer-motion"

export default function RegisterPage() {
    return (
        <main className="min-h-[100vh]">
            <section className="flex">
                <motion.article
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="relative w-[50%] min-h-[100vh] flex items-center">
                    <Image
                        className="relative h-[98%]  w-[100%] object-cover object-bottom rounded-r-[1rem]"
                        src={register} alt="img-login" width={2000} height={2000} />
                    <span className="absolute font-playfair text-white font-light text-[3rem] bottom-[2rem] right-[1rem] py-[0.6rem] px-[1.4rem] rounded-[1rem]">La moda que te define <br />esta a solo un <strong className="font-bold underline ">CLIC</strong>.</span>
                </motion.article>

                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-[50%] min-h-[100vh] flex items-center">
                    <div className="h-[97%] w-[80%] mx-[auto] bg-[#90909050] pt-[1rem] px-[2rem] pb-[4rem] flex flex-col gap-y-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]">
                        <div className="flex flex-col gap-y-[1rem]">
                            <Link href={'/'}>
                                <Image
                                    className="mx-[auto]"
                                    src={logo} alt="img-logo" width={150} height={150} />
                            </Link>
                            <div className="flex  bg-[#909090] w-[fit-content] p-[0.6rem] rounded-[1.6rem] mx-[auto]">
                                <Link
                                    className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] text-white rounded-[1rem] "
                                    href={'/login'}>Login</Link>
                                <Link
                                    className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] shadow-md shadow-[#11111180]"
                                    href={'/register'}>Register</Link>
                            </div>

                        </div>
                        <form
                            className="flex flex-col gap-y-[3rem] "
                            action="">
                            <div className="flex justify-center gap-x-[2rem]">

                                <label
                                    className="flex flex-col gap-y-[0.4rem]"
                                    htmlFor="">
                                    <span className="font-medium">User Name:</span>
                                    <input
                                        className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                        type="text" />
                                </label>

                                <label
                                    className="flex flex-col gap-y-[0.4rem]"
                                    htmlFor="">
                                    <span className="font-medium">Email:</span>
                                    <input
                                        className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                        type="text" />
                                </label>
                            </div>

                            <div className="flex justify-center gap-x-[2rem]">

                                <label
                                    className="flex flex-col gap-y-[0.4rem]"
                                    htmlFor="">
                                    <span className="font-medium">Password:</span>
                                    <input
                                        className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                        type="password" />
                                </label>

                                <label
                                    className="flex flex-col gap-y-[0.4rem]"
                                    htmlFor="">
                                    <span className="font-medium">Confirm Password:</span>
                                    <input
                                        className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                        type="password" />
                                </label>
                            </div>

                            <div className="flex justify-center gap-x-[2rem]">

                                <label
                                    className="flex flex-col gap-y-[0.4rem]"
                                    htmlFor="">
                                    <span className="font-medium">Tel:</span>
                                    <input
                                        className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                        type="text" />
                                </label>

                                <label
                                    className="flex flex-col gap-y-[0.4rem] w-[45%]"
                                    htmlFor="">
                                    <span className="font-medium">Date:</span>
                                    <input
                                        className="py-[0.6rem] px-[1rem] rounded-[1rem] shadow-md shadow-[#11111180]"
                                        type="date" />
                                </label>
                            </div>


                            <button className="font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] w-[50%] mx-[auto] shadow-md shadow-[#11111180]">Register</button>

                        </form>
                    </div>
                </motion.article>
            </section>
        </main>
    )
}