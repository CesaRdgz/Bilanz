import { Emisor } from '../types';
import supabase from '../utils/supabase'

  export const crearEmisor = async (emisor: Emisor) => {
    const { data, error } = await supabase
      .from('emisores')
      .insert(emisor)
      .single()
  
    return { data, error }
  }

  export const obtenerEmisorPorUsuario = async (usuario_id: string) => {
    const { data, error } = await supabase
      .from('emisores')
      .select('*')
      .eq('usuario_id', usuario_id)
      .single(); // Si solo puede haber un emisor por usuario
  
    return { data, error };
  }