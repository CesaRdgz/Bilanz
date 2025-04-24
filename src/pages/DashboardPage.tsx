import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
    const navigate = useNavigate()

  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido, {usuario.nombre }</h1>
        <h1 className="text-2xl font-bold"> {usuario.email}</h1>
        <h1 className="text-2xl font-bold"> {usuario.id}</h1>
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
      onClick={() => navigate('/cliente/CrearCliente')}>
        Crear cliente
      </button>
      </div>
    )
  }
  
  export default DashboardPage
  