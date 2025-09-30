import React, { useState, useEffect } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showModal, setShowModal] = useState(null)
  const [showExportModal, setShowExportModal] = useState(false)

  // Estado de dados completo baseado no data-structure.md
  const [esgData, setEsgData] = useState({
    companyName: "ESG Nexus Pro",
    reportingPeriod: "2025-01",

    environmental: {
      score: 92,
      metrics: {
        climateRisk: {
          name: "Riscos Climáticos",
          value: 85,
          weight: 0.25,
          status: "good",
          details: {
            physicalRisk: 20,
            transitionRisk: 15,
            netZeroTarget: "2050",
            scienceBasedTarget: true,
            tcfdAligned: true
          }
        },
        emissions: {
          name: "Emissões GEE",
          value: 88,
          weight: 0.25,
          status: "good",
          details: {
            scope1: 12500,
            scope2Market: 8300,
            scope3: {
              total: 45200,
              purchasedGoods: 25000,
              businessTravel: 8500,
              upstreamTransport: 11700
            },
            intensity: {
              revenue: 125,
              employee: 8.5
            },
            reductionYoY: 12.4,
            baselineYear: "2020",
            offsetPercentage: 15
          }
        },
        resourceEfficiency: {
          name: "Economia Circular",
          value: 75,
          weight: 0.15,
          status: "moderate",
          details: {
            recyclingRate: 68,
            recyclableContent: 55,
            hazardousWaste: 120,
            wasteToLandfill: 450,
            circularityScore: 72
          }
        },
        waterManagement: {
          name: "Gestão Hídrica",
          value: 82,
          weight: 0.15,
          status: "good",
          details: {
            totalConsumption: 125000,
            reuseRate: 35,
            recycleRate: 22,
            waterStressPercentage: 15,
            wastewaterTreated: 92,
            cdpWaterScore: "B"
          }
        },
        biodiversity: {
          name: "Biodiversidade",
          value: 78,
          weight: 0.20,
          status: "good",
          details: {
            biodiversityFootprint: "Medium",
            protectedAreasImpacted: 2,
            restorationProjects: 5,
            restorationHectares: 120,
            tnfdAligned: true,
            sbtForNature: false
          }
        }
      }
    },

    social: {
      score: 85,
      metrics: {
        humanRights: {
          name: "Direitos Humanos",
          value: 88,
          weight: 0.25,
          status: "good",
          details: {
            suppliersTotal: 450,
            tier1Audited: 95,
            highRiskSuppliers: 12,
            violations: 3,
            sa8000Certified: true,
            humanRightsPolicy: true,
            grievanceMechanism: true
          }
        },
        diversity: {
          name: "Diversidade & Inclusão",
          value: 82,
          weight: 0.20,
          status: "good",
          details: {
            womenTotal: 45,
            womenLeadership: 38,
            womenBoard: 40,
            genderPayGap: 5.2,
            inclusionScore: 8.5,
            lgbtqPolicies: true,
            disabilityInclusion: 6,
            parentalLeave: {
              maternity: 20,
              paternity: 8
            }
          }
        },
        communityImpact: {
          name: "Impacto Comunitário",
          value: 79,
          weight: 0.15,
          status: "good",
          details: {
            localEmployment: 75,
            localSuppliers: 62,
            socialInvestment: 850000,
            volunteerHours: 5200,
            sroi: 3.2,
            beneficiaries: 12000,
            educationPrograms: 8,
            satisfactionScore: 8.2
          }
        },
        employeeWellbeing: {
          name: "Bem-estar dos Funcionários",
          value: 86,
          weight: 0.20,
          status: "good",
          details: {
            burnoutRate: 12,
            satisfactionScore: 8.7,
            eNPS: 45,
            engagementScore: 82,
            turnover: 8.5,
            voluntaryTurnover: 6.2,
            averageTenure: 5.8,
            healthInsurance: true,
            retirementPlan: true,
            remoteWork: true,
            flexibleHours: true
          }
        },
        safety: {
          name: "Segurança",
          value: 90,
          weight: 0.20,
          status: "excellent",
          details: {
            ltifr: 0.8,
            trifr: 2.1,
            fatalities: 0,
            nearMisses: 85,
            safetyTrainingHours: 12500,
            safetyTrainingCoverage: 100,
            iso45001: true,
            behaviorBasedSafety: true
          }
        }
      }
    },

    governance: {
      score: 84,
      metrics: {
        esgIntegration: {
          name: "Integração ESG",
          value: 88,
          weight: 0.20,
          status: "good",
          details: {
            compensationLinked: 30,
            ceoCompensationESG: 25,
            ltipESGMetrics: true,
            esgCommittee: true,
            strategyIntegrated: true,
            materialityAssessment: true,
            publicTargets: true
          }
        },
        boardStructure: {
          name: "Estrutura do Conselho",
          value: 82,
          weight: 0.15,
          status: "good",
          details: {
            boardSize: 9,
            independentDirectors: 55,
            nonExecutive: 67,
            womenBoard: 44,
            averageTenure: 4.5,
            boardEvaluations: true,
            successionPlanning: true,
            boardMeetings: 12,
            attendance: 95
          }
        },
        transparency: {
          name: "Transparência",
          value: 85,
          weight: 0.15,
          status: "good",
          details: {
            msciScore: "AA",
            sustainalyticsRisk: "Low",
            cdpClimate: "B",
            disclosureScore: 85,
            integratedReporting: true,
            tcfdReport: true,
            sasbStandards: true,
            externalAssurance: true
          }
        },
        cyberEthics: {
          name: "Cyber & Ética",
          value: 80,
          weight: 0.15,
          status: "good",
          details: {
            dataBreaches: 0,
            breachSeverity: "None",
            cyberInsurance: true,
            iso27001: true,
            gdprCompliant: true,
            lgpdCompliant: true,
            aiEthicsPolicy: true,
            cyberTraining: 100,
            ethicsTraining: 98
          }
        },
        compliance: {
          name: "Compliance",
          value: 92,
          weight: 0.15,
          status: "excellent",
          details: {
            fines: 0,
            fineAmount: 0,
            investigations: 0,
            litigations: 1,
            codeOfConduct: true,
            anticorruptionPolicy: true,
            whistleblowerChannel: true,
            whistleblowerCases: 5,
            complianceTraining: 100,
            anticorruptionTraining: 100
          }
        },
        cryptoTreasury: {
          name: "Tesouraria Digital",
          value: 75,
          weight: 0.20,
          status: "moderate",
          details: {
            btcAllocation: 5,
            btcAmount: 21.5,
            sustainableMining: true,
            renewableEnergy: 85,
            carbonNeutral: true,
            boardApproved: true,
            custodyType: "Multi-sig",
            insurance: true
          }
        }
      }
    }
  })

  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Função para abrir modal específico
  const openModal = (category) => {
    setShowModal(category)
    setFormData({})
  }

  // Função para salvar dados do formulário
  const handleFormSubmit = (e, category) => {
    e.preventDefault()

    // Atualizar dados no estado
    setEsgData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        metrics: {
          ...prev[category].metrics,
          ...formData
        }
      }
    }))

    setShowModal(null)
    setFormData({})
    alert('Dados salvos com sucesso!')
  }

  // Função de exportação
  const handleExport = (format) => {
    const timestamp = new Date().toISOString().split('T')[0]

    if (format === 'excel') {
      // Exportar CSV completo
      let csv = 'Categoria,Métrica,Valor,Peso,Status\n'

      Object.entries(esgData).forEach(([pillar, data]) => {
        if (data.metrics) {
          Object.entries(data.metrics).forEach(([key, metric]) => {
            csv += `${pillar},${metric.name},${metric.value},${metric.weight},${metric.status}\n`
          })
        }
      })

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ESG-Report-${timestamp}.csv`
      a.click()

    } else if (format === 'pdf') {
      // Simular PDF com dados formatados
      const esgScore = Math.round(
        (esgData.environmental.score * 0.35) +
        (esgData.social.score * 0.30) +
        (esgData.governance.score * 0.35)
      )

      alert(`📄 Relatório PDF Gerado!\n\n` +
            `Empresa: ${esgData.companyName}\n` +
            `Período: ${esgData.reportingPeriod}\n\n` +
            `SCORE ESG GLOBAL: ${esgScore}/100\n\n` +
            `Ambiental: ${esgData.environmental.score}/100\n` +
            `Social: ${esgData.social.score}/100\n` +
            `Governança: ${esgData.governance.score}/100\n\n` +
            `O arquivo PDF seria gerado aqui com todas as métricas detalhadas.`)

    } else if (format === 'presentation') {
      // Apresentação executiva
      const esgScore = Math.round(
        (esgData.environmental.score * 0.35) +
        (esgData.social.score * 0.30) +
        (esgData.governance.score * 0.35)
      )

      alert(`📊 Apresentação Executiva ESG\n\n` +
            `HIGHLIGHTS:\n\n` +
            `🌍 AMBIENTAL (${esgData.environmental.score}/100)\n` +
            `• Redução de emissões: ${esgData.environmental.metrics.emissions.details.reductionYoY}%\n` +
            `• Economia circular: ${esgData.environmental.metrics.resourceEfficiency.details.recyclingRate}%\n` +
            `• CDP Water: ${esgData.environmental.metrics.waterManagement.details.cdpWaterScore}\n\n` +
            `👥 SOCIAL (${esgData.social.score}/100)\n` +
            `• Diversidade: ${esgData.social.metrics.diversity.details.womenTotal}% mulheres\n` +
            `• LTIFR: ${esgData.social.metrics.safety.details.ltifr}\n` +
            `• eNPS: ${esgData.social.metrics.employeeWellbeing.details.eNPS}\n\n` +
            `⚖️ GOVERNANÇA (${esgData.governance.score}/100)\n` +
            `• MSCI: ${esgData.governance.metrics.transparency.details.msciScore}\n` +
            `• Compliance: ${esgData.governance.metrics.compliance.value}/100\n` +
            `• Mulheres no Board: ${esgData.governance.metrics.boardStructure.details.womenBoard}%`)
    }

    setShowExportModal(false)
  }

  // Calcular ESG Score
  const esgScore = Math.round(
    (esgData.environmental.score * 0.35) +
    (esgData.social.score * 0.30) +
    (esgData.governance.score * 0.35)
  )

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md sticky top-0 z-50 border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">E</span>
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ESG Nexus Pro</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plataforma Profissional de Gestão ESG</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg transition-all ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
              >
                {darkMode ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
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
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md mb-8`}>
          <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
                    ? `${darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`
                    : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Score ESG</p>
                    <p className="text-4xl font-bold mt-2">{esgScore}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">🌟</span>
                  </div>
                </div>
                <p className="text-emerald-100 text-sm">de 100 pontos</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Ambiental</p>
                    <p className="text-4xl font-bold mt-2">{esgData.environmental.score}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">🌍</span>
                  </div>
                </div>
                <p className="text-green-100 text-sm">sustentabilidade</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Social</p>
                    <p className="text-4xl font-bold mt-2">{esgData.social.score}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">👥</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">responsabilidade</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Governança</p>
                    <p className="text-4xl font-bold mt-2">{esgData.governance.score}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <span className="text-3xl">⚖️</span>
                  </div>
                </div>
                <p className="text-purple-100 text-sm">compliance</p>
              </div>
            </div>

            {/* Score Circular */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className={`${darkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-gradient-to-br from-indigo-600 to-purple-700'} rounded-xl shadow-lg p-8 text-white`}>
                <h3 className="text-xl font-bold mb-6">Score ESG Global</h3>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.2)" strokeWidth="16" fill="none" />
                      <circle
                        cx="96" cy="96" r="80"
                        stroke="white"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray="502"
                        strokeDashoffset={502 - (502 * esgScore / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold">{esgScore}</div>
                        <div className="text-sm opacity-90 mt-1">de 100</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 w-full space-y-3">
                    <div className="flex justify-between items-center py-2 border-t border-white/20">
                      <span className="font-medium">🌱 Ambiental</span>
                      <span className="font-bold">{esgData.environmental.score}/100</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-white/20">
                      <span className="font-medium">👥 Social</span>
                      <span className="font-bold">{esgData.social.score}/100</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-white/20">
                      <span className="font-medium">⚖️ Governança</span>
                      <span className="font-bold">{esgData.governance.score}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-8`}>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Métricas Principais</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Redução de Emissões</p>
                    <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {esgData.environmental.metrics.emissions.details.reductionYoY}%
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs ano anterior</p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Diversidade</p>
                    <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {esgData.social.metrics.diversity.details.womenTotal}%
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>mulheres na empresa</p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>LTIFR</p>
                    <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      {esgData.social.metrics.safety.details.ltifr}
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>taxa de acidentes</p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Compliance</p>
                    <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {esgData.governance.metrics.compliance.value}%
                    </p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>conformidade total</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ratings Externos</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>MSCI</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        {esgData.governance.metrics.transparency.details.msciScore}
                      </p>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>CDP Climate</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {esgData.governance.metrics.transparency.details.cdpClimate}
                      </p>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>CDP Water</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        {esgData.environmental.metrics.waterManagement.details.cdpWaterScore}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ambiental Tab */}
        {activeTab === 'environmental' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gestão Ambiental</h2>
              <button
                onClick={() => openModal('environmental')}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Dados Ambientais</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(esgData.environmental.metrics).map(([key, metric]) => (
                <div key={key} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metric.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {metric.value}/100
                    </span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(metric.details).slice(0, 4).map(([detailKey, detailValue]) => (
                      <div key={detailKey} className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="capitalize">{detailKey.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-semibold">
                          {typeof detailValue === 'boolean' ? (detailValue ? '✓' : '✗') :
                           typeof detailValue === 'object' ? 'Ver detalhes' :
                           detailValue}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gestão Social</h2>
              <button
                onClick={() => openModal('social')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Dados Sociais</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(esgData.social.metrics).map(([key, metric]) => (
                <div key={key} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metric.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {metric.value}/100
                    </span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(metric.details).slice(0, 4).map(([detailKey, detailValue]) => (
                      <div key={detailKey} className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="capitalize">{detailKey.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-semibold">
                          {typeof detailValue === 'boolean' ? (detailValue ? '✓' : '✗') :
                           typeof detailValue === 'object' ? 'Ver detalhes' :
                           detailValue}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Governança Tab */}
        {activeTab === 'governance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Governança Corporativa</h2>
              <button
                onClick={() => openModal('governance')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Adicionar Dados de Governança</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(esgData.governance.metrics).map(([key, metric]) => (
                <div key={key} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metric.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {metric.value}/100
                    </span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(metric.details).slice(0, 4).map(([detailKey, detailValue]) => (
                      <div key={detailKey} className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="capitalize">{detailKey.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-semibold">
                          {typeof detailValue === 'boolean' ? (detailValue ? '✓' : '✗') :
                           typeof detailValue === 'object' ? 'Ver detalhes' :
                           detailValue}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-8`}>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Relatórios e Exportações</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleExport('excel')}
                className="p-8 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl transition-all text-left border-2 border-green-200 dark:border-green-700"
              >
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Excel / CSV</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Exportar todos os dados em formato tabular para análise detalhada
                </p>
              </button>

              <button
                onClick={() => handleExport('pdf')}
                className="p-8 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-xl transition-all text-left border-2 border-red-200 dark:border-red-700"
              >
                <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-4xl">📄</span>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Relatório PDF</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Relatório completo formatado com todas as métricas e gráficos
                </p>
              </button>

              <button
                onClick={() => handleExport('presentation')}
                className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl transition-all text-left border-2 border-purple-200 dark:border-purple-700"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Apresentação Executiva</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Resumo executivo com principais KPIs e highlights
                </p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Formulário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8`}>
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-inherit pb-4 border-b dark:border-gray-700">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Adicionar Dados - {showModal === 'environmental' ? 'Ambiental' : showModal === 'social' ? 'Social' : 'Governança'}
              </h2>
              <button
                onClick={() => setShowModal(null)}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e, showModal)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(esgData[showModal].metrics).map(([metricKey, metric]) => (
                  <div key={metricKey} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                      {metric.name}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder={`Valor atual: ${metric.value}`}
                      className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                        darkMode
                          ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-400'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/50`}
                      onChange={(e) => setFormData({...formData, [metricKey]: { ...metric, value: Number(e.target.value) }})}
                    />
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Peso: {(metric.weight * 100).toFixed(0)}% • Status: {metric.status}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3 pt-4 border-t dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all font-bold ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-lg hover:shadow-xl"
                >
                  Salvar Dados
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exportação */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-md w-full p-8`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Exportar Relatório</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleExport('excel')}
                className={`w-full px-6 py-4 rounded-lg transition-all text-left flex items-center space-x-4 ${
                  darkMode
                    ? 'bg-green-900/30 hover:bg-green-900/50 border border-green-700'
                    : 'bg-green-50 hover:bg-green-100'
                }`}
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Exportar Excel/CSV</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dados tabulares para análise</p>
                </div>
              </button>

              <button
                onClick={() => handleExport('pdf')}
                className={`w-full px-6 py-4 rounded-lg transition-all text-left flex items-center space-x-4 ${
                  darkMode
                    ? 'bg-red-900/30 hover:bg-red-900/50 border border-red-700'
                    : 'bg-red-50 hover:bg-red-100'
                }`}
              >
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Exportar PDF</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Relatório completo formatado</p>
                </div>
              </button>

              <button
                onClick={() => handleExport('presentation')}
                className={`w-full px-6 py-4 rounded-lg transition-all text-left flex items-center space-x-4 ${
                  darkMode
                    ? 'bg-purple-900/30 hover:bg-purple-900/50 border border-purple-700'
                    : 'bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Apresentação Executiva</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Resumo com principais KPIs</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App