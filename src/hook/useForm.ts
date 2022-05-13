import { FormEvent, FormEventHandler, useState } from 'react';

type event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const useForm = (submitFunction: any) => {
  const [values, setValues] = useState<any>({});

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
