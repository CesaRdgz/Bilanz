import { Emisor } from '../types';
import supabase from '../utils/supabase'

  export const crearEmisor = async (emisor: Emisor) => {
    const { data, error } = await supabase
      .from('emisores')
      .insert(emisor)
      .single()
  
    return { data, error }
  }