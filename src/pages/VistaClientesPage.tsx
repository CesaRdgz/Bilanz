import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Cliente } from '../types'
import { eliminarCliente, obtenerClientes } from '../services/clienteService'
import ConfirmacionEliminarCliente from '../components/Clientes/ConfirmacionEliminarCliente'
import TablaClientes from '../components/Clientes/TablaClientes'
import BuscadorClientes from '../components/Clientes/BuscadorClientes'

// Importa el ícono de React Icons
import { FaPlusCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const VistaClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(null)
  const navigate = useNavigate()

  const { t } = useTranslation()

  useEffect(() => {
    const cargarClientes = async () => {
      const { data, error } = await obtenerClientes()
      if (data) setClientes(data)
    }
    cargarClientes()
  }, [])

  const filtrados = clientes.filter(cliente =>
    (cliente.nombre + ' ' + (cliente.apellidos || '')).toLowerCase().includes(busqueda.toLowerCase())
  )

  const confirmarEliminacion = async () => {
    if (!clienteAEliminar) return
    await eliminarCliente(clienteAEliminar.id!)
    setClientes(clientes.filter(c => c.id !== clienteAEliminar.id))
    setClienteAEliminar(null)
  }

  const cancelarEliminacion = () => {
    setClienteAEliminar(null)
  }

  const empresas = clientes.filter(c => c.tipo_cliente === 'empresa')
  const particulares = clientes.filter(c => c.tipo_cliente === 'particular')

  // Función para redirigir al formulario de creación de empresa
  const handleCrearEmpresa = () => {
    navigate('/cliente/CrearCliente')
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

      {/* Botón para crear empresa */}
      <div className="mb-4 flex justify-start">
        <button
          onClick={handleCrearEmpresa}
          className="flex items-center justify-center w-40 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200"
        >
          {/* Icono de "+" rodeado por un círculo */}
          <FaPlusCircle className="w-6 h-6 mr-2" /> {t('cliente.boton.nuevo_cliente')}
        </button>
      </div>

      {/* Tablas de empresas y particulares */}
      <div className="flex flex-col md:flex-row gap-6">
        {empresas.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">{t('cliente.titulo')}</h2>
            <TablaClientes
              datos={empresas}
              columnas={[
                t('cliente.datos.nombre'),
                t('cliente.datos.cif'),
                t('cliente.datos.telefono'),
                t('cliente.datos.email'),
              ]}
              onEliminar={(cliente) => setClienteAEliminar(cliente)}
              onEditar={(cliente) => console.log("Editar", cliente)}
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
              onEliminar={(cliente) => setClienteAEliminar(cliente)}
              onEditar={(cliente) => console.log("Editar", cliente)}
            />
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar cliente */}
      <ConfirmacionEliminarCliente
        cliente={clienteAEliminar}
        onConfirmar={confirmarEliminacion}
        onCancelar={cancelarEliminacion}
      />
    </div>
  )
}

export default VistaClientesPage
