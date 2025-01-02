import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import './App.css';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [started, setStarted] = useState(false);

   // Funktion zur Generierung eines sicheren Passworts
  const generatePassword = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()';
    const umlautChars = 'öüñ';
    const allChars = upperChars + lowerChars + numberChars + specialChars + umlautChars;
  
    let newPassword = '';
    // Füge mindestens einen Großbuchstaben, Kleinbuchstaben, Zahl, Sonderzeichen und Umlaut hinzu
    newPassword += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
    newPassword += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
    newPassword += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    newPassword += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    newPassword += umlautChars.charAt(Math.floor(Math.random() * umlautChars.length));
  
    // Fülle das restliche Passwort mit zufälligen Zeichen auf
    for (let i = 5; i < 24; i++) {
      newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    // Mische das Passwort, um die Reihenfolge der Zeichen zu randomisieren
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');

    // Setze das generierte Passwort und den QR-Code-Wert
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