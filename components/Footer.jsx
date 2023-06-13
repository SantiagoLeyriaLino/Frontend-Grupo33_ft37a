import Image from "next/image"
import logo from '../public/logowhite.png'

export default function Footer() {
    return (
        <footer className="bg-black min-h-[40vh] text-white  p-[2rem] ">

            <div className="flex justify-around">
                <div className="w-[30%] text-center">
                    <div className="flex items-center gap-x-[1rem] justify-center   ">
                        <Image
                            className="border-r-2 border-white px-[2rem]  w-[150px]"
                            src={logo} alt="logo" width={100} height={100} />
                        <div className=" flex flex-col">
                            <span>e-commerce</span>
                            <span>international</span>
                        </div>
                    </div>

                    <div className="mt-[1rem] flex flex-col gap-y-[1rem] items-center">
                        <p className="text-thin text-[0.6rem] text-start">
                            ¡Suscribite a nuestro newsletter! y gana 8% ADICIONAL en tu primera compra* <br />
                            Recibí las mejores promociones y novedades del mundo de la moda
                        </p>
                        <div className="flex gap-x-[1rem] mb-[1rem]">
                            <input className="text-black rounded-[0.6rem] py-[0.4rem] pl-[1rem]" type="text" />
                            <button className="rounded-[0.6rem] bg-[#909090] py-[0.4rem] px-[1rem]">Suscribete</button>
                        </div>
                    </div>

                    <span className="text-[0.8rem]">© 2023 Online Shop | e-commerce Inc.</span>
                </div>

                <div className="flex w-[70%] justify-around">
                    <article className="flex flex-col gap-y-[0.6rem]">
                        <h3 className="underline">Info</h3>
                        <span className="text-[0.8rem]">About</span>
                        <span className="text-[0.8rem]">Contact Us</span>
                        <span className="text-[0.8rem]">Privacy Policy</span>
                        <span className="text-[0.8rem]">Terms</span>
                    </article>

                    <article className="flex flex-col gap-y-[0.6rem]">
                        <h3 className="underline">Products</h3>
                        <span className="text-[0.8rem]">Zapatillas</span>
                        <span className="text-[0.8rem]">Buzos</span>
                        <span className="text-[0.8rem]">Jeans</span>
                        <span className="text-[0.8rem]">Remeras</span>
                        <span className="text-[0.8rem]">Gorras</span>
                        <span className="text-[0.8rem]">Relojes</span>
                    </article>

                    <article className="flex flex-col gap-y-[0.6rem]">
                        <h3 className="underline">Metodos de pago</h3>
                        <span className="text-[0.8rem]">Mercado Pago</span>
                        <span className="text-[0.8rem]">RapiPago</span>
                        <span className="text-[0.8rem]">Pago Facil</span>
                        <span className="text-[0.8rem]">Visa</span>
                        <span className="text-[0.8rem]">MasterCard</span>
                        <span className="text-[0.8rem]">Naranja</span>
                        <span className="text-[0.8rem]">American Express</span>
                        </article>
                    
                    <article className="flex flex-col gap-y-[0.6rem]">
                        <h3 className="underline">Redes</h3>
                        <span className="text-[0.8rem]">Facebook</span>
                        <span className="text-[0.8rem]">Twitter</span>
                        <span className="text-[0.8rem]">Instagram</span>
                        
                    </article>

                </div>
            </div>
        </footer>
    )
}