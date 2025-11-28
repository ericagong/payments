import { useNavigate } from 'react-router-dom';

const Page3 = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>3️⃣ 카드 추가 - 입력 완료</h2>
      <div className='root'>
        <div className='app'>
          <h2 className='page-title'>카드 추가</h2>

          <div className='card-box'>
            <div className='small-card'>
              <div className='card-top'>
                <span className='card-text'>클린카드</span>
              </div>
              <div className='card-middle'>
                <div className='small-card-chip' />
              </div>
              <div className='card-bottom'>
                <div className='card-bottom-number'>
                  <span className='card-text'>1111 - 2222 - oooo - oooo</span>
                </div>
                <div className='card-bottom-info'>
                  <span className='card-text'>YUJO</span>
                  <span className='card-text'>12 / 23</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className='input-container'>
            <span className='input-title'>카드 번호</span>
            <div className='input-box'>
              <input className='input-basic' type='text' value='1111' readOnly />
              <input className='input-basic' type='text' value='2222' readOnly />
              <input className='input-basic' type='password' value='1111' readOnly />
              <input className='input-basic' type='password' value='1111' readOnly />
            </div>
          </div>

          <div className='input-container'>
            <span className='input-title'>만료일</span>
            <div className='input-box w-50'>
              <input className='input-basic' type='text' value='12' readOnly />
              <input className='input-basic' type='text' value='23' readOnly />
            </div>
          </div>

          <div className='input-container'>
            <span className='input-title'>카드 소유자 이름(선택)</span>
            <input className='input-basic' value='YUJO' readOnly />
          </div>

          <div className='input-container'>
            <span className='input-title'>보안코드(CVC/CVV)</span>
            <input className='input-basic w-25' type='password' value='111' readOnly />
          </div>

          <div className='input-container'>
            <span className='input-title'>카드 비밀번호</span>
            {Array.from({ length: 4 }).map((_, i) => (
              <input key={i} className='input-basic w-15' type='password' value='1' readOnly />
            ))}
          </div>

          <div className='button-box' onClick={() => navigate('/add/done')}>
            <span className='button-text'>다음</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page3;
