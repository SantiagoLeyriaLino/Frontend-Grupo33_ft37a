'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import offerts from '../public/accesories.jpg';
import hombres from '../public/hombresbanner.png';
import women from '../public/header.jpg';
import children from  '../public/kids.jpg';
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CarouselBanner() {
  const images = [hombres, women ,children, offerts];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const prevImage = () => {
    const condition = currentIndex > 0;
    const nextIndex = condition ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(nextIndex);
  };

  const nextImage = () => {
    const condition = currentIndex < images.length - 1;
    const nextIndex = condition ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    setSelectedImage(images[currentIndex]);
  }, [currentIndex]);

  const styles = {
    carouselContainer: {
      position: "relative",
      width: "100%",
      height: "0",
      paddingBottom: "56.25%", // Aspect ratio of 16:9 (Change as per your desired aspect ratio)
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
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer",
      zIndex: 2,
    },
    arrowIcon: {
      fontSize: "24px",
      color: "#ffffff",
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
              className="absolute inset-0 w-full h-full object-cover bottom-0"
              src={selectedImage}
              alt="image"
              layout="fill"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        style={{ ...styles.arrowButton, left: "10px" }}
        onClick={prevImage}
      >
        <FaChevronLeft style={styles.arrowIcon} />
      </button>
      <button
        style={{ ...styles.arrowButton, right: "10px" }}
        onClick={nextImage}
      >
        <FaChevronRight style={styles.arrowIcon} />
      </button>
    </section>
  );
}






