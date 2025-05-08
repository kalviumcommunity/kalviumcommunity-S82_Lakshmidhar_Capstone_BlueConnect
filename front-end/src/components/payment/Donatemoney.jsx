import React from 'react';
import QRCode from 'react-qr-code';


const DonateMoney = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-8">
      <h1 className="text-2xl font-semibold mb-4">Donate via QR Code</h1>
      <p className="mb-4 text-gray-600">Scan the QR code below to support us 💙</p>

      <div className="p-4 bg-white rounded shadow">
        <QRCode value="upi://pay?pa=demo@upi&pn=BlueConnect&am=100" size={200} />
      </div>

      <p className="mt-4 text-gray-500 text-sm">This is a demo. No real payment is made.</p>
    </div>
  );
};

export default DonateMoney;
