'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import offerts from "../public/ofertas.jpg";
import hombres from "../public/hombres.jpg";
import women from "../public/ropafemenina.jpg";
import children from "../public/ropainfantil.jpg";
import { motion, AnimatePresence } from "framer-motion";

export default function CarouselBanner({ routes }) {
  const images = [hombres, women, children, offerts];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              onLoad={handleImageLoad}
              className="absolute inset-0 w-full h-full bottom-0"
              src={selectedImage}
              alt="image"
              layout="fill"
            />
           
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="z-20">
    <button className='absolute text-white font-bold text-[2rem] top-[8rem] left-[4rem] bg-[#90909050] py-[1rem] px-[1.4rem] rounded-[1rem]'   onClick={handleButtonClick}>See more</button></div>
    </section>
 
  );
}





