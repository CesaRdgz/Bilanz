import { useTranslation } from "react-i18next"
import { Cliente } from "../../types"

interface Props {
    cliente: Cliente | null
    onConfirmar: () => void
    onCancelar: () => void
  }
  
  const ConfirmacionEliminarCliente = ({ cliente, onConfirmar, onCancelar }: Props) => {
    if (!cliente) return null

    const { t } = useTranslation()
    
  
    const nombre = cliente.tipo_cliente === 'empresa'
      ? cliente.nombre
      : `${cliente.nombre} ${cliente.apellidos}`
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded p-6 shadow-md max-w-sm w-full">
          <p className="mb-4 text-center">
          {t('cliente.popup.eliminar_cliente')} <strong>{nombre}</strong>?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onCancelar}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              {t('boton.no')}
            </button>
            <button
              onClick={onConfirmar}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              {t('boton.si')}
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default ConfirmacionEliminarCliente
  