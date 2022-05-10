import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import sliderData from '../../data/sliderData';
import { Button } from '../../components';
import './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';

const Slider: React.FC = () => {
  const showCurrentSlide = (slides: HTMLDivElement[], index: number): void => {
    for (const item of slides) {
      item.classList.remove('show');
    }
    slides[index].classList.add('show');
  };

  const handleCurrentSldier = (e: any): void => {
    const sliderContent: HTMLDivElement[] = [
      ...e.$el[0].querySelectorAll('.slider-item__content'),
    ];
    showCurrentSlide(sliderContent, e.activeIndex);
  };

  return (
    <Swiper
      className='slider'
      modules={[Navigation]}
      spaceBetween={0}
      navigation
      slidesPerView={1}
      onSwiper={handleCurrentSldier}
      onSlideChange={handleCurrentSldier}
    >
      {sliderData.map((slider, i) => (
        <SwiperSlide
          key={i}
          style={{ background: `url(${slider.imgUrl})` }}
          className='slider-item'
        >
          <div className='slider-item__content'>
            <h2 className='slider-title'>{slider.title}</h2>
            <p className='slider-des'>{slider.description}</p>
            <div className='slider-buttons'>
              <Button>To Shop</Button>
              <Button className='secoundry'>Read More</Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
