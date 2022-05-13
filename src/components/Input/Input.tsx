import { useState } from 'react';
import { InputHTMLAttributes } from 'react';
import './Input.css';
type ButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  isFocus?: string;
};
const Input: React.FC<ButtonProps> = (props) => {
  const { className } = props;
  const [isFocus, setIsFocus] = useState<string>('false');
  const handleShowError = (): void => {
    setIsFocus('true');
  };
  return (
    <input
      is-focus={isFocus}
      onBlur={handleShowError}
      type='text'
      {...props}
      className={`input-default ${className}`}
    />
  );
};

export default Input;
