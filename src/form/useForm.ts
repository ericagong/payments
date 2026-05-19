import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

type SubmitCallback = (values: Record<string, string>) => void;

// 값 자체는 ref로 들고, 리렌더 트리거가 필요한 파생 상태(dirty/touched/errors/isValid)만 setState로 동기화한다.
// 입력 시마다 모든 필드 리렌더가 일어나면 비싸지만, 현재 폼은 작아서 단순함을 우선했다.
const useForm = () => {
  const formDataRef = useRef(new Map<string, string>());
  const dirtyFieldsRef = useRef<Record<string, boolean>>({});
  const touchedFieldsRef = useRef<Record<string, boolean>>({});
  const errorsRef = useRef<Record<string, string>>({});

  const [formState, setFormState] = useState({
    dirtyFields: {} as Record<string, boolean>,
    touchedFields: {} as Record<string, boolean>,
    errors: {} as Record<string, string>,
    isValid: true,
  });

  const syncFormState = () => {
    const dirtyFields = { ...dirtyFieldsRef.current };
    const touchedFields = { ...touchedFieldsRef.current };
    const errors = { ...errorsRef.current };
    const isValid = Object.values(errors).every((e) => e === '');

    setFormState({
      dirtyFields,
      touchedFields,
      errors,
      isValid,
    });
  };

  const getValue = (name: string): string => formDataRef.current.get(name) ?? '';

  const setValue = (name: string, value: string) => {
    formDataRef.current.set(name, value);

    syncFormState();
  };

  const markDirty = (name: string) => {
    dirtyFieldsRef.current[name] = true;

    syncFormState();
  };

  const markTouched = (name: string) => {
    touchedFieldsRef.current[name] = true;

    syncFormState();
  };

  const setError = (name: string, message: string) => {
    errorsRef.current[name] = message;

    syncFormState();
  };

  const handleSubmit = (onSubmit: SubmitCallback) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(formDataRef.current.entries());

    onSubmit(formData);
  };

  return {
    getValue,
    setValue,
    markDirty,
    markTouched,
    setError,
    handleSubmit,
    formState,
  };
};

export default useForm;
export type UseFormReturn = ReturnType<typeof useForm>;
