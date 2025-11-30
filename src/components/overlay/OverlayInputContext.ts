import { createContext, useContext } from 'react';

type OverlayInputContextValue = {
  rawValue: string;
  onRawValueChange: (next: string) => void;
  displayValue: string;
};

const OverlayInputContext = createContext<OverlayInputContextValue | null>(null);

const useOverlayInputContext = () => {
  const context = useContext(OverlayInputContext);

  if (!context) {
    throw new Error('OverlayInput.* must be used within <OverlayInput.Root>');
  }

  return context;
};

export default OverlayInputContext;
export { useOverlayInputContext };
