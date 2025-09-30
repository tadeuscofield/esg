import React, { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'environmental', name: 'Ambiental', icon: '🌱' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'governance', name: 'Governança', icon: '⚖️' },
    { id: 'reports', name: 'Relatórios', icon: '📈' },
  ]

  const metrics = [
    { label: 'Emissões CO2', value: '12,450 ton', change: '-15%', positive: true },
    { label: 'Energia Renovável', value: '68%', change: '+12%', positive: true },
    { label: 'Diversidade', value: '45%', change: '+8%', positive: true },
    { label: 'Compliance', value: '94%', change: '+3%', positive: true },
  ]

  const recentActivities = [
    { title: 'Relatório mensal enviado', time: '2 horas atrás', type: 'report' },
    { title: 'Meta de redução atingida', time: '1 dia atrás', type: 'success' },
    { title: 'Auditoria programada', time: '2 dias atrás', type: 'warning' },
    { title: 'Novo fornecedor certificado', time: '3 dias atrás', type: 'info' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ESG Nexus</h1>
                <p className="text-xs text-gray-500">Plataforma de Gestão ESG</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">TS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex space-x-1 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução de Indicadores</h3>
              <div className="h-64 flex items-end justify-around space-x-2">
                {[65, 78, 52, 88, 94, 71, 85, 76, 90, 82, 95, 88].map((height, idx) => (
                  <div key={idx} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                       style={{ height: `${height}%` }}
                       title={`Mês ${idx + 1}: ${height}%`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span>
                <span>Dez</span>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Pendentes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Revisar relatório de sustentabilidade</span>
                  </div>
                  <span className="text-xs text-gray-500">Vence em 3 dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Atualizar política de diversidade</span>
                  </div>
                  <span className="text-xs text-gray-500">Vence em 5 dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Agendar treinamento de compliance</span>
                  </div>
                  <span className="text-xs text-gray-500">Vence em 1 semana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      activity.type === 'report' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Score ESG</h3>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">87</div>
                <div className="text-sm opacity-90">de 100 pontos</div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex justify-between text-xs">
                    <span>Meta: 90</span>
                    <span>Progresso: 97%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificações</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">✅</span>
                    <span className="text-sm font-medium">ISO 14001</span>
                  </div>
                  <span className="text-xs text-green-600">Ativa</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">✅</span>
                    <span className="text-sm font-medium">B Corp</span>
                  </div>
                  <span className="text-xs text-green-600">Ativa</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">⏳</span>
                    <span className="text-sm font-medium">GRI Standards</span>
                  </div>
                  <span className="text-xs text-yellow-600">Pendente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App