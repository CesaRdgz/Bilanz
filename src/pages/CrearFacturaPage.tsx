import { useTranslation } from 'react-i18next'

import FormFactura from '../components/Clientes/FormFactura';
import { Factura } from '../types'
import { useNavigate } from 'react-router-dom';

const CrearFacturaPage = () => {

  const { t } = useTranslation()
  const navigate = useNavigate()

  
  const handleCrear = async (factura: Factura) => {
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{t('factura.nueva_factura')}</h1>
      <FormFactura onSubmit={handleCrear} />
    </div>
  )
}

export default CrearFacturaPage