-- Seed data for MecMain IA

-- Insert sample workshops
INSERT INTO workshops (id, name, description, owner_id, address, contact, services, specialties) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Taller El Dorado',
  'Taller especializado en mantenimiento automotriz con más de 10 años de experiencia',
  '550e8400-e29b-41d4-a716-446655440000',
  '{
    "street": "Calle 80 #12-34",
    "city": "Bogotá",
    "state": "Cundinamarca",
    "zipCode": "110111",
    "country": "Colombia",
    "coordinates": {"lat": 4.6097, "lng": -74.0817}
  }'::jsonb,
  '{
    "phone": "+57 1 234-5678",
    "email": "contacto@tallerdorado.com",
    "website": "https://tallerdorado.com"
  }'::jsonb,
  ARRAY['Mantenimiento preventivo', 'Reparación de motor', 'Sistema de frenos', 'Aire acondicionado'],
  ARRAY['Toyota', 'Honda', 'Nissan', 'Mazda']
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Mecánica Central',
  'Servicio integral de mantenimiento y reparación automotriz',
  '550e8400-e29b-41d4-a716-446655440000',
  '{
    "street": "Carrera 15 #45-67",
    "city": "Medellín",
    "state": "Antioquia",
    "zipCode": "050001",
    "country": "Colombia",
    "coordinates": {"lat": 6.2442, "lng": -75.5812}
  }'::jsonb,
  '{
    "phone": "+57 4 567-8901",
    "email": "info@mecanicacentral.com",
    "website": "https://mecanicacentral.com"
  }'::jsonb,
  ARRAY['Diagnóstico computarizado', 'Reparación de transmisión', 'Sistema eléctrico', 'Llantas'],
  ARRAY['Chevrolet', 'Ford', 'Hyundai', 'Kia']
);

-- Insert sample vehicles
INSERT INTO vehicles (id, workshop_id, make, model, year, license_plate, vin, color, mileage, fuel_type, transmission, engine_size, owner_name, owner_phone, owner_email) VALUES
(
  '550e8400-e29b-41d4-a716-446655440010',
  '550e8400-e29b-41d4-a716-446655440001',
  'Toyota',
  'Corolla',
  2020,
  'ABC-123',
  '1HGBH41JXMN109186',
  'Blanco',
  45000,
  'Gasolina',
  'Automática',
  '1.8L',
  'Juan Pérez',
  '+57 300 123 4567',
  'juan.perez@email.com'
),
(
  '550e8400-e29b-41d4-a716-446655440011',
  '550e8400-e29b-41d4-a716-446655440001',
  'Honda',
  'Civic',
  2019,
  'XYZ-789',
  '2HGBH41JXMN109187',
  'Negro',
  52000,
  'Gasolina',
  'Manual',
  '1.5L',
  'María García',
  '+57 300 987 6543',
  'maria.garcia@email.com'
),
(
  '550e8400-e29b-41d4-a716-446655440012',
  '550e8400-e29b-41d4-a716-446655440002',
  'Ford',
  'Focus',
  2021,
  'DEF-456',
  '3HGBH41JXMN109188',
  'Azul',
  38000,
  'Gasolina',
  'Automática',
  '2.0L',
  'Carlos López',
  '+57 300 555 1234',
  'carlos.lopez@email.com'
);

-- Insert sample maintenance records
INSERT INTO maintenance_records (id, workshop_id, vehicle_id, technician_id, type, status, title, description, diagnosis, actions_taken, parts_used, cost, duration_minutes, scheduled_date, completed_date) VALUES
(
  '550e8400-e29b-41d4-a716-446655440020',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440010',
  '550e8400-e29b-41d4-a716-446655440000',
  'preventive',
  'completed',
  'Mantenimiento preventivo - Toyota Corolla 2020',
  'Cambio de aceite y filtros según programa de mantenimiento',
  'Vehículo en buen estado general, sin problemas detectados',
  'Cambio de aceite motor, filtro de aceite, filtro de aire, revisión de niveles',
  '[
    {"name": "Aceite motor 5W-30", "quantity": 4, "unit": "litros", "cost": 120000},
    {"name": "Filtro de aceite", "quantity": 1, "unit": "unidad", "cost": 25000},
    {"name": "Filtro de aire", "quantity": 1, "unit": "unidad", "cost": 35000}
  ]'::jsonb,
  450000,
  150,
  '2025-01-14 08:00:00+00',
  '2025-01-14 10:30:00+00'
),
(
  '550e8400-e29b-41d4-a716-446655440021',
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440011',
  '550e8400-e29b-41d4-a716-446655440000',
  'corrective',
  'in_progress',
  'Reparación del sistema de frenos - Honda Civic 2019',
  'Cliente reporta ruido en las ruedas delanteras al frenar',
  'Pastillas de freno desgastadas, discos con rayas superficiales',
  'Reemplazo de pastillas de freno delanteras, rectificado de discos',
  '[
    {"name": "Pastillas de freno delanteras", "quantity": 1, "unit": "juego", "cost": 180000},
    {"name": "Rectificado de discos", "quantity": 2, "unit": "unidad", "cost": 80000}
  ]'::jsonb,
  320000,
  105,
  '2025-01-14 14:00:00+00',
  null
),
(
  '550e8400-e29b-41d4-a716-446655440022',
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440012',
  '550e8400-e29b-41d4-a716-446655440000',
  'predictive',
  'scheduled',
  'Mantenimiento predictivo - Ford Focus 2021',
  'Mantenimiento programado basado en análisis de datos del vehículo',
  'Análisis de sensores indica desgaste normal de componentes',
  'Revisión completa del sistema de motor y transmisión',
  '[]'::jsonb,
  280000,
  180,
  '2025-01-16 09:00:00+00',
  null
);

-- Update workshop statistics
UPDATE workshops SET statistics = '{
  "totalVehicles": 3,
  "totalMaintenanceRecords": 3,
  "averageRating": 4.7,
  "totalRevenue": 1050000,
  "lastActivity": "2025-01-14T10:30:00Z"
}'::jsonb WHERE id = '550e8400-e29b-41d4-a716-446655440001';

UPDATE workshops SET statistics = '{
  "totalVehicles": 1,
  "totalMaintenanceRecords": 1,
  "averageRating": 4.5,
  "totalRevenue": 280000,
  "lastActivity": "2025-01-14T14:00:00Z"
}'::jsonb WHERE id = '550e8400-e29b-41d4-a716-446655440002';
