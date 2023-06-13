'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import ProductCard from "./ProductCard"


export default function ContainerProducts() {

    const [productos, setProductos] = useState([])

    const getProducts = async () => {
        try {
            const response = await axios('http://localhost:3000/products.json')
            console.log(response);
            setProductos(response.data)
            console.log(`esto son productos ${productos.length}`);
        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        getProducts()
    }, [])
    
    return (
        <div>
            {
                
                productos?.map((producto,index)=>{
                    return (
                        <div key={index}>
                            <Image src={producto?.background_image} alt={producto.title} width={200} height={400}/>
                            <h2 >{producto.title}</h2>

                        </div>
                    )
                })
            }
            {/* {
                productos?.map((produc)=>{
                    return(
                        <ProductCard
                        key={produc?.id}
                        title={produc?.title}
                        marca={produc?.marca}
                        talle={produc?.talle}
                        background_image={produc?.background_image}
                        price={produc?.price}
                        />
                    )
                })
            } */}
            hola
        </div>
    )
}