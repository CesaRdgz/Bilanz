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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuarios/nuevo" element={<CrearUsuarioPage />} />
        <Route path="/usuarios/CrearEmisor" element={<CrearEmisorPage/>} />
        <Route path="/cliente/CrearCliente" element={<CrearClientePage />} />
        <Route path="/facturas/nueva" element={<CrearFacturaPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App