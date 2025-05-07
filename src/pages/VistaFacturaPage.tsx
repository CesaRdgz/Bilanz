import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import TablaFacturas from '../components/Facturas/TablaFacturas'
import ConfirmacionEliminarFactura from '../components/Facturas/ConfirmacionEliminarFactura'
import { Cliente, Factura } from '../types'
import { eliminarFactura, obtenerFacturas } from '../services/facturasService'
import { obtenerClientes } from '../services/clienteService'

const VistaFacturasPage = () => {
  const [facturas, setFacturas] = useState<Factura[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [facturaAEliminar, setFacturaAEliminar] = useState<Factura | null>(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const cargarFacturas = async () => {
      const { data } = await obtenerFacturas()
      if (data) setFacturas(data)
    }

    const cargarClientes = async () => {
      const { data } = await obtenerClientes()
      if (data) setClientes(data)
    }

    cargarFacturas()
    cargarClientes()
  }, [])

  const handleEliminar = (factura: Factura) => {
    setFacturaAEliminar(factura)
  }

  const confirmarEliminacion = async () => {
    if (!facturaAEliminar) return
    await eliminarFactura(facturaAEliminar.id!)
    setFacturas(facturas.filter(f => f.id !== facturaAEliminar.id))
    setFacturaAEliminar(null)
    navigate('/facturas/VistaFacturas')
  }

  const cancelarEliminacion = () => {
    setFacturaAEliminar(null)
  }

  const handleEditar = (id: string) => {
    navigate(`/factura/editar/${id}`)
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-start">
        <button
          onClick={() => navigate('/facturas/nueva')}
          className="flex items-center justify-center w-40 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
        >
          <FaPlusCircle className="w-6 h-6 mr-2" /> {t('factura.boton.nueva_factura')}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{t('factura.titulo')}</h2>
          <TablaFacturas
            datos={facturas}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
            clientes={clientes}
            columnas={[
              t('factura.datos.cliente'),
              t('factura.datos.fecha'),
              t('factura.datos.base_imponible'),
              t('factura.datos.iva'),
              t('factura.datos.total'),
              t('factura.datos.concepto'),
            ]}
          />
        </div>
      </div>

      <ConfirmacionEliminarFactura
        factura={facturaAEliminar}
        onConfirmar={confirmarEliminacion}
        onCancelar={cancelarEliminacion}
      />
    </div>
  )
}

export default VistaFacturasPage
