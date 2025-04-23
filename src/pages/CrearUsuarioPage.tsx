import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';

import FormUsuario from "../components/FormUsuario";
import { crearUsuario } from "../services/usuarioService";
import { Usuario } from "../types";

const CrearUsuarioPage = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleCrear = async (usuario: Usuario) => {
      const { data, error } = await crearUsuario(usuario)
    
      if (error || data !== null) {
        console.error('Error creando usuario:', error)
        alert('Error al crear usuario')
        return
      }
      navigate('/login')
    }
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">{t('usuarios.nuevo_usuario')}</h1>
        <FormUsuario onSubmit={handleCrear} />
      </div>
    )
  }
  
  export default CrearUsuarioPage