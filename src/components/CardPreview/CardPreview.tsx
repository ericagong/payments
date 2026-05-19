import { useFormContext } from '@/contexts/FormContext';
import { formatCardNumber, maskAfterEighth } from '@/features/register/cardNumberFormat';

import './card-preview.scss';

// 폼 입력값을 실시간으로 카드 디자인에 반영한다.
const CardPreview = () => {
  const form = useFormContext();

  const cardNumber = form.getValue('cardNumber');
  const month = form.getValue('month');
  const year = form.getValue('year');
  const ownerName = form.getValue('ownerName');

  // 미리보기 표시 정책은 CardNumberField와 동일해야 하므로 같은 format/mask 함수를 재사용한다.
  const cardNumberDisplay = cardNumber ? maskAfterEighth(formatCardNumber(cardNumber)) : '';
  const expiryDisplay = month || year ? `${month || 'MM'} / ${year || 'YY'}` : '';

  return (
    <div className='card-box'>
      <div className='empty-card'>
        <div className='card-top'>
          {cardNumberDisplay ? (
            <span className='card-text'>{cardNumberDisplay}</span>
          ) : (
            <span className='card-text card-text-placeholder'>XXXX-XXXX-XXXX-XXXX</span>
          )}
        </div>
        <div className='card-middle'>
          <div className='small-card-chip' />
        </div>
        <div className='card-bottom'>
          <div className='card-bottom-info'>
            {ownerName ? (
              <span className='card-text'>{ownerName}</span>
            ) : (
              <span className='card-text card-text-placeholder'>NAME</span>
            )}
            {expiryDisplay ? (
              <span className='card-text'>{expiryDisplay}</span>
            ) : (
              <span className='card-text card-text-placeholder'>MM / YY</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
