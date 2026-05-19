import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useAutoAdvance from './useAutoAdvance';

// JSDOM에서 실제 input을 만들어 ref에 연결하기 위한 헬퍼
const createInputs = (count: number): HTMLInputElement[] => {
  const inputs: HTMLInputElement[] = [];
  for (let i = 0; i < count; i += 1) {
    const input = document.createElement('input');
    document.body.appendChild(input);
    inputs.push(input);
  }
  return inputs;
};

const cleanupInputs = (inputs: HTMLInputElement[]) => {
  inputs.forEach((input) => input.remove());
};

describe('useAutoAdvance', () => {
  it('cellMaxLength에 도달하면 다음 input으로 focus를 옮긴다', () => {
    const inputs = createInputs(2);
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 2 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[0].focus();
    });

    expect(document.activeElement).toBe(inputs[0]);

    act(() => {
      result.current.onChange(0, '12'); // cellMaxLength=2 도달
    });

    expect(document.activeElement).toBe(inputs[1]);
    cleanupInputs(inputs);
  });

  it('cellMaxLength 미달이면 focus 이동하지 않는다', () => {
    const inputs = createInputs(2);
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 2 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[0].focus();
    });

    act(() => {
      result.current.onChange(0, '1'); // cellMaxLength=2 미달
    });

    expect(document.activeElement).toBe(inputs[0]);
    cleanupInputs(inputs);
  });

  it('cellMaxLength를 초과한 입력(paste 등)도 다음으로 focus를 옮긴다 (>= 비교 보장)', () => {
    const inputs = createInputs(2);
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 1 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[0].focus();
    });

    act(() => {
      result.current.onChange(0, '12'); // cellMaxLength=1 초과
    });

    expect(document.activeElement).toBe(inputs[1]);
    cleanupInputs(inputs);
  });

  it('빈 칸에서 Backspace를 누르면 이전 input으로 focus를 옮긴다', () => {
    const inputs = createInputs(2);
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 2 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[1].focus();
    });

    const event = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true });
    Object.defineProperty(event, 'currentTarget', { value: inputs[1] });

    act(() => {
      result.current.onKeyDown(1, event as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(document.activeElement).toBe(inputs[0]);
    cleanupInputs(inputs);
  });

  it('값이 있는 input에서 Backspace는 focus 이동하지 않는다', () => {
    const inputs = createInputs(2);
    inputs[1].value = '5';
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 2 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[1].focus();
    });

    const event = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true });
    Object.defineProperty(event, 'currentTarget', { value: inputs[1] });

    act(() => {
      result.current.onKeyDown(1, event as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(document.activeElement).toBe(inputs[1]);
    cleanupInputs(inputs);
  });

  it('첫 번째 input에서 Backspace는 이전이 없으므로 그대로 둔다', () => {
    const inputs = createInputs(2);
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 2 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[0].focus();
    });

    const event = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true });
    Object.defineProperty(event, 'currentTarget', { value: inputs[0] });

    act(() => {
      result.current.onKeyDown(0, event as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(document.activeElement).toBe(inputs[0]);
    cleanupInputs(inputs);
  });

  it('마지막 input에서 cellMaxLength 도달해도 다음이 없으므로 그대로 둔다', () => {
    const inputs = createInputs(2);
    const { result } = renderHook(() => useAutoAdvance({ length: 2, cellMaxLength: 2 }));

    act(() => {
      result.current.register(0)(inputs[0]);
      result.current.register(1)(inputs[1]);
      inputs[1].focus();
    });

    act(() => {
      result.current.onChange(1, '12');
    });

    expect(document.activeElement).toBe(inputs[1]);
    cleanupInputs(inputs);
  });
});
