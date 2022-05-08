import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import sliderData from '../../data/sliderData';
import './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
const Slider: React.FC = () => {
  return (
    <Swiper
      className='slider'
      modules={[Navigation]}
      spaceBetween={0}
      navigation
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {sliderData.map((slider) => (
        <SwiperSlide
          style={{ background: `url(${slider.imgUrl})` }}
          className='slider-item'
        >
          <div className='slider-item__content'>
            <h2 className='slider-title'>{slider.title}</h2>
            <p className='slider-des'>{slider.description}</p>
            <div className='slider-buttons'>
              <button className='slider-button'>shop</button>
              <button className='slider-button'>read more</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
