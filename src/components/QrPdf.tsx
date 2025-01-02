import React from 'react';
import { QRCode } from 'react-qrcode-logo';

interface QRCodeDisplayProps {
  password: string;
  qrValue: string;
  clearQRCode: () => void;
  generatePassword: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ password, qrValue, clearQRCode, generatePassword }) => {
  return (
    <div className="password-container">
      <p className="password">{password}</p>
      <QRCode value={qrValue} size={256} />
      <button onClick={clearQRCode} className="clear-button">QR-Code löschen</button>
      <button onClick={generatePassword} className="generate-button">Passwort generieren</button>
    </div>
  );
};

export default QRCodeDisplay;