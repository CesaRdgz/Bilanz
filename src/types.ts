export interface Factura {
  numero_factura: string;
  fecha_emision: string;   
  fecha_vencimiento?: string;
  estado?: 'borrador' | 'enviada' | 'pagada' | 'vencida';
  subtotal?: number;
  iva_total?: number;
  total?: number;
  notas?: string;
  company_id?: string;
  user_id?: string;
}

export interface Usuario {
  id?: string;
  email: string;
  password: string;
  nombre: string;
  telefono?: string;
  creado_en?: string;
}

export interface Emisor {
  id?: string;
  usuario_id: string;
  tipo: 'autonomo' | 'empresa';
  nombre: string;
  apellidos?: string;
  nif?: string;
  cif?: string;
  direccion_fiscal?: string;
  ciudad?: string;
  provincia?: string;
  codigo_postal?: string;
  pais?: string;
}

export interface Empresa {
  id?: string;
  usuario_id: string;
  nombre: string;
  cif: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigo_postal?: string;
  pais?: string;
  email?: string;
  telefono?: string;
}
