import { useNavigate } from 'react-router-dom';

import Button from '@/primitives/Button';

import './card-list-page.scss';

const CardListPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className='app-header'>
        <div className='title'>보유 카드</div>
      </header>
      <main className='app-main app-main--centered'>
        <p className='empty-card-message'>등록된 카드가 없습니다.</p>
        <Button
          type='button'
          className='card-add-button'
          aria-label='카드 추가'
          onClick={() => navigate('/register')}
        >
          +
        </Button>
      </main>
    </>
  );
};

export default CardListPage;
