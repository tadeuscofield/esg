import React, { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  const [data, setData] = useState({
    emissions: [
      { month: 'Jan', value: 14200, target: 15000 },
      { month: 'Fev', value: 13800, target: 14500 },
      { month: 'Mar', value: 13200, target: 14000 },
      { month: 'Abr', value: 12900, target: 13500 },
      { month: 'Mai', value: 12450, target: 13000 },
    ],
    energy: { renewable: 68, fossil: 32 },
    diversity: { women: 45, men: 55 },
    compliance: 94
  })

  const [newEmission, setNewEmission] = useState({ month: '', value: '', target: '' })

  const handleAddEmission = (e) => {
    e.preventDefault()
    if (newEmission.month && newEmission.value && newEmission.target) {
      setData({
        ...data,
        emissions: [...data.emissions, {
          month: newEmission.month,
          value: Number(newEmission.value),
          target: Number(newEmission.target)
        }]
      })
      setNewEmission({ month: '', value: '', target: '' })
      setShowAddModal(false)
    }
  }

  const handleExport = (format) => {
    if (format === 'pdf') {
      alert('Relatório PDF será gerado com:\n\n' +
            `• ${data.emissions.length} registros de emissões\n` +
            `• Score ESG: 87/100\n` +
            `• Compliance: ${data.compliance}%\n` +
            `• Energia Renovável: ${data.energy.renewable}%`)
    } else if (format === 'excel') {
      const csv = 'Período,Emissões (ton),Meta (ton),Status\n' +
                  data.emissions.map(e =>
                    `${e.month},${e.value},${e.target},${e.value <= e.target ? 'Atingida' : 'Acima'}`
                  ).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'relatorio-esg.csv'
      a.click()
    }
    setShowExportModal(false)
  }

  const maxEmission = Math.max(...data.emissions.map(e => Math.max(e.value, e.target)))
  const avgEmissions = data.emissions.reduce((sum, e) => sum + e.value, 0) / data.emissions.length
  const reduction = ((data.emissions[0].value - data.emissions[data.emissions.length-1].value) / data.emissions[0].value * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ESG Nexus Pro</h1>
                <p className="text-sm text-gray-600">Plataforma Profissional de Gestão ESG</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Dados</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b">
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
                className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl mr-2">{tab.icon}</span>
                {tab.name}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 & 2 */}
          <div className="lg:col-span-2 space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Redução CO2</p>
                    <p className="text-4xl font-bold mt-2">{reduction}%</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">🌍</span>
                  </div>
                </div>
                <p className="text-emerald-100 text-sm">vs período anterior</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Energia Renovável</p>
                    <p className="text-4xl font-bold mt-2">{data.energy.renewable}%</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">⚡</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">da matriz energética</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Compliance</p>
                    <p className="text-4xl font-bold mt-2">{data.compliance}%</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">✓</span>
                  </div>
                </div>
                <p className="text-purple-100 text-sm">conformidade atingida</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Evolução de Emissões CO2</h3>
                  <p className="text-gray-600 mt-1">Toneladas de CO2 equivalente por período</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-600 font-medium">Real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-dashed border-red-500"></div>
                    <span className="text-gray-600 font-medium">Meta</span>
                  </div>
                </div>
              </div>

              <div className="relative h-96">
                <div className="absolute inset-0 flex items-end justify-around pb-12">
                  {data.emissions.map((item, idx) => {
                    const height = (item.value / maxEmission) * 100
                    const targetHeight = (item.target / maxEmission) * 100
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center group mx-1">
                        <div className="relative w-full px-2 h-full flex items-end">
                          <div className="relative w-full">
                            {/* Target Line */}
                            <div
                              className="absolute w-full border-t-2 border-dashed border-red-500 z-10"
                              style={{ bottom: `${targetHeight}%` }}
                            >
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-semibold">
                                Meta: {item.target.toLocaleString()}
                              </div>
                            </div>

                            {/* Bar */}
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all cursor-pointer hover:from-blue-700 hover:to-blue-500 shadow-lg"
                              style={{ height: `${height}%` }}
                            >
                              <div className="opacity-0 group-hover:opacity-100 absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap font-semibold z-20">
                                {item.value.toLocaleString()} ton
                                <br />
                                <span className={item.value <= item.target ? 'text-green-300' : 'text-red-300'}>
                                  {item.value <= item.target ? '✓ Meta atingida' : '✗ Acima da meta'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 mt-3">{item.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-8 py-6 border-b bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900">Histórico Detalhado</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-8 py-4 text-sm font-bold text-gray-700">Período</th>
                      <th className="text-right px-8 py-4 text-sm font-bold text-gray-700">Emissões (ton)</th>
                      <th className="text-right px-8 py-4 text-sm font-bold text-gray-700">Meta (ton)</th>
                      <th className="text-right px-8 py-4 text-sm font-bold text-gray-700">Diferença</th>
                      <th className="text-center px-8 py-4 text-sm font-bold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data.emissions.map((item, idx) => {
                      const diff = item.target - item.value
                      const diffPercent = ((diff / item.target) * 100).toFixed(1)
                      return (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-4 font-semibold text-gray-900">{item.month}</td>
                          <td className="px-8 py-4 text-right font-semibold text-gray-900">{item.value.toLocaleString()}</td>
                          <td className="px-8 py-4 text-right text-gray-600">{item.target.toLocaleString()}</td>
                          <td className={`px-8 py-4 text-right font-semibold ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {diff >= 0 ? '-' : '+'}{Math.abs(diff).toLocaleString()} ({diffPercent}%)
                          </td>
                          <td className="px-8 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                              item.value <= item.target
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {item.value <= item.target ? '✓ Atingida' : '✗ Acima'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-8">
            {/* ESG Score */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Score ESG Global</h3>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                    <circle
                      cx="80" cy="80" r="70"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray="440"
                      strokeDashoffset="57.2"
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold">87</div>
                      <div className="text-sm opacity-90 mt-1">de 100</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 w-full space-y-3">
                  <div className="flex justify-between items-center py-2 border-t border-white/20">
                    <span className="font-medium">Ambiental</span>
                    <span className="font-bold">92/100</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/20">
                    <span className="font-medium">Social</span>
                    <span className="font-bold">85/100</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/20">
                    <span className="font-medium">Governança</span>
                    <span className="font-bold">84/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Charts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Distribuição Energética</h3>
              <div className="flex justify-center mb-4">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20"
                            strokeDasharray={`${data.energy.renewable * 2.51} 251`} />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20"
                            strokeDasharray={`${data.energy.fossil * 2.51} 251`}
                            strokeDashoffset={`-${data.energy.renewable * 2.51}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{data.energy.renewable}%</div>
                      <div className="text-xs text-gray-600">Renovável</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Renovável</span>
                  </div>
                  <span className="font-bold text-gray-900">{data.energy.renewable}%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Fóssil</span>
                  </div>
                  <span className="font-bold text-gray-900">{data.energy.fossil}%</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certificações</h3>
              <div className="space-y-3">
                {[
                  { name: 'ISO 14001', status: 'Ativa', expires: '31/12/2024', color: 'green' },
                  { name: 'B Corp', status: 'Ativa', expires: '30/06/2025', color: 'green' },
                  { name: 'GRI Standards', status: 'Processo', expires: '15/03/2025', color: 'yellow' },
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${cert.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <div>
                        <p className="font-semibold text-gray-900">{cert.name}</p>
                        <p className="text-xs text-gray-600">Validade: {cert.expires}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Adicionar Emissões</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddEmission} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Período</label>
                <input
                  type="text"
                  value={newEmission.month}
                  onChange={(e) => setNewEmission({...newEmission, month: e.target.value})}
                  placeholder="Ex: Jun, Jul, Ago..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Emissões (toneladas)</label>
                <input
                  type="number"
                  value={newEmission.value}
                  onChange={(e) => setNewEmission({...newEmission, value: e.target.value})}
                  placeholder="Ex: 12000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Meta (toneladas)</label>
                <input
                  type="number"
                  value={newEmission.target}
                  onChange={(e) => setNewEmission({...newEmission, target: e.target.value})}
                  placeholder="Ex: 13000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-lg hover:shadow-xl"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Exportar Relatório</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleExport('pdf')}
                className="w-full px-6 py-4 bg-red-50 hover:bg-red-100 rounded-lg transition-all text-left flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Exportar PDF</p>
                  <p className="text-sm text-gray-600">Relatório completo formatado</p>
                </div>
              </button>

              <button
                onClick={() => handleExport('excel')}
                className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all text-left flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Exportar Excel/CSV</p>
                  <p className="text-sm text-gray-600">Dados tabulares para análise</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App