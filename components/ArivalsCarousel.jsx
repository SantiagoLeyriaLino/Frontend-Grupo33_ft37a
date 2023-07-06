import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SkeletonArrivalsCarousel from '@/components/SkeletonComponents/SkeletonArrivalsCarousel';

export default function ArivalsCarousel({items}){
    const router = useRouter()

    const handleClick = (event)=>{
        const { id } = event.target
        router.push(`/products/arrivals/${id}`)
    }

  return (<Carousel
    additionalTransfrom={0}
    arrows
    autoPlay
    autoPlaySpeed={5000}
    centerMode={false}
    className="w-[70%] self-center z-0"
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
      }
    }}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={false}
    sliderClass=""
    slidesToSlide={2}
    swipeable
  >
    {items.length ?
      items?.map((item, index) => <div key={index} className='flex flex-col justify-center'>
              <Image className='w-[180px] h-[250px] object-cover mt-[0.8rem] cursor-pointer'
              onClick={handleClick} id={item._id}
              src={item.images[0]} alt={`image_${index}`}
              width={400} height={400}/>
              <h1 className='text-white w-[180px] mt-[0.8rem]'>{item.price
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                  .replace(/\./g, '#').replace(/,/g, '.').replace(/#/g, ',')}</h1>
              <h1 className='text-white w-[180px] mt-[0.8rem]'>{item.name}</h1>
      </div>)
      :
      <SkeletonArrivalsCarousel/>
    }
  </Carousel>)
}