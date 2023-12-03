import React from 'react';
import logo from '../assets/logo.svg';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ fontSize: '30px', fontWeight: 'bold' }}>BIENVENIDO A VENDO TODO!</p>
      <p style={{ fontSize: '24px', fontWeight: 'Ginebra' }}>Disfruta de la nueva experiencia</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '300px', display: 'block' }} />
      </div>
      <p style={{ fontSize: '15px', fontWeight: 'Helvetica' }}>No te olvides crear una cuenta antes de inciar sesion</p>
    </div>
  );
}

export default HomePage;
