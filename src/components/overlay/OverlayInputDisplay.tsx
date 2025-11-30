import type { HTMLAttributes } from 'react';

import { useOverlayInputContext } from './OverlayInputContext';

type OverlayInputDisplayProps = HTMLAttributes<HTMLDivElement> & {
  split?: number; // e.g. 카드번호 4칸, 비밀번호 2칸 등
};

const OverlayInputDisplay = ({ split, ...props }: OverlayInputDisplayProps) => {
  const { displayValue } = useOverlayInputContext();

  if (!split) {
    return (
      <div className='overlay-display input-box' {...props}>
        {displayValue}
      </div>
    );
  }

  return (
    <div className='overlay-display split-box' {...props}>
      {Array.from({ length: split }).map((_, i) => (
        <span className='split-cell' key={i} data-slot={i}>
          {displayValue[i] ?? ''}
        </span>
      ))}
    </div>
  );
};

export default OverlayInputDisplay;
