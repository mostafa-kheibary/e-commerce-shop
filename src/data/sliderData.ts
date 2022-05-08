import slider1 from '../assets/image/slider-1.jpg';
import slider2 from '../assets/image/slider-2.jpg';
import slider3 from '../assets/image/slider-3.jpg';

interface ISliderData {
  imgUrl: string;
  title: string;
  description: string;
  shopUrl: string;
  productUrl: string;
}
const sliderData: ISliderData[] = [
  {
    imgUrl: slider1,
    title: 'Charge your phone safty',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisl, euismod.',
    shopUrl: '#',
    productUrl: '#',
  },
  {
    imgUrl: slider2,
    title: 'Get new cover from it',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisl, euismod.',
    shopUrl: '#',
    productUrl: '#',
  },
  {
    imgUrl: slider3,
    title: 'New phone cover from it',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, nisi nunc pretium nisl, euismod.',
    shopUrl: '#',
    productUrl: '#',
  },
];

export default sliderData;
