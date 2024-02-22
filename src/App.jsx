import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainNav from './components/NavBar/mainNav';
import Hombres from './pages/Hombres/Hombres';
import Inicio from './pages/Inicio/inicio';
import Carrito from './pages/pagos/Carrito';
import Pedido from './pages/pagos/Pedido';

function App() {

  return (
    <Router>
      <MainNav />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Hombres" element={<Hombres />} /> 
        <Route path="/Carrito" element={<Carrito />} /> 
        <Route path="/Pedido" element={<Pedido />} /> 
      </Routes>
    </Router>
  )
}

export default App
