import React from 'react';
import { ReservationList } from '../../components';
import './reservationPage.css';

const ReservationPage = () => {
  return (
    <div className="reservation-page">
      <ReservationList />
    </div>
  );
};

export default ReservationPage;