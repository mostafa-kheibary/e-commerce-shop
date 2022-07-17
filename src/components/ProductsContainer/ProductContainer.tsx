import { FC, ReactNode } from 'react';
import './ProductsContainer.css';

interface IProps {
  children: ReactNode;
  className?: string;
}
const ProductContainer: FC<IProps> = ({ children, className = '' }) => {
  return <div className={`products-container ${className}`}>{children}</div>;
};

export default ProductContainer;
