import { useTranslation } from 'react-i18next'

import FormFactura from '../components/FormFactura';
import { crearFactura } from '../services/facturasService'
import { Factura } from '../types'

const CrearFacturaPage = () => {

  const { t } = useTranslation()
  
  const handleCrear = async (factura: Factura) => {
    const { data, error } = await crearFactura(factura);
    if (error) {
      console.error('Error creando factura:', error)
      alert('Error al crear factura')
    } else {
      const facturaCreada = data as unknown as Factura
      alert('Factura creada con éxito: ' + facturaCreada.numero_factura)
      // Opcional: redirigir a listado de facturas
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{t('facturas.nueva_factura')}</h1>
      <FormFactura onSubmit={handleCrear} />
    </div>
  )
}

export default CrearFacturaPage