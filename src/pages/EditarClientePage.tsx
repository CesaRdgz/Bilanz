import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Cliente } from '../types'
import FormCliente from '../components/Clientes/FormCliente'
import { actualizarCliente, obtenerClientePorId } from '../services/clienteService'

const EditarClientePage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [cliente, setCliente] = useState<Cliente | null>(null)

  useEffect(() => {
    if (id) {
      obtenerClientePorId(id)
        .then(setCliente)
        .catch(error => {
          console.error('Error cargando cliente', error)
          navigate('/cliente/VistaClientes')
        })
    }
  }, [id, navigate])

  const handleUpdate = async (clienteActualizado: Cliente) => {
    if (!id) return

    try {
      await actualizarCliente(id, clienteActualizado)
      navigate('/cliente/VistaClientes')
    } catch (error) {
      console.error('Error actualizando cliente', error)
    }
  }

  if (!cliente) {
    return <div>{t('cliente.cargando')}</div>
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{t('cliente.titulo.editar')}</h1>
      <FormCliente onSubmit={handleUpdate} clienteInicial={cliente} />
    </div>
  )
}

export default EditarClientePage
