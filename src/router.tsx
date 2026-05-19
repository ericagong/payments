import { createBrowserRouter } from 'react-router-dom';

import CardListPage from './pages/CardListPage';
import CardRegisterPage from './pages/CardRegisterPage';

// 카드 목록이 출발점. 카드 추가 step 전환은 CardRegisterPage 내부 Stepper가 담당한다.
const router = createBrowserRouter([
  { path: '/', element: <CardListPage /> },
  { path: '/list', element: <CardListPage /> },
  { path: '/register', element: <CardRegisterPage /> },
]);

export default router;
