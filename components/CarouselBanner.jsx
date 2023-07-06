'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import offerts from "../public/ofertas.jpg";
import hombres from "../public/hombres.jpg";
import women from "../public/ropafemenina.png";
import children from "../public/ropainfantil.png";
import { motion, AnimatePresence } from "framer-motion";

export default function CarouselBanner({ routes }) {
  const images = [hombres, children, women, offerts];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const anounces = ['Men', 'Childrens', 'Women', 'Offerts'] 
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia el valor "5000" para ajustar la duración de cambio de imagen

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    setSelectedImage(images[currentIndex]);
  }, [currentIndex]);

  const handleButtonClick = () => {
    const currentRoute = routes[currentIndex].route;
    router.push(currentRoute);
  };

  const styles = {
    carouselContainer: {
      position: "relative",
      width: "100%", 
      height: "400px", 
      paddingBottom: "0", 
      margin: "0 auto",
    },
    slideItem: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: isImageLoaded ? 1 : 0,
      transition: "opacity 0.5s",
      objectFit: "contain", // Muestra la imagen completa en lugar de recortarla
    },
  };

  return (
    <section style={styles.carouselContainer}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.slideItem}
        >
            <Image
              onLoad={handleImageLoad}
              className="absolute inset-0 w-full h-full bottom-0 object-cover"
              src={selectedImage}
              alt="image"
              layout="fill"
              />
          <motion.button whileHover={{backgroundColor: 'gray', transition: { duration: 1 }}} className='absolute text-white font-bold text-[1.3rem] top-[21rem] left-[4rem] bg-[#90909050] p-[0.4rem] pl-[0.8rem] pr-[0.8rem] rounded-[1.5rem] bg-black'   onClick={handleButtonClick}>Take a look ➔</motion.button>
          <motion.h1 className="text-black text-[2rem]">{anounces[0]}</motion.h1>
        </motion.div>
      </AnimatePresence>
    </section>
 
  );
}

