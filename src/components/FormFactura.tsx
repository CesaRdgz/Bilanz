import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cliente, Factura } from '../types'
import supabase from '../utils/supabase'
import { crearFactura } from '../services/facturasService'
import { desencriptar } from '../utils/encryption'

interface Props {
  onSubmit: (factura: Factura) => void
}

const FormFactura = ({ onSubmit }: Props) => {
  const { t } = useTranslation()
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  const [factura, setFactura] = useState<Factura>({
    emisor_id: usuario.id,
    cliente_id: '',
    numero: '',
    fecha_emision: new Date().toISOString().split('T')[0],
    concepto: '',
    base_imponible: 0,
    iva: 0,
    total: 0,
    observaciones: '',
    creado_en: new Date().toISOString(),
  })

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [clienteSeleccionada, setClienteSeleccionada] = useState<Cliente | null>(null)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('usuario_id', usuario.id)

      if (!error && data) setClientes(data)
    }
    fetchClientes()
  }, [usuario.id])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'base_imponible') {
      const base = parseFloat(value) || 0
      const iva = +(base * 0.21).toFixed(2)
      const total = +(base + iva).toFixed(2)
      setFactura(prev => ({
        ...prev,
        base_imponible: base,
        iva,
        total,
      }))
    } else {
      setFactura(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleClienteSelect = (cliente: Cliente) => {
    setClienteSeleccionada(cliente)
    setBusqueda(cliente.nombre)
    setDropdownVisible(false)
    setFactura(prev => ({ ...prev, cliente_id: cliente.id! }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await crearFactura(factura)
    if (!error) onSubmit(data as unknown as Factura)
    else console.error(error)
  }

  const clientesFiltradas = clientes.filter(cli =>
    cli.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow relative">
      <div ref={dropdownRef} className="relative">
        <label className="block text-gray-700">{t('Cliente destinataria')}</label>
        <input
          type="text"
          value={busqueda}
          onChange={e => {
            setBusqueda(e.target.value)
            setDropdownVisible(true)
          }}
          onFocus={() => setDropdownVisible(true)}
          className="w-full border rounded p-2"
          placeholder={t('Escribe para buscar...')}
        />
          {dropdownVisible && clientesFiltradas.length > 0 && (
            <ul className="absolute z-10 border rounded mt-1 bg-white w-full max-h-60 overflow-y-auto shadow">
              
              {/* Particulares */}
              {clientesFiltradas.some(cli => cli.tipo_cliente === 'particular') && (
                <>
                  <li className="px-3 py-2 bg-gray-100 text-gray-700 font-semibold sticky top-0">
                    {t('Particulares')}
                  </li>
                  {clientesFiltradas
                    .filter(cli => cli.tipo_cliente === 'particular')
                    .map(cli => (
                      <li
                        key={cli.id}
                        onClick={() => handleClienteSelect(cli)}
                        className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                      >
                        {cli.nombre + (cli.apellidos ? ' ' + cli.apellidos : '')}
                      </li>
                    ))}
                </>
              )}

              {/* Empresas */}
              {clientesFiltradas.some(cli => cli.tipo_cliente === 'empresa') && (
                <>
                  <li className="px-3 py-2 bg-gray-100 text-gray-700 font-semibold sticky top-0">
                    {t('Empresas')}
                  </li>
                  {clientesFiltradas
                    .filter(cli => cli.tipo_cliente === 'empresa')
                    .map(cli => (
                      <li
                        key={cli.id}
                        onClick={() => handleClienteSelect(cli)}
                        className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                      >
                        {cli.nombre}
                      </li>
                    ))}
                </>
              )}
            </ul>
          )}
      </div>

      {clienteSeleccionada && clienteSeleccionada.tipo_cliente === 'empresa' && (
        <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700">
          <p><strong>{t('CIF')}:</strong> {desencriptar(clienteSeleccionada.cif!)}</p>
          <p><strong>{t('Dirección')}:</strong> {clienteSeleccionada.direccion}</p>
          <p><strong>{t('Ciudad')}:</strong> {clienteSeleccionada.ciudad}</p>
          <p><strong>{t('Provincia')}:</strong> {clienteSeleccionada.provincia}</p>
          <p><strong>{t('Pais')}:</strong> {clienteSeleccionada.pais}</p>
        </div>
      )}

      {clienteSeleccionada && clienteSeleccionada.tipo_cliente === 'particular' && (
        <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700">
          <p><strong>{t('CIF')}:</strong> {desencriptar(clienteSeleccionada.nif!)}</p>
          <p><strong>{t('Dirección')}:</strong> {clienteSeleccionada.direccion}</p>
          <p><strong>{t('Ciudad')}:</strong> {clienteSeleccionada.ciudad}</p>
          <p><strong>{t('Provincia')}:</strong> {clienteSeleccionada.provincia}</p>
          <p><strong>{t('Pais')}:</strong> {clienteSeleccionada.pais}</p>
        </div>
      )}

      <div>
        <label className="block text-gray-700">{t('Número de factura')}</label>
        <input
          type="text"
          name="numero"
          value={factura.numero}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">{t('Fecha de emisión')}</label>
        <input
          type="date"
          name="fecha_emision"
          value={factura.fecha_emision}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">{t('Concepto')}</label>
        <input
          type="text"
          name="concepto"
          value={factura.concepto || ''}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">{t('Base imponible')}</label>
        <input
          type="number"
          step="0.01"
          name="base_imponible"
          value={factura.base_imponible}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">{t('IVA')}</label>
        <input
          type="number"
          name="iva"
          value={factura.iva || 0}
          readOnly
          className="mt-1 block w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-gray-700">{t('Total')}</label>
        <input
          type="number"
          name="total"
          value={factura.total}
          readOnly
          className="mt-1 block w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-gray-700">{t('Observaciones')}</label>
        <textarea
          name="observaciones"
          value={factura.observaciones || ''}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('Crear factura')}
      </button>
    </form>
  )
}

export default FormFactura
