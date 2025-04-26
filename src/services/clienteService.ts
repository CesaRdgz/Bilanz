import { Cliente } from '../types'
import supabase from '../utils/supabase'

// Crear cliente
export const crearCliente = async (cliente: Cliente) => {
  const { data, error } = await supabase
    .from('clientes')
    .insert(cliente)
    .single()

  return { data, error }
}

// Obtener todos los clientes
export const obtenerClientes = async () => {
  return await supabase.from('clientes').select('*')
}

// Obtener cliente por ID (nuevo)
export const obtenerClientePorId = async (id: string) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Cliente
}

// Actualizar cliente (nuevo)
export const actualizarCliente = async (id: string, clienteActualizado: Cliente) => {
  const { data, error } = await supabase
    .from('clientes')
    .update(clienteActualizado)
    .eq('id', id)
    .single()

  return { data, error }
}

// Eliminar cliente
export const eliminarCliente = async (id: string) => {
  return await supabase.from('clientes').delete().eq('id', id)
}
