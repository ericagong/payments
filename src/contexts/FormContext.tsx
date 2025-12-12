import { createContext, useContext } from 'react';
import type { PropsWithChildren } from 'react';

import useForm from '@/hooks/atomic/useForm';

type FormContextValue = ReturnType<typeof useForm> | null;

const FormContext = createContext<FormContextValue>(null);

type FormProviderProps = PropsWithChildren<object>;

const FormProvider = ({ children }: FormProviderProps) => {
  const form = useForm();

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used inside <FormProvider>');
  }

  return context;
};

export { FormProvider, useFormContext };
