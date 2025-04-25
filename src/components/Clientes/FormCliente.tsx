import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Cliente } from '../../types'
import { encriptar } from '../../utils/encryption'


interface Props {
  onSubmit: (cliente: Cliente) => void
}

const FormCliente = ({ onSubmit }: Props) => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const { t } = useTranslation()

  const [cliente, setCliente] = useState<Cliente>({
    usuario_id: usuario.id,
    tipo_cliente: 'particular',
    nombre: '',
    apellidos: '',
    nif: '',
    cif: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    pais: '',
    email: '',
    telefono: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setCliente(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cliente.cif) cliente.cif = encriptar(cliente.cif)
    if (cliente.nif) cliente.nif = encriptar(cliente.nif)
    onSubmit(cliente)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>{t('cliente.datos.tipo_cliente')}</label>
        <select
          name="tipo_cliente"
          value={cliente.tipo_cliente}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="particular">{t('cliente.particular')}</option>
          <option value="empresa">{t('cliente.empresa')}</option>
        </select>
      </div>

      <div>
        <label>{t('cliente.datos.nombre')}</label>
        <input
          type="text"
          name="nombre"
          value={cliente.nombre}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {cliente.tipo_cliente === 'particular' && (
        <>
          <div>
            <label>{t('cliente.datos.apellidos')}</label>
            <input
              type="text"
              name="apellidos"
              value={cliente.apellidos}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label>{t('cliente.datos.nif')}</label>
            <input
              type="text"
              name="nif"
              value={cliente.nif}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </>
      )}

      {cliente.tipo_cliente === 'empresa' && (
        <div>
          <label>{t('cliente.datos.cif')}</label>
          <input
            type="text"
            name="cif"
            value={cliente.cif}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      )}

      <div>
        <label>{t('cliente.datos.direccion')}</label>
        <textarea
          name="direccion"
          value={cliente.direccion}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('cliente.datos.ciudad')}</label>
        <input
          type="text"
          name="ciudad"
          value={cliente.ciudad}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('cliente.datos.provincia')}</label>
        <input
          type="text"
          name="provincia"
          value={cliente.provincia}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('cliente.datos.codigo_postal')}</label>
        <input
          type="text"
          name="codigo_postal"
          value={cliente.codigo_postal}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('cliente.datos.pais')}</label>
        <input
          type="text"
          name="pais"
          value={cliente.pais}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('cliente.datos.email')}</label>
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label>{t('cliente.datos.telefono')}</label>
        <input
          type="text"
          name="telefono"
          value={cliente.telefono}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {t('cliente.boton.guardar_cliente')}
      </button>
    </form>
  )
}

export default FormCliente
