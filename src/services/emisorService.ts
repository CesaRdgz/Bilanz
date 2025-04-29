import { Emisor } from '../types'
import supabase from '../utils/supabase'

// Crear un nuevo emisor
export const crearEmisor = async (emisor: Emisor) => {
  const { data, error } = await supabase
    .from('emisores')
    .insert(emisor)
    .select()
    .single()

  return { data, error }
}

// Obtener un emisor por su usuario_id
export const obtenerEmisorPorUsuario = async (usuario_id: string) => {
  const { data, error } = await supabase
    .from('emisores')
    .select('*')
    .eq('usuario_id', usuario_id)
    .single()

  return { data, error }
}

// Actualizar un emisor existente
export const actualizarEmisor = async (emisor: Emisor) => {
  const { data, error } = await supabase
    .from('emisores')
    .update(emisor)
    .eq('usuario_id', emisor.usuario_id)
    .select()
    .single()

  return { data, error }
}
