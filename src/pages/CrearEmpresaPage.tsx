import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

import { Empresa } from "../types";
import { crearEmpresa } from '../services/empresaService';
import FormEmpresa from '../components/FormEmpresa';

const CrearEmpresaPage = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleCrear = async (empresa: Empresa) => {
      const { data, error } = await crearEmpresa(empresa)
    
      if (error || data !== null) {
        console.error('Error creando empresa:', error)
        alert('Error al crear empresa')
        return
      }
      navigate('/dashboard')
    }
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">{t('empresas.nuevo_empresa')}</h1>
        <FormEmpresa onSubmit={handleCrear} />
      </div>
    )
  }
  
  export default CrearEmpresaPage