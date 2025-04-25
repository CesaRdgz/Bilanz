import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
    const emisor = JSON.parse(localStorage.getItem('emisor') || '{}')
    const navigate = useNavigate()
    const { t } = useTranslation()

  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido, {usuario.nombre }</h1>
        <h1 className="text-2xl font-bold"> {usuario.email}</h1>
        <h1 className="text-2xl font-bold"> {usuario.id}</h1>
        <h1 className="text-2xl font-bold"> {emisor.id}</h1>
        <p className="mt-4 text-gray-600">Esta es tu área privada.</p>

        
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 mr-4"
      onClick={() => navigate('/facturas/nueva')}>
        Crear Factura
      </button>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 mr-4"
      onClick={() => navigate('/usuarios/CrearEmisor')}>
        Rellenar datos de facturación
      </button>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      onClick={() => navigate('/cliente/vistaClientes')}>
        {t('cliente.titulo')}
      </button>
      </div>
    )
  }
  
  export default DashboardPage
  