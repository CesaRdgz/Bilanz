import { Cliente } from '../types';
import supabase from '../utils/supabase'

  export const crearCliente = async (cliente: Cliente) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert(cliente)
      .single()
  
    return { data, error }
  }