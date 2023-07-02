'use client'

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import hombre from '../../public/hombres.jpg';
import hombres from '../../public/hombresbanner.png';
import shop from '../../public/header.jpg';
import styles from "./CarouselHome.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CarouselHome() {
  const images = [hombre, hombres, shop];

  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1, // Ajusta la cantidad de imágenes visibles a la vez (1 para mostrar una imagen a la vez)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    fade: true, // Habilita la animación de fundido
  };

  return (
    <div className={`${styles.carouselContainer}`}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slideItem}>
            <Image src={image} alt="photo" width={1000} height={1000} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
