-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'workshop_owner', 'technician', 'student');
CREATE TYPE maintenance_type AS ENUM ('preventive', 'corrective', 'predictive', 'emergency');
CREATE TYPE maintenance_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE training_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'technician',
    workshop_id UUID REFERENCES workshops(id) ON DELETE SET NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    profile_image TEXT,
    phone VARCHAR(20),
    address JSONB,
    preferences JSONB DEFAULT '{
        "language": "es",
        "timezone": "America/Bogota",
        "notifications": {
            "email": true,
            "push": true,
            "sms": false
        }
    }'::jsonb,
    training_progress JSONB DEFAULT '{
        "completed_modules": [],
        "current_module": null,
        "total_score": 0,
        "last_activity": null
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workshops table
CREATE TABLE workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address JSONB NOT NULL DEFAULT '{
        "street": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "country": "Colombia",
        "coordinates": null
    }'::jsonb,
    contact JSONB NOT NULL DEFAULT '{
        "phone": "",
        "email": "",
        "website": null
    }'::jsonb,
    services TEXT[] DEFAULT '{}',
    specialties TEXT[] DEFAULT '{}',
    certifications JSONB[] DEFAULT '{}',
    operating_hours JSONB DEFAULT '{
        "monday": {"open": "08:00", "close": "18:00", "closed": false},
        "tuesday": {"open": "08:00", "close": "18:00", "closed": false},
        "wednesday": {"open": "08:00", "close": "18:00", "closed": false},
        "thursday": {"open": "08:00", "close": "18:00", "closed": false},
        "friday": {"open": "08:00", "close": "18:00", "closed": false},
        "saturday": {"open": "08:00", "close": "14:00", "closed": false},
        "sunday": {"open": "08:00", "close": "14:00", "closed": true}
    }'::jsonb,
    settings JSONB DEFAULT '{
        "timezone": "America/Bogota",
        "currency": "COP",
        "language": "es",
        "aiEnabled": true,
        "notifications": {
            "email": true,
            "sms": false,
            "push": true
        }
    }'::jsonb,
    statistics JSONB DEFAULT '{
        "totalVehicles": 0,
        "totalMaintenanceRecords": 0,
        "averageRating": 0,
        "totalRevenue": 0,
        "lastActivity": null
    }'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint after workshops table is created
ALTER TABLE users ADD CONSTRAINT fk_users_workshop 
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE SET NULL;

-- Vehicles table
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    vin VARCHAR(17),
    color VARCHAR(30),
    mileage INTEGER,
    fuel_type VARCHAR(20),
    transmission VARCHAR(20),
    engine_size VARCHAR(20),
    owner_name VARCHAR(100),
    owner_phone VARCHAR(20),
    owner_email VARCHAR(255),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(workshop_id, license_plate)
);

-- Maintenance records table
CREATE TABLE maintenance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    technician_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type maintenance_type NOT NULL,
    status maintenance_status NOT NULL DEFAULT 'pending',
    title VARCHAR(200) NOT NULL,
    description TEXT,
    diagnosis TEXT,
    actions_taken TEXT,
    parts_used JSONB[] DEFAULT '{}',
    cost DECIMAL(10,2) DEFAULT 0,
    duration_minutes INTEGER DEFAULT 0,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training modules table
CREATE TABLE training_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty training_difficulty NOT NULL,
    duration_minutes INTEGER NOT NULL,
    lessons JSONB[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_workshop_id ON users(workshop_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

CREATE INDEX idx_workshops_owner_id ON workshops(owner_id);
CREATE INDEX idx_workshops_city ON workshops USING GIN ((address->>'city'));
CREATE INDEX idx_workshops_state ON workshops USING GIN ((address->>'state'));
CREATE INDEX idx_workshops_is_active ON workshops(is_active);

CREATE INDEX idx_vehicles_workshop_id ON vehicles(workshop_id);
CREATE INDEX idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_is_active ON vehicles(is_active);

CREATE INDEX idx_maintenance_workshop_id ON maintenance_records(workshop_id);
CREATE INDEX idx_maintenance_vehicle_id ON maintenance_records(vehicle_id);
CREATE INDEX idx_maintenance_technician_id ON maintenance_records(technician_id);
CREATE INDEX idx_maintenance_status ON maintenance_records(status);
CREATE INDEX idx_maintenance_type ON maintenance_records(type);
CREATE INDEX idx_maintenance_scheduled_date ON maintenance_records(scheduled_date);

CREATE INDEX idx_training_category ON training_modules(category);
CREATE INDEX idx_training_difficulty ON training_modules(difficulty);
CREATE INDEX idx_training_is_active ON training_modules(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workshops_updated_at BEFORE UPDATE ON workshops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_records_updated_at BEFORE UPDATE ON maintenance_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_modules_updated_at BEFORE UPDATE ON training_modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_modules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own profile and users in their workshop
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view workshop members" ON users
    FOR SELECT USING (
        workshop_id IN (
            SELECT id FROM workshops WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Workshop policies
CREATE POLICY "Workshop owners can manage their workshops" ON workshops
    FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Workshop members can view their workshop" ON workshops
    FOR SELECT USING (
        id IN (
            SELECT workshop_id FROM users WHERE id = auth.uid()
        )
    );

-- Vehicle policies
CREATE POLICY "Workshop members can manage vehicles" ON vehicles
    FOR ALL USING (
        workshop_id IN (
            SELECT id FROM workshops WHERE owner_id = auth.uid()
            UNION
            SELECT workshop_id FROM users WHERE id = auth.uid()
        )
    );

-- Maintenance record policies
CREATE POLICY "Workshop members can manage maintenance records" ON maintenance_records
    FOR ALL USING (
        workshop_id IN (
            SELECT id FROM workshops WHERE owner_id = auth.uid()
            UNION
            SELECT workshop_id FROM users WHERE id = auth.uid()
        )
    );

-- Training modules are public for reading
CREATE POLICY "Anyone can view active training modules" ON training_modules
    FOR SELECT USING (is_active = true);

-- Insert sample data
INSERT INTO training_modules (title, description, category, difficulty, duration_minutes, lessons) VALUES
('Fundamentos de Mantenimiento Automotriz', 'Aprende los conceptos básicos del mantenimiento preventivo y correctivo en vehículos.', 'Básico', 'beginner', 120, '[
    {"title": "Introducción al mantenimiento", "duration": 15, "content": "Conceptos básicos"},
    {"title": "Herramientas básicas", "duration": 20, "content": "Uso de herramientas"},
    {"title": "Seguridad en el taller", "duration": 25, "content": "Protocolos de seguridad"},
    {"title": "Sistemas del vehículo", "duration": 30, "content": "Motor, transmisión, frenos"},
    {"title": "Diagnóstico básico", "duration": 30, "content": "Identificación de problemas"}
]'::jsonb),
('Diagnóstico con Herramientas Digitales', 'Domina el uso de escáneres OBD y herramientas de diagnóstico modernas.', 'Tecnología', 'intermediate', 180, '[
    {"title": "Introducción a OBD", "duration": 30, "content": "Sistemas OBD I y II"},
    {"title": "Escáneres profesionales", "duration": 45, "content": "Uso de escáneres"},
    {"title": "Códigos de error", "duration": 40, "content": "Interpretación de códigos"},
    {"title": "Diagnóstico avanzado", "duration": 35, "content": "Análisis de datos"},
    {"title": "Reportes y documentación", "duration": 30, "content": "Generación de reportes"}
]'::jsonb),
('Mantenimiento Predictivo con IA', 'Aprende a usar la inteligencia artificial para predecir fallas en vehículos.', 'IA', 'advanced', 240, '[
    {"title": "Introducción a IA en mantenimiento", "duration": 40, "content": "Conceptos de IA"},
    {"title": "Análisis de datos", "duration": 50, "content": "Procesamiento de datos"},
    {"title": "Modelos predictivos", "duration": 60, "content": "Algoritmos de predicción"},
    {"title": "Implementación práctica", "duration": 50, "content": "Casos de uso reales"},
    {"title": "Optimización y mejora", "duration": 40, "content": "Mejora continua"}
]'::jsonb),
('Gestión de Taller y Atención al Cliente', 'Mejora tus habilidades de gestión y comunicación con clientes.', 'Gestión', 'intermediate', 150, '[
    {"title": "Gestión de inventario", "duration": 30, "content": "Control de repuestos"},
    {"title": "Atención al cliente", "duration": 35, "content": "Comunicación efectiva"},
    {"title": "Planificación de trabajo", "duration": 30, "content": "Organización del taller"},
    {"title": "Facturación y cobros", "duration": 30, "content": "Procesos administrativos"},
    {"title": "Marketing del taller", "duration": 25, "content": "Promoción de servicios"}
]'::jsonb);
