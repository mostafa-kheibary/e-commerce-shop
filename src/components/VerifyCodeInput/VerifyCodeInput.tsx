import { ReactNode, useEffect, useRef, useState } from 'react';
import { Input } from '..';
import './VerifyCodeInput.css';

interface IProps {
  onCodeChange: (code: string) => void;
}
const VerifyCodeInput: React.FC<IProps> = ({ onCodeChange }) => {
  const [verifyCode, setVerifyCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef<HTMLDivElement>(null);
  const inputData = [{ name: 0 }, { name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }];

  useEffect(() => {
    onCodeChange(verifyCode.join(''));
  }, verifyCode);

  const changeInput = (inputIndex: number) => {
    const nextInput: any = inputsRef.current?.children[inputIndex];
    if (nextInput) {
      nextInput.focus();
    }
  };
  const handleChange = (e: any) => {
    changeInput(+e.target.getAttribute('name') + 1);
    const copy = [...verifyCode];
    copy[+e.target.getAttribute('name')] = e.target.value;
    setVerifyCode(copy);
  };
  const handleDelete = (e: any) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const stateCopy = [...verifyCode];
      stateCopy[+e.target.getAttribute('name')] = '';
      setVerifyCode(stateCopy);
      changeInput(+e.target.getAttribute('name') - 1);
    }
  };
  return (
    <div ref={inputsRef} className='verify-code-inputs'>
      {inputData.map((input) => (
        <Input
          type='number'
          onKeyDown={handleDelete}
          name={input.name.toString()}
          key={input.name}
          maxLength={1}
          className='verify-code__code-input'
          onChange={handleChange}
          value={verifyCode[input.name]}
        />
      ))}
    </div>
  );
};

export default VerifyCodeInput;
