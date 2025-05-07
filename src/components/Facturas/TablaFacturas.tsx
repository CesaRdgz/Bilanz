import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Cliente, Factura } from '../../types'

interface Props {
  datos: Factura[]
  clientes: Cliente[] // Recibe la lista de clientes
  columnas: string[]
  onEliminar: (factura: Factura) => void
  onEditar: (id: string) => void
}

const TablaFacturas = ({ datos, clientes, columnas, onEliminar, onEditar }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Función para obtener el nombre del cliente por su ID
  const obtenerNombreCliente = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId)
    return cliente ? cliente.nombre : 'Cliente no encontrado'
  }

  // Función para manejar la edición
  const handleEditar = (id: string) => {
    if (id) {
      navigate(`/facturas/editar/${id}`)
    } else {
      console.error('ID de la factura no encontrado')
    }
  }

  // Función para manejar la creación de una nueva factura
  const handleNuevaFactura = () => {
    navigate('/factura/nueva')
  }

  return (
    <div>
      <div className="overflow-x-auto rounded shadow border mb-6 w-full">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              {columnas.map(col => (
                <th key={col} className="px-4 py-2 font-semibold">{col}</th>
              ))}
              <th className="px-4 py-2">{t('boton.editar')}</th>
              <th className="px-4 py-2">{t('boton.eliminar')}</th>
            </tr>
          </thead>
          <tbody>
            {datos.length === 0 ? (
              <tr>
                <td colSpan={columnas.length + 2} className="px-4 py-6 text-center text-gray-500">
                  {t('tabla.mensaje.sin_datos')}
                </td>
              </tr>
            ) : (
              datos.map(factura => (
                <tr key={factura.id || Math.random()} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{obtenerNombreCliente(factura.cliente_id)}</td>
                  <td className="px-4 py-2">{factura.fecha_emision}</td>
                  <td className="px-4 py-2">{factura.base_imponible}</td>
                  <td className="px-4 py-2">{factura.iva}</td>
                  <td className="px-4 py-2">{factura.total}</td>
                  <td className="px-4 py-2">{factura.concepto}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditar(factura.id!)}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      ✏️
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onEliminar(factura)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaFacturas
