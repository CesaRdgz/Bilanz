CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nombre TEXT NOT NULL,
    telefono TEXT,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE emisores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL CHECK (tipo IN ('autonomo', 'empresa')),
    nombre TEXT NOT NULL,
    apellidos TEXT,       -- solo si es autónomo
    nif TEXT,             -- solo si es autónomo
    cif TEXT,             -- solo si es empresa
    direccion_fiscal TEXT,
    ciudad TEXT,
    provincia TEXT,
    codigo_postal TEXT,
    pais TEXT
);

CREATE TABLE empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    cif TEXT NOT NULL,
    direccion TEXT,
    ciudad TEXT,
    provincia TEXT,
    codigo_postal TEXT,
    pais TEXT,
    email TEXT,
    telefono TEXT
);

CREATE TABLE facturas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emisor_id UUID REFERENCES emisores(id) ON DELETE CASCADE,
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    numero TEXT NOT NULL,
    fecha_emision DATE NOT NULL,
    concepto TEXT,
    base_imponible NUMERIC(10, 2) NOT NULL,
    iva NUMERIC(5, 2) DEFAULT 21.00,
    total NUMERIC(10, 2),
    observaciones TEXT,
    creado_en TIMESTAMP DEFAULT NOW()
);
