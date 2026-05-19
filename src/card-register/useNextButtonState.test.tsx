import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, it } from 'vitest';

import useNextButtonState from './useNextButtonState';

import { FormProvider, useFormContext } from '@/form/FormContext';


// FormContext 안에서 hook을 실행하기 위한 래퍼
const FormWrapper = ({ children }: PropsWithChildren) => <FormProvider>{children}</FormProvider>;

// 필수 6개 필드를 모두 채운다 (정상 케이스 기준값)
const fillAllRequiredFields = (form: ReturnType<typeof useFormContext>) => {
  form.setValue('cardNumber', '1234567812345678');
  form.setValue('month', '12');
  form.setValue('year', '26');
  form.setValue('securityCode', '123');
  form.setValue('firstPasswordDigit', '1');
  form.setValue('secondPasswordDigit', '2');
};

describe('useNextButtonState', () => {
  it('아무 값도 채워지지 않으면 isAllRequiredComplete가 false다', () => {
    const { result } = renderHook(() => useNextButtonState(), { wrapper: FormWrapper });
    expect(result.current.isAllRequiredComplete).toBe(false);
  });

  it('필수 6개 필드를 모두 채우면 isAllRequiredComplete가 true다', () => {
    const { result } = renderHook(
      () => {
        const form = useFormContext();
        const state = useNextButtonState();
        return { form, state };
      },
      { wrapper: FormWrapper },
    );

    act(() => {
      fillAllRequiredFields(result.current.form);
    });

    expect(result.current.state.isAllRequiredComplete).toBe(true);
  });

  it('카드번호가 16자리 미만이면 false다', () => {
    const { result } = renderHook(
      () => {
        const form = useFormContext();
        const state = useNextButtonState();
        return { form, state };
      },
      { wrapper: FormWrapper },
    );

    act(() => {
      fillAllRequiredFields(result.current.form);
      result.current.form.setValue('cardNumber', '123456781234567'); // 15자리
    });

    expect(result.current.state.isAllRequiredComplete).toBe(false);
  });

  it('월이 0이면 false다 (1~12 범위)', () => {
    const { result } = renderHook(
      () => {
        const form = useFormContext();
        const state = useNextButtonState();
        return { form, state };
      },
      { wrapper: FormWrapper },
    );

    act(() => {
      fillAllRequiredFields(result.current.form);
      result.current.form.setValue('month', '00');
    });

    expect(result.current.state.isAllRequiredComplete).toBe(false);
  });

  it('월이 13이면 false다 (1~12 범위 초과)', () => {
    const { result } = renderHook(
      () => {
        const form = useFormContext();
        const state = useNextButtonState();
        return { form, state };
      },
      { wrapper: FormWrapper },
    );

    act(() => {
      fillAllRequiredFields(result.current.form);
      result.current.form.setValue('month', '13');
    });

    expect(result.current.state.isAllRequiredComplete).toBe(false);
  });

  it('비밀번호 한 자리만 비어도 false다', () => {
    const { result } = renderHook(
      () => {
        const form = useFormContext();
        const state = useNextButtonState();
        return { form, state };
      },
      { wrapper: FormWrapper },
    );

    act(() => {
      fillAllRequiredFields(result.current.form);
      result.current.form.setValue('secondPasswordDigit', '');
    });

    expect(result.current.state.isAllRequiredComplete).toBe(false);
  });

  it('소유자 이름은 선택이므로 비어 있어도 true다', () => {
    const { result } = renderHook(
      () => {
        const form = useFormContext();
        const state = useNextButtonState();
        return { form, state };
      },
      { wrapper: FormWrapper },
    );

    act(() => {
      fillAllRequiredFields(result.current.form);
      // ownerName은 set하지 않음
    });

    expect(result.current.state.isAllRequiredComplete).toBe(true);
  });
});
