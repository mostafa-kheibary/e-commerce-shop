import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};
const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <button className={`button-default ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
