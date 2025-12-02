import { useState, useCallback } from 'react';

type UseInputsParams = {
  length: number;
};

const useInputs = ({ length }: UseInputsParams) => {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(''));

  const setValue = useCallback((index: number, value: string) => {
    setValues((prevValues) => {
      const nextValues = [...prevValues];
      nextValues[index] = value;
      return nextValues;
    });
  }, []);

  return { values, setValue };
};

export default useInputs;
