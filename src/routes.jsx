import { DashboardPage } from './pages/dashboard';
import { AuthPage } from './pages/auth';
import { HotelPage } from './pages/hotel';

export const routes = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/hotel', element: <HotelPage /> },
  { path: '/*', element: <DashboardPage /> }
];
