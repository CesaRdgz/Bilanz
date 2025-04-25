import { Cliente } from '../types';
import supabase from '../utils/supabase'

  export const crearCliente = async (cliente: Cliente) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert(cliente)
      .single()
  
    return { data, error }
  }

  export const obtenerClientes = async () => {
    return await supabase.from('clientes').select('*')
  }

  export const eliminarCliente = async (id: string) => {
    return await supabase.from('clientes').delete().eq('id', id)
  }