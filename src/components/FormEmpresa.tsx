import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Empresa } from '../types'
import { encriptar } from '../utils/encryption'

interface Props {
  onSubmit: (empresa: Empresa) => void
}

const FormEmpresa = ({ onSubmit }: Props) => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const { t } = useTranslation()

  const [empresa, setEmpresa] = useState<Empresa>({
    usuario_id: usuario.id,
    nombre: '',
    cif: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    pais: '',
    email: '',
    telefono: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmpresa(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (empresa.cif) {
      empresa.cif = encriptar(empresa.cif);
    }
    onSubmit(empresa)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>{t('Nombre de la empresa')}</label>
        <input
          type="text"
          name="nombre"
          value={empresa.nombre}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label>{t('CIF')}</label>
        <input
          type="text"
          name="cif"
          value={empresa.cif}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label>{t('Dirección')}</label>
        <textarea
          name="direccion"
          value={empresa.direccion}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Ciudad')}</label>
        <input
          type="text"
          name="ciudad"
          value={empresa.ciudad}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Provincia')}</label>
        <input
          type="text"
          name="provincia"
          value={empresa.provincia}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Código postal')}</label>
        <input
          type="text"
          name="codigo_postal"
          value={empresa.codigo_postal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('País')}</label>
        <input
          type="text"
          name="pais"
          value={empresa.pais}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Correo electrónico')}</label>
        <input
          type="email"
          name="email"
          value={empresa.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Teléfono')}</label>
        <input
          type="text"
          name="telefono"
          value={empresa.telefono}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {t('Guardar empresa')}
      </button>
    </form>
  )
}

export default FormEmpresa
