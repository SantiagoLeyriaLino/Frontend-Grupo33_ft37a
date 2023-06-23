'use client'
import { useEffect, useState } from "react"
import Image from "next/image";
import hombre from '../public/hombres.jpg'
import hombres from '../public/hombresbanner.png'
import shop from '../public/header.jpg'
import { motion, AnimatePresence } from "framer-motion";


export default function CarouselBanner() {
    const images = [hombres, hombre, shop]
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const prevImage = () => {
        const condition = currentIndex > 0;
        const nextIndex = condition ? currentIndex - 1 : images.length - 1;
        setSelectedImage(images[nextIndex])
        setCurrentIndex(nextIndex)
    }

    const nextImage = () => {
        const condition = currentIndex < images.length - 1;
        const nextIndex = condition ? currentIndex + 1 : 0;
        setSelectedImage(images[nextIndex])
        setCurrentIndex(nextIndex)
    }

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    useEffect(() => {
        setSelectedImage(images[currentIndex]);
    }, [currentIndex]);

    return (
        <section className="h-[200px]">
            <AnimatePresence>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x:-200 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0, x:0 }}
                    exit={{opacity:0, x:200}}
                    transition={{ duration: 10 }}
                    className="relative w-full h-full">
                    <Image
                        onLoad={handleImageLoad}
                        className="absolute inset-0 w-full h-full object-cover bottom-0"
                        src={selectedImage} alt="image" width={2000} height={2000} />

                </motion.div>
            </AnimatePresence>
            <button onClick={() => { prevImage() }}>{"<"}</button>
            <button onClick={() => { nextImage() }}>{">"}</button>
        </section>
    )
}