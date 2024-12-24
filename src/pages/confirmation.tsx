import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Confirmation() {
  return (
    <div>
      <Helmet>
        <title>Xác nhận đơn hàng</title>
      </Helmet>
      {/* Rest of the component */}
    </div>
  );
}