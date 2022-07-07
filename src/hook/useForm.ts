import { FormEvent, useState } from 'react';

type event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const useForm = (submitFunction: () => void, defaultValue: any = {}) => {
  const [values, setValues] = useState<any>(defaultValue);

  const handleChange = (e: event): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunction();
  };

  return { values, handleChange, handleSubmit };
};

export default useForm;
