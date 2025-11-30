import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import Input from '../primitives/Input';

import { useOverlayInputContext } from './OverlayInputContext';

type OverlayInputRawProps = InputHTMLAttributes<HTMLInputElement>;

const OverlayInputRaw = forwardRef<HTMLInputElement, OverlayInputRawProps>((props, ref) => {
  const { rawValue, onRawValueChange } = useOverlayInputContext();

  return (
    <Input
      className='overlay-raw input-box'
      {...props}
      ref={ref}
      value={rawValue}
      onChange={(e) => onRawValueChange(e.target.value)}
    />
  );
});

OverlayInputRaw.displayName = 'OverlayInputRaw';

export default OverlayInputRaw;
