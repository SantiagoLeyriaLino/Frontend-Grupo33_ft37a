'use client';
import Image from 'next/image';
import about from '../../public/aboutBanner.png';
import egPage1 from '../../public/react.png';
import egPage4 from '../../public/js.png';
import egPage5 from '../../public/nextjs4.png';
import node from '../../public/nodejs-logo-60.png';
import tailwind from '../../public/tailwind-logo-60.png';
import reduxx from '../../public/redux-logo-60.png';
import bcrypt from '../../public/bcryptjs.png';
import dotenv from '../../public/env.png';
import mercado from '../../public/stripe3.png';
import mongo from '../../public/mongodb-logo-60.png';
import nodemailer from '../../public/nodemailer.png';
import expres from '../../public/expressjs2.png';
import maps from '../../public/google-maps.png';
import framer from '../../public/motion.png';
import jwt from '../../public/jwt.png';
import fire from '../../public/firebase-logo-60.png';
import toolkit from '../../public/toolkit.png';
import table from '../../public/reacttable.jpg';
import toastify from '../../public/toastify.png';
import alert from '../../public/sweetalert.png';
import sendgrid from '../../public/sendgrid.png';
import pdf from '../../public/pdfkit.png';
import { motion } from 'framer-motion';
import Map from '@/components/Map';
import FormContactUs from '@/components/FormContactUs';

export default function About() {
  const images = [

    { src: egPage5, name: 'Next.js' },
    {src: node, name: 'Node.js'},

    { src: tailwind, name: 'Tailwind CSS' },
    { src: reduxx, name: 'Redux' },
  
    { src: bcrypt, name: 'bcryptJS' },

    { src: mercado, name: 'Stripe' },
    { src: mongo, name: 'MongoBD' },
    { src: nodemailer, name: 'Nodemailer' },
  
    { src: expres, name: 'Express' },
    {  src: maps, name: 'Google maps' },
   
  
    { src: jwt, name: 'JWT' },
    {  src: fire, name: 'FireBase' },
    
  ];

  return (
    <main className='min-h-screen'>
      <section className='flex w-full mx-auto h-[85vh] justify-center py-20'>
        <Image
          className='w-full object-cover'
          src={about}
          alt='img-header'
          layout='responsive'
          objectFit='cover'
          placeholder='blur'
        />
      </section>
      <section className='flex w-4/5 mx-auto justify-center pb-20'>
        <div className='flex flex-col'>
          <motion.h2
            className='text-4xl font-semibold text-center pb-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h2>
          <motion.div
            className='bg-white rounded-lg shadow-lg p-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className='text-lg'>
              We are a group of students with previous knowledge in previous projects and we are looking forward to develop
              this new digital product where we can offer a wide variety of reliable and high quality items. This project
              was created thinking in making an e-commerce on a global scale where users can find variety and quality in
              different brands of clothing at more affordable prices. Our goal is to provide a unique user experience and
              satisfy their needs with products that are relevant to them, without losing sight of their satisfaction.
            </p>
            <p className='text-lg'>
              We focus on innovation, quality and customer service. We work closely with our suppliers and customers to
              ensure that all products meet the highest standards. We also strive to keep abreast of the latest trends in
              fashion and technology so that we can always offer up-to-date and attractive products.
            </p>
            <p className='text-lg'>
              Thank you for visiting our website and being part of our history! We hope you enjoy your shopping experience
              with us and that you find products that make you feel special and fashionable.
            </p>
          </motion.div>
        </div>
      </section>
      <section className='w-4/5 mx-auto justify-center pb-20'>
        <h2 className='text-4xl font-semibold text-center pb-6'>
          Technologies Used
        </h2>
        <br/>
        <div className='flex justify-center'>
            <div className='flex flex-wrap justify-center gap-10 w-[70%]'>
              {images.map((image, index) => (
                <div key={index} className='w-20 h-20'>
                  <Image
                    className='object-contain w-full h-full'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
              ))}
            </div>
          </div>
        <br />
        {/* <div className='flex flex-row justify-around'>
          {images2.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className='flex flex-row justify-around'>
          {images3.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className='flex flex-row justify-around'>
          {images4.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className='flex flex-row justify-around'>
          {images5.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className='flex flex-row justify-around'>
          {images6.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className='flex flex-row justify-around'>
          {images7.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <br />
        <div className='flex flex-row justify-around'>
          {images8.map((image, index) => (
            <motion.div key={index} whileHover={{ opacity: 0.5 }}>
              <div className='w-48 h-36 rounded-lg border shadow-lg flex flex-col items-center justify-center'>
                <div className='w-28 h-28 flex justify-center items-center'>
                  <Image
                    className='object-cover w-full h-full rounded-lg'
                    src={image.src}
                    alt={`page-${index}`}
                    layout='responsive'
                    objectFit='contain'
                    placeholder='blur'
                  />
                </div>
                <p className='text-lg mt-2'>{image.name}</p>
              </div>
            </motion.div>
          ))}
        </div> */}
        <br/>
        <Map />
      </section>
      <section className='w-4/5 mx-auto justify-center pb-20'>
        <h2 className='text-4xl font-semibold text-center pb-8'>
          Contact Us
        </h2>
        <FormContactUs />
      </section>
    </main>
  );
}
