import { useTranslation } from 'react-i18next'
import FormFactura from '../components/Facturas/FormFactura'

const EditarFacturaPage = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold">{t('factura.editar')}</h2>
      <FormFactura onSubmit={() => {}} />
    </div>
  )
}

export default EditarFacturaPage
