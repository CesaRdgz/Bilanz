import { useTranslation } from 'react-i18next'

import { Emisor } from "../types";
import FormEmisor from '../components/FormEmisor';

const CrearEmisorPage = () => {
  const { t } = useTranslation();

  // Este se llama SOLO si el emisor fue creado correctamente
  const handleFacturar = (emisor: Emisor) => {
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{t('usuario.nuevo_usuario')}</h1>
      <FormEmisor onSubmit={handleFacturar} />
    </div>
  );
};

export default CrearEmisorPage;
