import { FC, useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import Button from '../Button/Button';
import './ElevatorButton.css';

const ElevatorButton: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const unsub = window.addEventListener('scroll', () => {
      console.log();
      if (window.scrollY >= 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return unsub;
  });
  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Button onClick={handleGoToTop} className={`elevator-button ${isVisible ? 'visible' : ''}`}>
      <IoIosArrowUp />
    </Button>
  );
};

export default ElevatorButton;
