import { DashboardPage } from './pages/dashboard';
import { AuthPage } from './pages/auth';
import { HotelPage } from './pages/hotel';
import { RoomPage } from './pages/room';
import { ReservationPage } from './pages/reservation'; 

export const routes = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/hotel', element: <HotelPage /> },
  { path: '/room', element: <RoomPage /> },
  { path: '/reservation', element: <ReservationPage /> }, 
  { path: '/*', element: <DashboardPage /> }
];
