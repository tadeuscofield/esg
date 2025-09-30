import React, { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddModal, setShowAddModal] = useState(false)
  const [emissions, setEmissions] = useState([
    { month: 'Jan', value: 14200, target: 15000 },
    { month: 'Fev', value: 13800, target: 14500 },
    { month: 'Mar', value: 13200, target: 14000 },
    { month: 'Abr', value: 12900, target: 13500 },
    { month: 'Mai', value: 12450, target: 13000 },
  ])

  const [newEmission, setNewEmission] = useState({ month: '', value: '', target: '' })

  const handleAddEmission = (e) => {
    e.preventDefault()
    if (newEmission.month && newEmission.value && newEmission.target) {
      setEmissions([...emissions, {
        month: newEmission.month,
        value: Number(newEmission.value),
        target: Number(newEmission.target)
      }])
      setNewEmission({ month: '', value: '', target: '' })
      setShowAddModal(false)
    }
  }

  const metrics = [
    {
      label: 'Emissões CO2',
      value: '12,450 ton',
      change: '-15%',
      positive: true,
      icon: '🌍',
      color: 'green'
    },
    {
      label: 'Energia Renovável',
      value: '68%',
      change: '+12%',
      positive: true,
      icon: '⚡',
      color: 'blue'
    },
    {
      label: 'Diversidade',
      value: '45%',
      change: '+8%',
      positive: true,
      icon: '👥',
      color: 'purple'
    },
    {
      label: 'Compliance',
      value: '94%',
      change: '+3%',
      positive: true,
      icon: '✓',
      color: 'indigo'
    },
  ]

  const maxEmission = Math.max(...emissions.map(e => Math.max(e.value, e.target)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ESG Nexus</h1>
                <p className="text-xs text-gray-500">Gestão ESG Profissional</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Adicionar Dados</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <span className="text-white text-sm font-bold">TS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <nav className="flex border-b">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'environmental', name: 'Ambiental', icon: '🌱' },
              { id: 'social', name: 'Social', icon: '👥' },
              { id: 'governance', name: 'Governança', icon: '⚖️' },
              { id: 'reports', name: 'Relatórios', icon: '📈' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center text-2xl`}>
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      metric.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className={`bg-${metric.color}-600 h-2 rounded-full`} style={{width: metric.value.replace(/[^0-9]/g, '') + '%'}}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Evolução de Emissões CO2</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg font-medium">Mensal</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Anual</button>
                </div>
              </div>

              <div className="h-80 relative">
                <div className="absolute inset-0 flex items-end justify-around pb-8">
                  {emissions.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center space-y-2 group">
                      <div className="relative w-full px-1">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                          style={{ height: `${(item.value / maxEmission) * 100}%`, minHeight: '20px' }}
                          title={`Real: ${item.value.toLocaleString()} ton`}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {item.value.toLocaleString()} ton
                          </div>
                        </div>
                        <div
                          className="absolute top-0 w-full border-t-2 border-dashed border-red-400"
                          style={{ top: `${100 - (item.target / maxEmission) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{item.month}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span className="text-gray-600">Real</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-1 border-t-2 border-dashed border-red-400"></div>
                    <span className="text-gray-600">Meta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Histórico de Emissões</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Período</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Emissões (ton)</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Meta (ton)</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emissions.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.month}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{item.value.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-600">{item.target.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            item.value <= item.target ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.value <= item.target ? '✓ Atingida' : '✗ Acima'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* ESG Score */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Score ESG Global</h3>
              <div className="text-center">
                <div className="relative inline-block">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" stroke="white" strokeWidth="8" fill="none"
                            strokeDasharray="351.86" strokeDashoffset="52.78" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-4xl font-bold">87</div>
                      <div className="text-xs opacity-75">de 100</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Meta Anual:</span>
                    <span className="font-semibold">90</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">Progresso:</span>
                    <span className="font-semibold">97%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📝</span>
                    <span className="text-sm font-medium text-gray-900">Novo Relatório</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📊</span>
                    <span className="text-sm font-medium text-gray-900">Exportar Dados</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">⚙️</span>
                    <span className="text-sm font-medium text-gray-900">Configurações</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certificações</h3>
              <div className="space-y-3">
                {[
                  { name: 'ISO 14001', status: 'Ativa', date: '2024-12-31', color: 'green' },
                  { name: 'B Corp', status: 'Ativa', date: '2025-06-30', color: 'green' },
                  { name: 'GRI Standards', status: 'Em Processo', date: '2025-03-15', color: 'yellow' },
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-${cert.color}-500`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                        <p className="text-xs text-gray-500">Validade: {cert.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      cert.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Adicionar Emissões</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddEmission} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                <input
                  type="text"
                  value={newEmission.month}
                  onChange={(e) => setNewEmission({...newEmission, month: e.target.value})}
                  placeholder="Ex: Jun"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emissões (ton)</label>
                <input
                  type="number"
                  value={newEmission.value}
                  onChange={(e) => setNewEmission({...newEmission, value: e.target.value})}
                  placeholder="Ex: 12000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta (ton)</label>
                <input
                  type="number"
                  value={newEmission.target}
                  onChange={(e) => setNewEmission({...newEmission, target: e.target.value})}
                  placeholder="Ex: 13000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App