import { useMemo } from 'react';
import type { ReactNode } from 'react';

import './overlay.scss';
import OverlayInputContext from './OverlayInputContext';

type OverlayInputRootProps = {
  rawValue: string;
  onRawValueChange: (next: string) => void;
  formatFn: (raw: string) => string;
  maskFn: (formatted: string) => string;
  children: ReactNode;
};

const OverlayInputRoot = ({ rawValue, onRawValueChange, formatFn, maskFn, children }: OverlayInputRootProps) => {
  const displayValue = useMemo(() => {
    const formattedValue = formatFn(rawValue);
    const maskedValue = maskFn(formattedValue);

    return maskedValue;
  }, [rawValue, formatFn, maskFn]);

  const contextValue = useMemo(
    () => ({
      rawValue,
      onRawValueChange,
      displayValue,
    }),
    [rawValue, onRawValueChange, displayValue],
  );

  return (
    <OverlayInputContext.Provider value={contextValue}>
      <div className='overlay-container'>{children}</div>
    </OverlayInputContext.Provider>
  );
};

export default OverlayInputRoot;
