import Image from "next/image"
export default function ProductCard (key,title,talle,marca,background_image,price) {

    return (
        <div key={key}>
            <Image src={background_image} alt={title} width={200} height={400}/>
            <h2>{title}</h2>
            <span>{talle}</span>
            <span>{marca}</span>
            <span>{price}</span>
        </div>
    )
}