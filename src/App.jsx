import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-blue-600" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="16" fill="currentColor" fillOpacity="0.1"/>
              <path d="M20 25h40v5H20v-5zm0 15h40v5H20v-5zm0 15h30v5H20v-5z" fill="currentColor"/>
              <circle cx="60" cy="52.5" r="7.5" fill="#10b981"/>
              <path d="M56.5 52.5l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ESG Nexus
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Plataforma Enterprise de Gerenciamento ESG
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">E</div>
              <div className="text-sm font-semibold text-gray-700">Environmental</div>
              <div className="text-xs text-gray-500 mt-2">Meio Ambiente</div>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">S</div>
              <div className="text-sm font-semibold text-gray-700">Social</div>
              <div className="text-xs text-gray-500 mt-2">Responsabilidade Social</div>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">G</div>
              <div className="text-sm font-semibold text-gray-700">Governance</div>
              <div className="text-xs text-gray-500 mt-2">Governança Corporativa</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-3">Plataforma em Produção! 🎉</h2>
            <p className="text-blue-100 mb-4">
              Deploy realizado com sucesso no Vercel. Transforme sua estratégia ESG com IA avançada,
              verificação blockchain e compliance automático.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ React 18</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Vite</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Tailwind CSS</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">✓ Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App