
export function TestStyles() {
  return (
    <div className="min-h-screen bg-dark-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-dark-50 mb-8">
          Test de Estilos MecMain IA
        </h1>
        
        {/* Test de colores */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Colores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary-500 p-4 rounded-lg text-dark-900 font-medium">
              Primary 500
            </div>
            <div className="bg-secondary-500 p-4 rounded-lg text-dark-50 font-medium">
              Secondary 500
            </div>
            <div className="bg-dark-700 p-4 rounded-lg text-dark-50 font-medium">
              Dark 700
            </div>
            <div className="bg-dark-800 p-4 rounded-lg text-dark-50 font-medium">
              Dark 800
            </div>
          </div>
        </div>

        {/* Test de botones */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Botones</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>
        </div>

        {/* Test de gradientes */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Gradientes</h2>
          <div className="space-y-4">
            <div className="gradient-text text-3xl font-bold">
              Texto con Gradiente
            </div>
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 rounded-lg text-dark-50 font-medium text-center">
              Fondo con Gradiente
            </div>
          </div>
        </div>

        {/* Test de animaciones */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Animaciones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary-500/10 p-4 rounded-lg text-center animate-fade-in">
              Fade In
            </div>
            <div className="bg-secondary-500/10 p-4 rounded-lg text-center animate-slide-up">
              Slide Up
            </div>
            <div className="bg-dark-700 p-4 rounded-lg text-center animate-scale-in">
              Scale In
            </div>
            <div className="bg-primary-500/10 p-4 rounded-lg text-center animate-bounce-gentle">
              Bounce
            </div>
          </div>
        </div>

        {/* Test de sombras */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Sombras</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-800 p-6 rounded-lg shadow-soft">
              <h3 className="text-lg font-semibold text-dark-50 mb-2">Soft Shadow</h3>
              <p className="text-dark-300">Sombra suave</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg shadow-medium">
              <h3 className="text-lg font-semibold text-dark-50 mb-2">Medium Shadow</h3>
              <p className="text-dark-300">Sombra media</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-lg shadow-hard">
              <h3 className="text-lg font-semibold text-dark-50 mb-2">Hard Shadow</h3>
              <p className="text-dark-300">Sombra fuerte</p>
            </div>
          </div>
        </div>

        {/* Test de glass effect */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Efecto Glass</h2>
          <div className="glass p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-dark-50 mb-2">Glass Effect</h3>
            <p className="text-dark-300">Efecto de vidrio con backdrop blur</p>
          </div>
        </div>

        {/* Test de formularios */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Formularios</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Nombre</label>
              <input 
                type="text" 
                className="input" 
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input 
                type="email" 
                className="input" 
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="label">Mensaje</label>
              <textarea 
                className="input min-h-[100px]" 
                placeholder="Tu mensaje aquí..."
              />
            </div>
          </div>
        </div>

        {/* Test de estados */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-dark-50 mb-4">Estados</h2>
          <div className="space-y-2">
            <div className="error">Este es un mensaje de error</div>
            <div className="success">Este es un mensaje de éxito</div>
            <div className="warning">Este es un mensaje de advertencia</div>
            <div className="info">Este es un mensaje informativo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
