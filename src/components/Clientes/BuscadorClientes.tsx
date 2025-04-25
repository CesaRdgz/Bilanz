import { useTranslation } from 'react-i18next'
import { Cliente } from '../../types'
import { useRef } from 'react'

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
      {visible && clientesFiltrados.length > 0 && (
        <ul className="absolute z-10 border rounded mt-1 bg-white w-full max-h-60 overflow-y-auto shadow">
          {clientesFiltrados.map(cli => (
            <li
              key={cli.id}
              className="cursor-pointer px-3 py-2 hover:bg-blue-100"
            >
              {cli.tipo_cliente === 'empresa'
                ? cli.nombre
                : `${cli.nombre} ${cli.apellidos}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BuscadorClientes
