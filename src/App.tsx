import './index.css';
import './i18n';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CrearUsuarioPage from './pages/CrearUsuarioPage'
import CrearFacturaPage from './pages/CrearFacturaPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import CrearClientePage from './pages/CrearClientePage';
import CrearEmisorPage from './pages/CrearEmisorPage';
import VistaClientesPage from './pages/VistaClientesPage';
import EditarClientePage from './pages/EditarClientePage';
import VistaFacturasPage from './pages/VistaFacturaPage';
import EditarFacturaPage from './pages/EditarFacturaPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuarios/nuevo" element={<CrearUsuarioPage />} />
        <Route path="/usuarios/CrearEmisor" element={<CrearEmisorPage/>} />
        <Route path="/cliente/CrearCliente" element={<CrearClientePage />} />
        <Route path="/cliente/VistaClientes" element={<VistaClientesPage />} />
        <Route path="/cliente/EditarCliente/:id" element={<EditarClientePage />} />
        <Route path="/facturas/VistaFacturas" element={<VistaFacturasPage />} />
        <Route path="/facturas/nueva" element={<CrearFacturaPage />} />
        <Route path="/facturas/editar/:id" element={<EditarFacturaPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App