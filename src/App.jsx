import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainNav from './components/NavBar/mainNav';
import Hombres from './pages/Hombres/Hombres';
import Inicio from './pages/Inicio/inicio';
import Carrito from './pages/pagos/Carrito';
import Pedido from './pages/pagos/Pedido';
import { CarritoProvider } from './components/NavBar/CarritoProvider';
import Producto from './pages/producto/Producto';
import Historial from './pages/Historial/historial';
import Footer from './components/Footer/Footer';
import Resultados from './pages/resultadosEncontrados/Resultados';
function App() {
  return (
    <CarritoProvider>
      <Router>
        <MainNav />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Hombres" element={<Hombres />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Pedido" element={<Pedido />} />
          <Route path="/Historial" element={<Historial />} />
          <Route path="/Producto/:productId" element={<Producto />} />
          <Route path="/Resultados/:query" element={<Resultados />} />
        </Routes>
        <Footer />
      </Router>
    </CarritoProvider>
  )
}

export default App;