import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import './ProductSlider.css';
import 'swiper/css';

interface IProps {
  images: string[];
}

const ProductSlider: React.FC<IProps> = ({ images }) => {
  const [slectedImage, setSelectedImage] = useState<string>(images[0]);
  const handleChangeImage = (e: any) => {
    setSelectedImage(e.target.src);
  };
  return (
    <div className='product-slider'>
      <motion.img
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0.8, y: 10 }}
        key={slectedImage}
        className='product-slider__main-image'
        src={slectedImage}
        alt=''
      />
      <div className='product-slider__images'>
        <Swiper
          direction='horizontal'
          breakpoints={{
            990: { direction: 'vertical', spaceBetween: 10, slidesPerView: 3 },
            480: { spaceBetween: 5, slidesPerView: 4 },
          }}
          spaceBetween={3}
          slidesPerView={3}
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <motion.img
                whileTap={{ scale: 0.9 }}
                onClick={handleChangeImage}
                src={image}
                loading='lazy'
                className={`product-slider__images-image ${image === slectedImage ? 'active-slide' : ''}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
