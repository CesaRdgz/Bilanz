import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

import { Cliente } from "../types";
import { crearCliente } from '../services/clienteService';
import FormCliente from '../components/Clientes/FormCliente';

const CrearClientePage = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleCrear = async (cliente: Cliente) => {
      const { data, error } = await crearCliente(cliente)
    
      if (error || data !== null) {
        console.error('Error creando cliente:', error)
        alert('Error al crear cliente')
        return
      }
      navigate('/dashboard')
    }
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">{t('cliente.boton.nuevo_cliente')}</h1>
        <FormCliente onSubmit={handleCrear} />
      </div>
    )
  }
  
  export default CrearClientePage