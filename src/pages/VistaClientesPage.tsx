import { Cliente } from '../types'  // Asegúrate de importar el tipo Cliente
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerClientes, eliminarCliente } from '../services/clienteService'
import { FaPlusCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import TablaClientes from '../components/Clientes/TablaClientes'
import ConfirmacionEliminarCliente from '../components/Clientes/ConfirmacionEliminarCliente'
import BuscadorClientes from '../components/Clientes/BuscadorClientes'

const VistaClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [dropdownVisible, setDropdownVisible] = useState(false)


  useEffect(() => {
    const cargarClientes = async () => {
      const { data, error } = await obtenerClientes()
      if (data) setClientes(data)
    }
    cargarClientes()
  }, [])

  const empresas = clientes.filter(c => c.tipo_cliente === 'empresa')
  const particulares = clientes.filter(c => c.tipo_cliente === 'particular')

  const filtrados = clientes.filter(cliente =>
    (cliente.nombre + ' ' + (cliente.apellidos || '')).toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleEliminar = async (cliente: Cliente) => {
    await eliminarCliente(cliente.id!)
    setClientes(clientes.filter(c => c.id !== cliente.id))
  }

  const handleEditar = (id: string) => {
    navigate(`/cliente/EditarCliente/${id}`)
  }

  const confirmarEliminacion = async () => {
    if (!clienteAEliminar) return
    await eliminarCliente(clienteAEliminar.id!)
    setClientes(clientes.filter(c => c.id !== clienteAEliminar.id))
    setClienteAEliminar(null)
  }

  const cancelarEliminacion = () => {
    setClienteAEliminar(null)
  }

  return (
    <div className="p-4">

      {/* Buscador de clientes */}
      <BuscadorClientes
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        clientesFiltrados={filtrados}
        visible={dropdownVisible}
        setVisible={setDropdownVisible}
      />

      <div className="mb-4 flex justify-start">
        <button
          onClick={() => navigate('/cliente/CrearCliente')}
          className="flex items-center justify-center w-40 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
        >
          <FaPlusCircle className="w-6 h-6 mr-2" /> {t('cliente.boton.nuevo_cliente')}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {empresas.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">{t('cliente.titulo.clientes')}</h2>
            <TablaClientes
              datos={empresas}
              columnas={[
                t('cliente.datos.nombre'),
                t('cliente.datos.cif'),
                t('cliente.datos.telefono'),
                t('cliente.datos.email'),
              ]}
              onEliminar={handleEliminar}
              onEditar={handleEditar} // Pasamos el onEditar
            />
          </div>
        )}

        {particulares.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">{t('cliente.particulares')}</h2>
            <TablaClientes
              datos={particulares}
              columnas={[
                t('cliente.datos.nombre_completo'),
                t('cliente.datos.nif'),
                t('cliente.datos.telefono'),
                t('cliente.datos.email'),
              ]}
              onEliminar={handleEliminar}
              onEditar={handleEditar} // Pasamos el onEditar
            />
          </div>
        )}
      </div>

      <ConfirmacionEliminarCliente
        cliente={clienteAEliminar}
        onConfirmar={confirmarEliminacion}
        onCancelar={cancelarEliminacion}
      />
    </div>
  )
}

export default VistaClientesPage
