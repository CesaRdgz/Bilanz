import { useTranslation } from 'react-i18next'
import bcrypt from 'bcryptjs'

import { useState } from "react"
import { Usuario } from "../types"
import { encriptar } from '../utils/encryption'

interface Props {
  onSubmit: (usuario: Usuario) => void
}

const FormUsuario = ({ onSubmit }: Props) => {

  const { t } = useTranslation()

  const [usuario, setUsuario] = useState<Usuario>({
    email: '',
    nombre: '',
    password: '',
    telefono: '',
  })

  if (usuario.telefono) {
    usuario.telefono = encriptar(usuario.telefono);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUsuario(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Hashear contraseña antes de enviar
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(usuario.password || '', salt)

    // Crea nuevo objeto con la contraseña hasheada y el dni y cif encriptados
    const usuarioConHashEncriptado: Usuario = {
      ...usuario,
      password
    }

    onSubmit(usuarioConHashEncriptado)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-gray-700">{t('usuarios.nombre')}</label>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">{t('usuarios.email')}</label>
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">{t('usuarios.telefono')}</label>
        <input
          type="text"
          name="telefono"
          value={usuario.telefono}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          
        />
      </div>
      <div>
        <label className="block text-gray-700">{t('usuarios.contraseña')}</label>
        <input
          type="password"
          name="password"
          value={usuario.password}
          onChange={handleChange}
          className="mt-1 block w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('usuarios.crear_usuario')}
      </button>
    </form>
  )
}

export default FormUsuario
