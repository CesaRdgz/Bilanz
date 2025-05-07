import { Factura } from '../types'
import supabase from '../utils/supabase'

// Crear una nueva factura
export const crearFactura = async (factura: Factura) => {
  const { data, error } = await supabase
    .from('facturas')
    .insert(factura)
    .single()

  return { data, error }
}

// Obtener todas las facturas
export const obtenerFacturas = async () => {
  const { data, error } = await supabase
    .from('facturas')
    .select('*') // Puedes ajustar los campos que necesites
    .order('fecha_emision', { ascending: false }) // Ordena por fecha, de más reciente a más antiguo

  return { data, error }
}

// Obtener una factura por su ID
export const obtenerFacturaPorId = async (id: string) => {
  const { data, error } = await supabase
    .from('facturas')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

// Eliminar una factura
export const eliminarFactura = async (id: string) => {
  const { data, error } = await supabase
    .from('facturas')
    .delete()
    .eq('id', id)

  return { data, error }
}

// Editar una factura
export const editarFactura = async (id: string, factura: Factura) => {
  const { data, error } = await supabase
    .from('facturas')
    .update(factura)
    .eq('id', id)
    .single()

  return { data, error }
}


