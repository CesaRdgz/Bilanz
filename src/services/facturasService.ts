import { Factura } from '../types';
import supabase from '../utils/supabase'

  export const crearFactura = async (factura: Factura) => {
    const { data, error } = await supabase
      .from('facturas')
      .insert(factura)
      .single()
  
    return { data, error }
  }

