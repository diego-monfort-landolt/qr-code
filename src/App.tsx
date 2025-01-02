import React, { useState, useEffect } from 'react';


import './App.css';
import QRCodeDisplay from './components/QrPdf';
import jsPDF from 'jspdf';

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

  const displayQRCodeInBrowser = () => {
    const doc = new jsPDF();
    const qrElement = document.querySelector('canvas');
    if (qrElement) {
      const qrDataUrl = qrElement.toDataURL('image/png');
      doc.addImage(qrDataUrl, 'PNG', 10, 10, 180, 180);
    }
    const pdfWindow = window.open(doc.output('bloburl'), '_blank');
    if (pdfWindow) {
      pdfWindow.document.write(`
        <style>
          body {
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          button {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
          }
        </style>
        <button onclick="window.close()">Zurück</button>
        <embed src="${doc.output('datauristring')}" type="application/pdf" width="100%" height="100%">
      `);
    }
  };

  return (
    <div className="container">
      <h1>QR-Code Passwort Generator</h1>
      {!started ? (
        <button onClick={() => setStarted(true)} className="start-button">Start</button>
      ) : (
        <>
          <QRCodeDisplay password={password} qrValue={qrValue} clearQRCode={clearQRCode} generatePassword={generatePassword} />
          <button onClick={displayQRCodeInBrowser} className="display-button">QR-Code als PDF anzeigen</button>
        </>
      )}
    </div>
  );
};

export default App;