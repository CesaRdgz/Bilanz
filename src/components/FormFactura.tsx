import { useTranslation } from 'react-i18next'

import { useState } from 'react'
import { Factura } from '../types'

interface Props {
  onSubmit: (factura: Factura) => void
}

const FormFactura = ({ onSubmit }: Props) => {

  const { t } = useTranslation()

  const [factura, setFactura] = useState<Factura>({
    numero_factura: '',
    fecha_emision: new Date().toISOString().split('T')[0],
    fecha_vencimiento: undefined,
    estado: 'borrador',
    subtotal: 0,
    iva_total: 0,
    total: 0,
    notas: '',
    company_id: undefined,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFactura(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(factura)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-gray-700">{t('facturas.numero_factura')}</label>
        <input
          type="text"
          name="numero_factura"
          value={factura.numero_factura}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">{t('facturas.fecha_emision')}</label>
        <input
          type="date"
          name="fecha_emision"
          value={factura.fecha_emision}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>
      {/* Puedes añadir más campos: fecha_vencimiento, notas, etc. */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('facturas.crear_factura')}
      </button>
    </form>
  )
}

export default FormFactura