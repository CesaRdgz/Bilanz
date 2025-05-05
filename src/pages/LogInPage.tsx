import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { loginUsuario } from '../services/authService'
import { obtenerEmisorPorUsuario } from '../services/emisorService'

const LoginPage = () => {
  const { t } = useTranslation() // Hook de traducción
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { usuario, error } = await loginUsuario(email, password)

    if (error) {
      setError(error)
    } else if (usuario) {
      // Asegurarse de guardar solo lo necesario: id, email y nombre
      const usuarioParaGuardar = {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        telefono: usuario.telefono
      }

      const { data, error } = await obtenerEmisorPorUsuario(usuario.id!)

      localStorage.setItem('usuario', JSON.stringify(usuarioParaGuardar))
      if (data) localStorage.setItem('emisor', JSON.stringify(data))

      navigate('/dashboard') // Página protegida (en blanco por ahora)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">{t('login.titulo')}</h1> {/* Traducido */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium">{t('login.email')}</label> {/* Traducido */}
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">{t('login.contraseña')}</label> {/* Traducido */}
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-3"
        >
          {t('login.entrar')} {/* Traducido */}
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/usuarios/nuevo')}
        >
          {t('login.registrarse')} {/* Traducido */}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
