import Image from 'next/image'
import shop from '../public/header.jpg'
import clothes from '../public/photo1.jpg'
import playera from '../public/playera.png'
import reloj from '../public/reloj.png'
import zapas from '../public/zapas.png'
import pantalon from '../public/pantalon.png'
import tienda from '../public/photo4.jpg'
import tienda2 from '../public/photo3.jpg'

export default function Home() {
  return (
    <main className='pt-[9rem] min-h-[100vh]'>
      <div className='relative'>
      <Image 
      className='w-[100%] object-cover h-[60vh] '
      src={shop} alt='img-header' width={1500} height={1500}/>
      <h2 className='absolute text-white font-bold text-[2rem] top-[2rem] left-[4rem] bg-[#90909050] py-[1rem] px-[1.4rem] rounded-[1rem]'>Empieza tu negocio</h2>
      </div>

      <section className='flex w-[80%] mx-[auto]  justify-center py-[3rem]'>
        <div className='w-[60%] pt-[2rem] text-center'>
          <h2 className='text-[3.4rem] font-semibold'>Vende tus productos</h2>
          <p className='w-[60%] mx-[auto] mt-[2rem] text-[1.4rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ut eos facere vero, laborum fugiat ipsum quis autem iusto, aut, ipsam magnam vitae nisi consequuntur dicta culpa architecto iure possimus?</p>
        </div>
        <Image 
        className='h-[500px] w-[40%] object-cover rounded-[1rem]'
        src={clothes} alt='photo1' width={600} height={600}/>
      </section>

      <section className='bg-[#909090] py-[4rem]'>
        <div className='flex w-[80%] mx-[auto] justify-around flex-wrap '>
        <h2 className='w-full font-bold text-[2rem] mb-[2rem]'>Nuestros articulos</h2>
          <Image 
          className='rounded-[2rem]'
          src={zapas} alt='photo-zapas' width={200} height={200}/>
          <Image 
          className='rounded-[2rem]'
          src={playera} alt='photo-playera' width={200} height={200}/>
          <Image 
          className='rounded-[2rem]'
          src={pantalon} alt='photo-pantalon' width={200} height={200}/>
          <Image 
          className='rounded-[2rem]'
          src={reloj} alt='photo-reloj' width={200} height={200}/>
        </div>
      </section>
      <section className='py-[6rem]'>
        <div className='w-[80%] mx-[auto]'>
          <h2 className='text-[2rem] font-light mb-[2rem]'>Crea con nosotros tu <strong className='font-bold'>tienda online.</strong></h2>
          <div className='flex mb-[2rem] gap-x-[3rem] items-center'>
          <Image 
          className='object-cover h-[350px] rounded-[0.6rem]'
          src={tienda} alt='photo-3' width={700} height={600}/>
            <div className='w-[40%]'> 
              <h2 className='font-semibold mb-[1rem] text-[1.4rem]'>Vende desde tu casa</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ut eos facere vero, laborum fugiat ipsum quis autem iusto, aut, ipsam magnam vitae nisi consequuntur dicta culpa architecto iure possimus?</p>
            </div>
          </div>

          <div className='flex gap-x-[3rem] items-center'>
          <div className='w-[40%]'> 
              <h2 className='font-semibold mb-[1rem] text-[1.4rem]'>Vende desde tu casa</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ut eos facere vero, laborum fugiat ipsum quis autem iusto, aut, ipsam magnam vitae nisi consequuntur dicta culpa architecto iure possimus?</p>
            </div>
          <Image 
          className='object-cover h-[350px] rounded-[0.6rem]'
          src={tienda2} alt='photo-4' width={700} height={600}/>

          </div>
        </div>
      </section>
          </main>
  )
}
