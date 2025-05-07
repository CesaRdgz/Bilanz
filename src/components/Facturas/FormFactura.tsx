import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Cliente, Factura } from '../../types'
import supabase from '../../utils/supabase'
import { editarFactura, crearFactura } from '../../services/facturasService'
import { desencriptar } from '../../utils/encryption'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {
  onSubmit: (factura: Factura) => void
}

const FormFactura = ({ onSubmit }: Props) => {
  const { t } = useTranslation()
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const emisor = JSON.parse(localStorage.getItem('emisor') || '{}')
  const navigate = useNavigate()
  const { id } = useParams() // Obtiene el ID de la factura desde la URL

  const [factura, setFactura] = useState<Factura>({
    emisor_id: emisor.id,
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
    const fetchFactura = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('facturas')
          .select('*')
          .eq('id', id)
          .single()
  
        if (data) {
          setFactura(data)
          const cliente = clientes.find(cliente => cliente.id === data.cliente_id) || null
          setClienteSeleccionada(cliente)
          setBusqueda(
            cliente ? cliente.nombre + (cliente.apellidos ? ' ' + cliente.apellidos : '') : ''
          )
        } else {
          console.error('Error al obtener la factura', error)
        }
      }
    }
    fetchFactura()
  }, [id, clientes])
  

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
    let data, error
    if (id) {
      // Si estamos editando, actualizamos la factura
      const { data: updatedData, error: updateError } = await editarFactura(id, factura)
      data = updatedData
      error = updateError
    } else {
      // Si es una nueva factura, creamos
      const { data: createdData, error: createError } = await crearFactura(factura)
      data = createdData
      error = createError
    }

    if (!error) onSubmit(data as unknown as Factura)
    else console.error(error)
    navigate('/facturas/VistaFacturas')
  }

  const clientesFiltradas = clientes.filter(cli =>
    cli.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow relative"
    >
      <div ref={dropdownRef} className="relative">
        <label className="block text-gray-700">
          {t("cliente.datos.nombre")}
        </label>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setDropdownVisible(true);
          }}
          onFocus={() => setDropdownVisible(true)}
          className="w-full border rounded p-2"
          placeholder={t("cliente.placeholder.buscar_cliente")}
        />
        {dropdownVisible && clientesFiltradas.length > 0 && (
          <ul className="absolute z-10 border rounded mt-1 bg-white w-full max-h-60 overflow-y-auto shadow">
            {/* Empresas */}
            {clientesFiltradas.some(
              (cli) => cli.tipo_cliente === "empresa"
            ) && (
              <>
                <li className="px-3 py-2 bg-gray-100 text-gray-700 font-semibold sticky top-0">
                  {t("cliente.empresas")}
                </li>
                {clientesFiltradas
                  .filter((cli) => cli.tipo_cliente === "empresa")
                  .map((cli) => (
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

            {/* Particulares */}
            {clientesFiltradas.some(
              (cli) => cli.tipo_cliente === "particular"
            ) && (
              <>
                <li className="px-3 py-2 bg-gray-100 text-gray-700 font-semibold sticky top-0">
                  {t("cliente.particulares")}
                </li>
                {clientesFiltradas
                  .filter((cli) => cli.tipo_cliente === "particular")
                  .map((cli) => (
                    <li
                      key={cli.id}
                      onClick={() => handleClienteSelect(cli)}
                      className="cursor-pointer px-3 py-2 hover:bg-blue-100"
                    >
                      {cli.nombre + (cli.apellidos ? " " + cli.apellidos : "")}
                    </li>
                  ))}
              </>
            )}
          </ul>
        )}
      </div>

      {clienteSeleccionada &&
        clienteSeleccionada.tipo_cliente === "empresa" && (
          <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700">
            <p>
              <strong>{t("cliente.datos.cif")}:</strong>{" "}
              {desencriptar(clienteSeleccionada.cif!)}
            </p>
            <p>
              <strong>{t("cliente.datos.direccion")}:</strong>{" "}
              {clienteSeleccionada.direccion}
            </p>
            <p>
              <strong>{t("cliente.datos.ciudad")}:</strong>{" "}
              {clienteSeleccionada.ciudad}
            </p>
            <p>
              <strong>{t("cliente.datos.provincia")}:</strong>{" "}
              {clienteSeleccionada.provincia}
            </p>
            <p>
              <strong>{t("cliente.datos.pais")}:</strong>{" "}
              {clienteSeleccionada.pais}
            </p>
          </div>
        )}

      {clienteSeleccionada &&
        clienteSeleccionada.tipo_cliente === "particular" && (
          <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700">
            <p>
              <strong>{t("cliente.datos.nif")}:</strong>{" "}
              {desencriptar(clienteSeleccionada.nif!)}
            </p>
            <p>
              <strong>{t("cliente.datos.direccion")}:</strong>{" "}
              {clienteSeleccionada.direccion}
            </p>
            <p>
              <strong>{t("cliente.datos.ciudad")}:</strong>{" "}
              {clienteSeleccionada.ciudad}
            </p>
            <p>
              <strong>{t("cliente.datos.provincia")}:</strong>{" "}
              {clienteSeleccionada.provincia}
            </p>
            <p>
              <strong>{t("cliente.datos.pais")}:</strong>{" "}
              {clienteSeleccionada.pais}
            </p>
          </div>
        )}

      {/* Otros campos del formulario */}
      <div>
        <label className="block text-gray-700">
          {t("factura.numero_factura")}
        </label>
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
        <label className="block text-gray-700">
          {t("factura.fecha_emision")}
        </label>
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
        <label className="block text-gray-700">{t("factura.concepto")}</label>
        <textarea
          name="concepto"
          value={factura.concepto}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700">
          {t("factura.base_imponible")}
        </label>
        <input
          type="number"
          name="base_imponible"
          value={factura.base_imponible}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">{t("factura.iva_total")}</label>
        <input
          type="number"
          name="iva"
          value={factura.iva}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          disabled
        />
      </div>

      <div>
        <label className="block text-gray-700">{t("factura.total")}</label>
        <input
          type="number"
          name="total"
          value={factura.total}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          disabled
        />
      </div>

      <div>
        <label className="block text-gray-700">
          {t("factura.observaciones")}
        </label>
        <textarea
          name="observaciones"
          value={factura.observaciones}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
        ></textarea>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          {id ? t("boton.editar") : t("boton.crear")}
        </button>
      </div>
    </form>
  );
}

export default FormFactura
