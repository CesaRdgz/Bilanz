import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Cliente } from '../../types'
import { desencriptar } from '../../utils/encryption'

interface Props {
  datos: Cliente[]
  columnas: string[]
  onEliminar: (cliente: Cliente) => void
}

const TablaClientes = ({ datos, columnas, onEliminar }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleEditar = (id: string) => {
    navigate(`/cliente/EditarCliente/${id}`)
  }

  return (
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
          {datos.map(cli => (
            <tr key={cli.id} className="border-t hover:bg-gray-50">
              {cli.tipo_cliente === 'empresa' ? (
                <>
                  <td className="px-4 py-2">{cli.nombre}</td>
                  <td className="px-4 py-2">{desencriptar(cli.cif!)}</td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2">{cli.nombre} {cli.apellidos}</td>
                  <td className="px-4 py-2">{desencriptar(cli.nif!)}</td>
                </>
              )}
              <td className="px-4 py-2">{cli.telefono}</td>
              <td className="px-4 py-2">{cli.email}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEditar(cli.id!)}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                >
                  ✏️
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEliminar(cli)}
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaClientes
