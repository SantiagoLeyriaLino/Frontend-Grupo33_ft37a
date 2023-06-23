'use client'
import hoodie from '../../../public/hoodie.jpg'
import shoe from '../../../public/shoe.jpg'
import pants from '../../../public/pants.jpg'
import shirt from '../../../public/t-shirt.jpg'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import Link from 'next/link'


const ScrollRevealText = ({ img, index }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const imageElement = document.getElementById(`image-${index}`);
        if (imageElement) {
          const imageRect = imageElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
  
          if (imageRect.top < windowHeight * 0.8) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [index]);
  
    return (
      <div
        className={`p-8 w-1/2 transform transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <h3 className="text-3xl font-semibold mb-3">{img.title}</h3>
        <p className="text-lg text-gray-600">{img.description}</p>
      </div>
    );
  };
  
  
  

export default function ProductsPage() {

    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const image = [
        {
            title: "Shoes",
            img: shoe,
            link:'products/female/shoes',
            description:"Explore a diverse selection of sneakers from various brands and styles. Discover the ideal fit, design, and versatility to complement your individual fashion preferences. Whether you're seeking fashionable sneakers, comfortable athletic shoes, or trendy trainers, we offer an extensive range to choose from. Browse our collection today and discover the perfect pair to elevate your shoe collection."
        },
        {
            title: "Pants",
            img: pants,
            link:'products/female/pants',
            description:"Browse a wide range of pants from multiple brands and colors. Discover the perfect fit, style, and versatility to suit your unique taste in fashion. Whether you're looking for trendy jeans, comfortable pants, or stylish leggings, we've got a wide selection to choose from. Browse our collection and find the perfect pair to elevate your wardrobe."
        
        },
        {
            title: "Hoodie",
            img: hoodie,
            link:'products/female/hoodie',
            description:"Indulge in a diverse assortment of hoodies from an array of renowned brands, showcasing distinctive designs and superior craftsmanship. Unveil the epitome of comfort, style, and versatility, tailored to reflect your personal fashion sensibilities. Whether you're on the hunt for trendy pullovers, snug sweatshirts, or chic hooded jackets, our extensive collection leaves no stone unturned. Immerse yourself in a captivating journey through our carefully curated selection and discover the perfect hoodie to elevate your wardrobe with effortless panache."
        
        },
        {
            title: "T-Shirt",
            img: shirt,
            link:'products/female/t-shirt',
            description:"Embark on an exhilarating exploration of t-shirts, originating from a myriad of esteemed brands, boasting captivating designs and exquisite craftsmanship. Embrace the pinnacle of comfort, style, and versatility, meticulously tailored to resonate with your individual fashion inclinations. Whether you seek trendy graphic tees, timeless classics, or contemporary printed shirts, our expansive collection leaves no desire unfulfilled. Immerse yourself in a captivating odyssey through our thoughtfully curated assortment and unearth the perfect t-shirt to elevate your wardrobe with unparalleled flair."
        
        },
    ]

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };

    return (
        <main className="pt-[9rem]">
          <div className="flex flex-col items-center pt-[3rem] pb-[6rem] gap-[4rem]">
            {image.map((img, index) => (
              <div
                className={`flex ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                } items-center`}
                style={{ width: "80%" }}
                key={index}
                id={`image-${index}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={img.link} className="relative cursor-pointer">
                  <div className="relative w-3/4">
                    <Image
                      className="object-cover rounded-[1rem] hover:opacity-50"
                      src={img.img}
                      alt={`photo-${index + 1}`}
                      width={600}
                      height={600}
                    />
                  </div>
                  {hoveredIndex === index && (
                    <span className="font-semibold text-4xl absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] opacity-100">
                      {img.title}
                    </span>
                  )}
                </Link>
                <ScrollRevealText
                  img={img}
                  index={index}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              </div>
            ))}
          </div>
        </main>
      );
    }