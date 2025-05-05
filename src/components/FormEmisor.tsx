// FormEmisor.tsx

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Emisor } from '../types'
import { desencriptar, encriptar } from '../utils/encryption'
import { obtenerEmisorPorUsuario, crearEmisor, actualizarEmisor } from '../services/emisorService'
import { ToastContainer, toast } from 'react-toastify'

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
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const cargarEmisor = async () => {
      const { data, error } = await obtenerEmisorPorUsuario(usuario.id)
      if (data) {
        setEmisor({
          ...data,
          nif: data.nif ? desencriptar(data.nif) : '',
          cif: data.cif ? desencriptar(data.cif) : '',
        })
        setIsEditing(true)
      } else if (error) {
        console.error(error)
      }
    }
    cargarEmisor()
  }, [usuario.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmisor(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emisorAEnviar = {
      ...emisor,
      nif: emisor.nif ? encriptar(emisor.nif) : '',
      cif: emisor.cif ? encriptar(emisor.cif) : '',
    }

    const { data, error } = isEditing
      ? await actualizarEmisor(emisorAEnviar)
      : await crearEmisor(emisorAEnviar)

    if (data) {
      onSubmit(data)
      localStorage.setItem('emisor', JSON.stringify(data))
      toast.success(isEditing ? t('emisor.actualizado_exito') : t('emisor.guardado_exito'))
    } else if (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>{t('emisor.tipo_emisor')}</label>
        <select name="tipo" value={emisor.tipo} onChange={handleChange} className="w-full border rounded p-2">
          <option value="autonomo">{t('emisor.autonomo')}</option>
          <option value="empresa">{t('emisor.empresa')}</option>
        </select>
      </div>

      <div>
        <label>{t('emisor.nombre')}</label>
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
            <label>{t('emisor.apellidos')}</label>
            <input
              type="text"
              name="apellidos"
              value={emisor.apellidos}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label>{t('emisor.nif')}</label>
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
          <label>{t('emisor.cif')}</label>
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
        <label>{t('emisor.direccion_fiscal')}</label>
        <textarea
          name="direccion_fiscal"
          value={emisor.direccion_fiscal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('emisor.ciudad')}</label>
        <input
          type="text"
          name="ciudad"
          value={emisor.ciudad}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('emisor.provincia')}</label>
        <input
          type="text"
          name="provincia"
          value={emisor.provincia}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('emisor.codigo_postal')}</label>
        <input
          type="text"
          name="codigo_postal"
          value={emisor.codigo_postal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('emisor.pais')}</label>
        <input
          type="text"
          name="pais"
          value={emisor.pais}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEditing ? t('emisor.actualizar') : t('emisor.guardar')}
      </button>

      <ToastContainer />
    </form>
  )
}

export default FormEmisor
