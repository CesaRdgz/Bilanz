import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Emisor } from '../types'
import { encriptar } from '../utils/encryption'

interface Props {
  onSubmit: (emisor: Emisor) => void
}

const FormEmisor = ({ onSubmit }: Props) => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const { t } = useTranslation()

  const [emisor, setEmisor] = useState<Emisor>({
    usuario_id: usuario.id,
    tipo: 'autonomo',
    nombre: '',
    apellidos: '',
    nif: '',
    cif: '',
    direccion_fiscal: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    pais: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmisor(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emisor.cif) {
      emisor.cif = encriptar(emisor.cif);
    }
    if (emisor.nif) {
      emisor.nif = encriptar(emisor.nif);
    }
    onSubmit(emisor)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>{t('Tipo de emisor')}</label>
        <select name="tipo" value={emisor.tipo} onChange={handleChange} className="w-full border rounded p-2">
          <option value="autonomo">{t('Autónomo')}</option>
          <option value="empresa">{t('Empresa')}</option>
        </select>
      </div>

      <div>
        <label>{t('Nombre')}</label>
        <input
          type="text"
          name="nombre"
          value={emisor.nombre}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {emisor.tipo === 'autonomo' && (
        <>
          <div>
            <label>{t('Apellidos')}</label>
            <input
              type="text"
              name="apellidos"
              value={emisor.apellidos}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label>{t('NIF / DNI')}</label>
            <input
              type="text"
              name="nif"
              value={emisor.nif}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </>
      )}

      {emisor.tipo === 'empresa' && (
        <div>
          <label>{t('CIF')}</label>
          <input
            type="text"
            name="cif"
            value={emisor.cif}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      )}

      <div>
        <label>{t('Dirección fiscal')}</label>
        <textarea
          name="direccion_fiscal"
          value={emisor.direccion_fiscal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Ciudad')}</label>
        <input
          type="text"
          name="ciudad"
          value={emisor.ciudad}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Provincia')}</label>
        <input
          type="text"
          name="provincia"
          value={emisor.provincia}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('Código postal')}</label>
        <input
          type="text"
          name="codigo_postal"
          value={emisor.codigo_postal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('País')}</label>
        <input
          type="text"
          name="pais"
          value={emisor.pais}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {t('Guardar emisor')}
      </button>
    </form>
  )
}

export default FormEmisor
