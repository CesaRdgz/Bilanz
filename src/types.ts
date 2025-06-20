export interface Factura {
  id?: string;
  emisor_id: string;
  cliente_id: string;
  numero: string;
  fecha_emision: string; // ISO date
  concepto?: string;
  base_imponible: number;
  iva?: number;
  total: number;
  observaciones?: string;
  creado_en: string;
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

export interface Cliente {
  id?: string;
  usuario_id: string;
  tipo_cliente: 'empresa' | 'particular';

  // Comunes
  nombre: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigo_postal?: string;
  pais?: string;
  email?: string;
  telefono?: string;

  // Solo para empresas
  cif?: string;

  // Solo para particulares
  apellidos?: string;
  nif?: string;
}

