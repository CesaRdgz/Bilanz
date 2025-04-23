import supabase from '../utils/supabase'
import bcrypt from 'bcryptjs'
import { Usuario } from '../types'

export const loginUsuario = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !data) {
    return { error: 'Usuario no encontrado', usuario: null }
  }

  const match = await bcrypt.compare(password, data.password)

  if (!match) {
    return { error: 'Contraseña incorrecta', usuario: null }
  }

  const usuario: Usuario = {
    id: data.id,
    email: data.email,
    nombre: data.nombre,
    password: data.password,
    telefono: data.telefono,
  }

  return { usuario, error: null }
}