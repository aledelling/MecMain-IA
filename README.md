# MecMain IA 🚗🤖

> **La evolución del mantenimiento inteligente**

MecMain IA es una startup colombiana que transforma el mantenimiento mecánico a través de inteligencia artificial, ofreciendo entrenamiento autónomo, optimización predictiva y una plataforma intuitiva para talleres e industrias.

## 🌟 Características Principales

- **🧠 Entrenamiento Autónomo**: IA que personaliza y automatiza la capacitación del personal técnico
- **🔮 Optimización Predictiva**: Modelos para anticipar fallas y programar mantenimientos preventivos
- **📈 Escalabilidad Multisectorial**: Soluciones adaptables a talleres, industria, servicios públicos y formación técnica
- **🇨🇴 Enfoque Colombia**: Interfaz en español diseñada para el mercado latinoamericano
- **⚡ Real-time**: Actualizaciones en vivo con Supabase
- **🔐 Auth Integrada**: Autenticación segura con Supabase Auth

## 🏗️ Arquitectura del Proyecto

Este es un **monorepo** que utiliza **Turborepo** para gestionar múltiples aplicaciones y paquetes:

```
MecMain-IA/
├── apps/
│   ├── web/          # Frontend React con TypeScript
│   └── mobile/       # Aplicación móvil (futuro)
├── packages/
│   ├── ui/           # Componentes UI compartidos
│   ├── shared/       # Utilidades y tipos compartidos
│   ├── config/       # Configuraciones compartidas
│   └── supabase/     # Cliente y servicios de Supabase
├── supabase/
│   ├── migrations/   # Migraciones de base de datos
│   ├── functions/    # Edge Functions
│   └── config.toml   # Configuración de Supabase
└── docs/             # Documentación del proyecto
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **React Query** para manejo de estado del servidor
- **Zustand** para estado global
- **React Router** para navegación

### Backend & Base de Datos
- **Supabase** como Backend-as-a-Service
- **PostgreSQL** con Row Level Security
- **Supabase Auth** para autenticación
- **Supabase Realtime** para actualizaciones en vivo
- **Supabase Storage** para archivos
- **Edge Functions** para lógica de negocio

### DevOps
- **Docker** y Docker Compose
- **Turborepo** para monorepo
- **ESLint** y **Prettier** para código
- **GitHub Actions** para CI/CD

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm 8+
- Supabase CLI (opcional para desarrollo local)

### Instalación Rápida

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/aledelling/MecMain-IA.git
   cd MecMain-IA
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Supabase**
   
   **Opción A: Supabase Cloud (Recomendado)**
   - Crear proyecto en [supabase.com](https://supabase.com)
   - Copiar URL y anon key
   - Crear archivo `.env` en `apps/web/`:
   ```env
   VITE_SUPABASE_URL=tu-url-de-supabase
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

   **Opción B: Supabase Local**
   ```bash
   # Instalar Supabase CLI
   npm install -g supabase
   
   # Iniciar Supabase local
   npm run supabase:start
   
   # Aplicar migraciones
   npm run supabase:reset
   ```

4. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia todos los servicios en modo desarrollo
npm run build            # Construye todos los proyectos
npm run test             # Ejecuta todos los tests
npm run lint             # Linter para todo el proyecto
npm run type-check       # Verificación de tipos TypeScript

# Supabase
npm run supabase:start   # Inicia Supabase local
npm run supabase:stop    # Detiene Supabase local
npm run supabase:reset   # Resetea la base de datos local
npm run supabase:status  # Estado de Supabase local
npm run supabase:gen-types # Genera tipos TypeScript

# Limpieza
npm run clean            # Limpia archivos de build
```

## 📁 Estructura Detallada

### Frontend (`apps/web/`)
```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── hooks/              # Custom hooks
├── services/           # Servicios API (ahora usando Supabase)
├── store/              # Estado global (Zustand)
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades
└── assets/             # Recursos estáticos
```

### Supabase (`packages/supabase/`)
```
src/
├── client.ts           # Cliente de Supabase
├── services.ts         # Servicios de base de datos
├── types.ts            # Tipos de base de datos
└── index.ts            # Exportaciones principales
```

### Base de Datos (`supabase/migrations/`)
```
migrations/
├── 20250114000001_initial_schema.sql  # Esquema inicial
└── seed.sql                          # Datos de prueba
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

#### Frontend (`apps/web/.env`)
```env
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
VITE_APP_ENV=development
VITE_APP_NAME=MecMain IA
```

### Base de Datos

**Esquema principal:**
- **users** - Usuarios del sistema
- **workshops** - Talleres y sus configuraciones
- **vehicles** - Vehículos registrados
- **maintenance_records** - Historial de mantenimientos
- **training_modules** - Módulos de capacitación

**Características:**
- ✅ **Row Level Security** para seguridad
- ✅ **Real-time subscriptions** para actualizaciones en vivo
- ✅ **Índices optimizados** para rendimiento
- ✅ **Triggers** para updated_at automático

## 🚀 Despliegue

### Producción con Supabase Cloud

1. **Crear proyecto en Supabase**
   - Ir a [supabase.com](https://supabase.com)
   - Crear nuevo proyecto
   - Copiar URL y anon key

2. **Configurar variables de entorno**
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

3. **Aplicar migraciones**
   ```bash
   supabase db push
   ```

4. **Desplegar frontend**
   ```bash
   npm run build
   # Desplegar en Vercel, Netlify, etc.
   ```

### Despliegue Local

1. **Iniciar Supabase local**
   ```bash
   npm run supabase:start
   ```

2. **Aplicar migraciones**
   ```bash
   npm run supabase:reset
   ```

3. **Iniciar frontend**
   ```bash
   npm run dev
   ```

## 📊 Monitoreo y Logs

- **Logs**: Supabase Dashboard para logs de base de datos
- **Métricas**: Supabase Analytics
- **Errores**: Supabase Error Tracking
- **Real-time**: Supabase Realtime para actualizaciones en vivo

## 🔐 Seguridad

- **Row Level Security** en todas las tablas
- **Autenticación JWT** con Supabase Auth
- **Políticas de acceso** granulares
- **Validación** en cliente y servidor

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **CEO y Fundador**: Jhon Alejandro Díaz J.
- **Email**: aledelling@gmail.com
- **GitHub**: [@aledelling](https://github.com/aledelling)

## 🌐 Enlaces

- **Sitio Web**: [https://mecmain.ai](https://mecmain.ai)
- **Documentación**: [https://docs.mecmain.ai](https://docs.mecmain.ai)
- **Supabase Dashboard**: [https://app.supabase.com](https://app.supabase.com)

## 📈 Roadmap

- [ ] Aplicación móvil React Native
- [ ] Integración con sensores IoT
- [ ] Realidad aumentada para mantenimiento
- [ ] Marketplace de repuestos
- [ ] Análisis predictivo avanzado
- [ ] Integración con sistemas ERP
- [ ] Edge Functions para IA
- [ ] Notificaciones push

## 🆕 Migración a Supabase

Este proyecto ha sido migrado de MongoDB + Node.js a **Supabase** para:

- ✅ **Menos código backend** - API automática
- ✅ **Autenticación integrada** - Supabase Auth
- ✅ **Real-time** - Actualizaciones en vivo
- ✅ **Escalabilidad** - PostgreSQL robusto
- ✅ **Desarrollo más rápido** - Menos configuración

---

**MecMain IA** - *Transformando el mantenimiento con inteligencia artificial* 🚗🤖