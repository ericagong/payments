import { createBrowserRouter } from 'react-router-dom';

import CardRegisterPage from './pages/CardRegisterPage';
import CardListPage from './pages/CardListPage';
import RegisteredPage from './pages/RegisteredPage';

const router = createBrowserRouter([
  { path: '/', element: <CardRegisterPage /> },
  { path: '/register', element: <CardRegisterPage /> },
  { path: '/list', element: <CardListPage /> },
  { path: '/registered', element: <RegisteredPage /> },
]);

export default router;
