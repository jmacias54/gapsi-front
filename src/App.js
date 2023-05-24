import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ModalIndex from './components/ModalIndex';
import Providers from './components/Providers';

function App() {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const abrirTabla = () => {
    setMostrarTabla(true);
  };

  const cerrarTabla = () => {
    setMostrarTabla(false);
  };

  return (
    <div>
      {!mostrarTabla ? (
        <ModalIndex closeModal={abrirTabla} />
      ) : (
        <div>
          <Button variant="contained" color="primary" onClick={cerrarTabla}>
            Volver
          </Button>
          <Providers />
        </div>
      )}
    </div>
  );
}

export default App;
