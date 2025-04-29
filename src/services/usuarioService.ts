import { Usuario } from '../types';
import supabase from '../utils/supabase'

  export const crearUsuario = async (usuario: Usuario) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert(usuario)
      .single()
  
    return { data, error }
  }

  export const editarUsuario = async (usuario: Usuario, id: string) => {
    const { data, error } = await supabase
      .from('usuarios')
      .update({
        email: usuario.email,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        password: usuario.password, // Solo actualizamos si la contraseña fue modificada
      })
      .eq('id', id) // Suponiendo que tienes un campo id para identificar al usuario
  
    return { data, error }
  }