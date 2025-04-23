import { Empresa } from '../types';
import supabase from '../utils/supabase'

  export const crearEmpresa = async (empresa: Empresa) => {
    const { data, error } = await supabase
      .from('empresas')
      .insert(empresa)
      .single()
  
    return { data, error }
  }