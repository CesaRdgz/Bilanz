import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

import { Emisor } from "../types";
import { crearEmisor } from '../services/emisorService';
import FormEmisor from '../components/FormEmisor';

const CrearEmisorPage = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()
 
    const handleFacturar = async (emisor: Emisor) => {
        const { data, error } = await crearEmisor(emisor)
      
        if (error || data !== null) {
          console.error('Error creando emisor:', error)
          alert('Error al crear emisor')
          return
        }
        navigate('/dashboard')
      }
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">{t('usuarios.nuevo_usuario')}</h1>
        <FormEmisor onSubmit={handleFacturar} />
      </div>
    )
  }
  
  export default CrearEmisorPage