import { useTranslation } from 'react-i18next'
import { Cliente } from '../../types'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  busqueda: string
  setBusqueda: (valor: string) => void
  clientesFiltrados: Cliente[]
  visible: boolean
  setVisible: (v: boolean) => void
}

const BuscadorClientes = ({
  busqueda,
  setBusqueda,
  clientesFiltrados,
  visible,
  setVisible
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const navigate = useNavigate()

  // 🔵 Separar empresas y particulares
  const empresas = clientesFiltrados.filter(cli => cli.tipo_cliente === 'empresa')
  const particulares = clientesFiltrados.filter(cli => cli.tipo_cliente === 'particular')

  const handleSeleccionCliente = (clienteId: string) => {
    navigate(`/cliente/EditarCliente/${clienteId}`)
  }

  return (
    <div className="relative mb-4">
      <input
        ref={inputRef}
        type="text"
        placeholder={t('cliente.placeholder.buscar_cliente')}
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        onFocus={() => setVisible(true)}
        onBlur={() => setTimeout(() => setVisible(false), 200)}
        className="w-full border rounded px-3 py-2"
      />
      {visible && (empresas.length > 0 || particulares.length > 0) && (
        <ul className="absolute z-10 border rounded mt-1 bg-white w-full max-h-60 overflow-y-auto shadow">
          {/* Mostrar empresas si hay */}
          {empresas.length > 0 && (
            <>
              <li className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-100">
                {t('cliente.empresa')}
              </li>
              {empresas.map(cli => (
                <li
                  key={cli.id}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                  onMouseDown={() => handleSeleccionCliente(cli.id!)}
                >
                  {cli.nombre}
                </li>
              ))}
            </>
          )}

          {/* Mostrar particulares si hay */}
          {particulares.length > 0 && (
            <>
              <li className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase bg-gray-100">
                {t('cliente.particular')}
              </li>
              {particulares.map(cli => (
                <li
                  key={cli.id}
                  className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                  onMouseDown={() => handleSeleccionCliente(cli.id!)}
                >
                  {cli.nombre} {cli.apellidos}
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  )
}

export default BuscadorClientes
