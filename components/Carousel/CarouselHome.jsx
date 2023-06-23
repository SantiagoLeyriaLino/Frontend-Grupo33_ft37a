'use client'

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import hombre from '../../public/hombres.jpg'
import hombres from '../../public/hombresbanner.png'
import shop from '../../public/header.jpg'


export default function CarouselHome() {

    const images = [hombre,hombres,shop]

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className=" pt-[9rem]">

        <Slider {...settings}>
            {
                images.map((image,index)=>(
                    <Image key={index}
                    src={image} alt="photo" width={1000} height={1000}/>
                ))
            }
        </Slider>
        </div>
    );
}