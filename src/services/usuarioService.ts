import { Usuario } from '../types';
import supabase from '../utils/supabase'

  export const crearUsuario = async (usuario: Usuario) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert(usuario)
      .single()
  
    return { data, error }
  }