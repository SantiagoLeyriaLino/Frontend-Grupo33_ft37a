'use client'
import maleShoes from '../../../public/maleShoes.jpg'
import maleHoodie from '../../../public/maleHoodie.jpg'
import maleShirt from '../../../public/maleShirt.jpg'
import maleTrousers from '../../../public/maleTrousers.jpg'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'


export default function ProductsPage() {

    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const image = [
        {
            title: "Shoes",
            img: maleShoes,
            link:'products/hombres/zapatillas'
        },
        {
            title: "Hoodies",
            img: maleHoodie,
            link:'products/hombres/buzos'
        },
        {
            title: "T-shirts",
            img: maleShirt,
            link:'products/hombres/remeras'
        },
        {
            title: "Pants",
            img: maleTrousers,
            link:'products/hombres/pantalones'
        },
    ]

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };

    return (
        <main className='pt-[9rem]'>
            <div className='flex w-[70%] mx-[auto] flex-wrap justify-center pt-[3rem] pb-[6rem] gap-[4rem]'>
                {
                    image.map((img, index) => {

                        return (

                            <Link href={img.link} key={index}
                                className='relative w-[40%] h-[500px] cursor-pointer'
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {
                                    hoveredIndex === index && (
                                        <span className={`font-semibold text-[3rem] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] opacity-100`}>{img.title}</span>
                                    )
                                }
                                <Image
                                    className='object-cover h-full w-full rounded-[1rem] hover:opacity-50'
                                    src={img.img} alt={`photo-${index + 1}`} width={1000} height={1000} />
                            </Link>
                        )
                    })
                }

            </div>
        </main>
    )

}