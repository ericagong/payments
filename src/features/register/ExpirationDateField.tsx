import { useState, useRef } from 'react';

import Input from '@/components/primitives/Input';

import './field.scss';

const ExpirationDateField = () => {
  return (
    <div className='overlay-container'>
      {/* <Input ref={monthRef} value={month.value} onChange={month.onChange} /> */}
      {/* <Input ref={yearRef} value={year} /> */}
      {/* <div className='display' onClick={handleDisplayClick}>
        {displayValue}
      </div> */}
    </div>
  );
};

export default ExpirationDateField;
