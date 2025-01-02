import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import './App.css';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [started, setStarted] = useState(false);

  const generatePassword = () => {
    const chars = 'ABCDÖEFGHöIJKLMñÑNOPQRSTUVWüXÜYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let newPassword = '';
    for (let i = 0; i < 16; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    setQrValue(newPassword);
  };

  useEffect(() => {
    if (started) {
      generatePassword();
    }
  }, [started]);

  const clearQRCode = () => {
    setQrValue('');
    setPassword('');
    setStarted(false);
  };

  return (
    <div className="container">
      <h1>QR-Code Passwort Generator</h1>
      {!started ? (
        <button onClick={() => setStarted(true)} className="start-button">Start</button>
      ) : (
        <>
          <button onClick={generatePassword} className="generate-button">Passwort generieren</button>
          {password && (
            <div className="password-container">
              <p className="password">{password}</p>
              <QRCode value={qrValue} size={256} />
              <button onClick={clearQRCode} className="clear-button">QR-Code löschen</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;