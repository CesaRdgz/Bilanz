import { Factura } from '../../types'
import { useTranslation } from 'react-i18next'

interface Props {
  factura: Factura | null
  onConfirmar: () => void
  onCancelar: () => void
}

const ConfirmacionEliminarFactura = ({ factura, onConfirmar, onCancelar }: Props) => {
  const { t } = useTranslation()

  if (!factura) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">{t('factura.confirmar_eliminacion.titulo')}</h2>
        <p className="mb-4">
          {t('factura.confirmar_eliminacion.mensaje')} <strong>{factura.concepto}</strong>?
        </p>
        <div className="flex justify-end gap-2">
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

export default ConfirmacionEliminarFactura