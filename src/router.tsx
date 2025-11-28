import { createBrowserRouter } from 'react-router-dom';

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';

const router = createBrowserRouter([
  { path: '/', element: <Page1 /> },
  { path: '/add', element: <Page2 /> },
  { path: '/add/confirm', element: <Page3 /> },
  { path: '/add/done', element: <Page4 /> },
  { path: '/list', element: <Page5 /> },
]);

export default router;
