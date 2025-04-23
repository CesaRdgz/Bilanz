import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../services/authService'

const LoginPage = () => {
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
        nombre: usuario.nombre
      }

      localStorage.setItem('usuario', JSON.stringify(usuarioParaGuardar))
      navigate('/dashboard') // Página protegida (en blanco por ahora)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
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
          Entrar
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/usuarios/nuevo')}
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default LoginPage
