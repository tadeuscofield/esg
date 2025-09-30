import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import emailjs from '@emailjs/browser'

// Inicializar EmailJS com a Public Key
emailjs.init('FI4D7nkFYtcKDD89Y')

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showModal, setShowModal] = useState(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showMethodologyModal, setShowMethodologyModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [showCompanyModal, setShowCompanyModal] = useState(true)
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    sector: '',
    technicalResponsible: '',
    email: ''
  })

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

  // Função para calcular score de um pilar baseado nas métricas
  const calculatePillarScore = (metrics) => {
    let totalScore = 0
    let totalWeight = 0

    Object.values(metrics).forEach(metric => {
      if (metric.value !== undefined && metric.weight !== undefined) {
        totalScore += metric.value * metric.weight
        totalWeight += metric.weight
      }
    })

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0
  }

  // Função para salvar dados do formulário
  const handleFormSubmit = (e, category) => {
    e.preventDefault()

    // Mesclar formData com métricas existentes
    const updatedMetrics = {
      ...esgData[category].metrics,
      ...formData
    }

    // Calcular novo score do pilar
    const newScore = calculatePillarScore(updatedMetrics)

    // Atualizar dados no estado com score recalculado
    setEsgData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        score: newScore,
        metrics: updatedMetrics
      }
    }))

    setShowModal(null)
    setFormData({})
    alert(`✅ Dados salvos! Score ${category === 'environmental' ? 'Ambiental' : category === 'social' ? 'Social' : 'Governança'}: ${newScore}/100`)
  }

  // Função de exportação
  // Função para gerar sugestões baseadas no score
  const generateSuggestions = (category, score) => {
    const suggestions = {
      environmental: [
        { threshold: 90, text: "Excelente! Continue investindo em energias renováveis e certificações ambientais." },
        { threshold: 70, text: "Bom progresso. Considere ampliar programas de economia circular e redução de emissões Scope 3." },
        { threshold: 50, text: "Implemente metas de Net Zero até 2050 alinhadas com SBTi. Invista em eficiência energética." },
        { threshold: 0, text: "CRÍTICO: Estabeleça políticas ambientais urgentes, obtenha ISO 14001 e inicie medição de emissões." }
      ],
      social: [
        { threshold: 90, text: "Excelente! Mantenha programas de diversidade e bem-estar. Compartilhe boas práticas externamente." },
        { threshold: 70, text: "Bom desempenho. Expanda treinamentos de segurança e programas de inclusão." },
        { threshold: 50, text: "Implemente políticas de direitos humanos, auditorias de fornecedores e programas de diversidade." },
        { threshold: 0, text: "CRÍTICO: Estabeleça código de conduta, canal de denúncias e políticas de saúde e segurança." }
      ],
      governance: [
        { threshold: 90, text: "Excelente! Continue fortalecendo a transparência e integração ESG na estratégia corporativa." },
        { threshold: 70, text: "Bom nível. Aumente independência do conselho e vincule remuneração executiva a metas ESG." },
        { threshold: 50, text: "Implemente comitê ESG, políticas anticorrupção e melhore disclosure de práticas de governança." },
        { threshold: 0, text: "CRÍTICO: Estabeleça código de ética, políticas de compliance e estrutura básica de governança." }
      ]
    }

    const categorySuggestions = suggestions[category]
    for (let i = 0; i < categorySuggestions.length; i++) {
      if (score >= categorySuggestions[i].threshold) {
        return categorySuggestions[i].text
      }
    }
    return categorySuggestions[categorySuggestions.length - 1].text
  }

  // Função para gerar PDF completo
  const generatePDF = () => {
    const doc = new jsPDF()
    const timestamp = new Date().toLocaleDateString('pt-BR')

    const esgScore = Math.round(
      (esgData.environmental.score * 0.35) +
      (esgData.social.score * 0.30) +
      (esgData.governance.score * 0.35)
    )

    // Cabeçalho
    doc.setFillColor(16, 185, 129)
    doc.rect(0, 0, 210, 50, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(26)
    doc.setFont(undefined, 'bold')
    doc.text(companyInfo.name || 'Empresa', 105, 15, { align: 'center' })
    doc.setFontSize(14)
    doc.text('Relatório ESG Completo', 105, 25, { align: 'center' })
    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    doc.text(`Setor: ${companyInfo.sector || 'N/A'} • Responsável: ${companyInfo.technicalResponsible || 'N/A'}`, 105, 33, { align: 'center' })
    doc.text(`Data: ${timestamp}`, 105, 41, { align: 'center' })

    // Score ESG Global
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.text('Score ESG Global', 20, 65)
    doc.setFontSize(48)
    doc.setTextColor(16, 185, 129)
    doc.text(`${esgScore}`, 105, 85, { align: 'center' })
    doc.setFontSize(12)
    doc.setTextColor(100, 100, 100)
    doc.text('de 100 pontos', 105, 95, { align: 'center' })

    // Scores dos Pilares
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'bold')
    doc.text('Breakdown por Pilar', 20, 110)

    const pillarData = [
      ['Pilar', 'Score', 'Peso', 'Contribuição'],
      ['Ambiental', `${esgData.environmental.score}/100`, '35%', `${(esgData.environmental.score * 0.35).toFixed(1)}`],
      ['Social', `${esgData.social.score}/100`, '30%', `${(esgData.social.score * 0.30).toFixed(1)}`],
      ['Governança', `${esgData.governance.score}/100`, '35%', `${(esgData.governance.score * 0.35).toFixed(1)}`]
    ]

    autoTable(doc, {
      startY: 115,
      head: [pillarData[0]],
      body: pillarData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255] },
      styles: { fontSize: 11 }
    })

    // Métricas Detalhadas - Ambiental
    doc.addPage()

    // Header nas páginas de pilares
    doc.setFillColor(16, 185, 129)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont(undefined, 'bold')
    doc.text(`${companyInfo.name || 'Empresa'} - Pilar Ambiental`, 105, 18, { align: 'center' })

    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(16, 185, 129)
    doc.text('Métricas Ambientais', 20, 45)
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'normal')
    doc.text(`Score: ${esgData.environmental.score}/100`, 20, 55)

    const envMetrics = Object.entries(esgData.environmental.metrics).map(([key, metric]) => [
      metric.name,
      `${metric.value}/100`,
      `${(metric.weight * 100).toFixed(0)}%`,
      metric.status
    ])

    autoTable(doc, {
      startY: 60,
      head: [['Métrica', 'Valor', 'Peso', 'Status']],
      body: envMetrics,
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94] }
    })

    const envSuggestion = generateSuggestions('environmental', esgData.environmental.score)
    doc.setFontSize(11)
    doc.setFont(undefined, 'bold')
    doc.text('Sugestões de Melhoria:', 20, doc.lastAutoTable.finalY + 10)
    doc.setFont(undefined, 'normal')
    const splitSuggestion = doc.splitTextToSize(envSuggestion, 170)
    doc.text(splitSuggestion, 20, doc.lastAutoTable.finalY + 18)

    // Métricas Detalhadas - Social
    doc.addPage()

    // Header Social
    doc.setFillColor(59, 130, 246)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont(undefined, 'bold')
    doc.text(`${companyInfo.name || 'Empresa'} - Pilar Social`, 105, 18, { align: 'center' })

    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(59, 130, 246)
    doc.text('Métricas Sociais', 20, 45)
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'normal')
    doc.text(`Score: ${esgData.social.score}/100`, 20, 55)

    const socialMetrics = Object.entries(esgData.social.metrics).map(([key, metric]) => [
      metric.name,
      `${metric.value}/100`,
      `${(metric.weight * 100).toFixed(0)}%`,
      metric.status
    ])

    autoTable(doc, {
      startY: 60,
      head: [['Métrica', 'Valor', 'Peso', 'Status']],
      body: socialMetrics,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    })

    const socialSuggestion = generateSuggestions('social', esgData.social.score)
    doc.setFontSize(11)
    doc.setFont(undefined, 'bold')
    doc.text('Sugestões de Melhoria:', 20, doc.lastAutoTable.finalY + 10)
    doc.setFont(undefined, 'normal')
    const splitSocialSuggestion = doc.splitTextToSize(socialSuggestion, 170)
    doc.text(splitSocialSuggestion, 20, doc.lastAutoTable.finalY + 18)

    // Métricas Detalhadas - Governança
    doc.addPage()

    // Header Governança
    doc.setFillColor(168, 85, 247)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont(undefined, 'bold')
    doc.text(`${companyInfo.name || 'Empresa'} - Pilar Governança`, 105, 18, { align: 'center' })

    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.setTextColor(168, 85, 247)
    doc.text('Métricas de Governança', 20, 45)
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'normal')
    doc.text(`Score: ${esgData.governance.score}/100`, 20, 55)

    const govMetrics = Object.entries(esgData.governance.metrics).map(([key, metric]) => [
      metric.name,
      `${metric.value}/100`,
      `${(metric.weight * 100).toFixed(0)}%`,
      metric.status
    ])

    autoTable(doc, {
      startY: 60,
      head: [['Métrica', 'Valor', 'Peso', 'Status']],
      body: govMetrics,
      theme: 'striped',
      headStyles: { fillColor: [168, 85, 247] }
    })

    const govSuggestion = generateSuggestions('governance', esgData.governance.score)
    doc.setFontSize(11)
    doc.setFont(undefined, 'bold')
    doc.text('Sugestões de Melhoria:', 20, doc.lastAutoTable.finalY + 10)
    doc.setFont(undefined, 'normal')
    const splitGovSuggestion = doc.splitTextToSize(govSuggestion, 170)
    doc.text(splitGovSuggestion, 20, doc.lastAutoTable.finalY + 18)

    // Rodapé em todas as páginas
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(9)
      doc.setTextColor(150, 150, 150)
      doc.text(`Gerado por ESG Nexus Pro • ${timestamp}`, 105, 285, { align: 'center' })
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' })
    }

    return doc
  }

  const handleExport = (format) => {
    console.log('handleExport called with format:', format)
    const timestamp = new Date().toISOString().split('T')[0]

    if (format === 'excel') {
      // Exportar CSV completo com dados adicionais
      let csv = 'Categoria,Métrica,Valor,Peso,Status,Sugestão\n'

      Object.entries(esgData).forEach(([pillar, data]) => {
        if (data.metrics) {
          Object.entries(data.metrics).forEach(([key, metric]) => {
            const suggestion = generateSuggestions(pillar, data.score).substring(0, 100)
            csv += `${pillar},${metric.name},${metric.value},${metric.weight},${metric.status},"${suggestion}"\n`
          })
        }
      })

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ESG-Report-${timestamp}.csv`
      a.click()
      setShowExportModal(false)

    } else if (format === 'pdf') {
      console.log('Generating PDF...')
      try {
        const doc = generatePDF()
        console.log('PDF generated, saving...')
        doc.save(`ESG-Report-${timestamp}.pdf`)
        console.log('PDF saved successfully')
        setShowExportModal(false)

        // Enviar automaticamente para o email cadastrado
        if (companyInfo.email) {
          setTimeout(() => {
            handleAutoSendEmail(doc, timestamp)
          }, 500)
        }
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Erro ao gerar PDF: ' + error.message)
      }
    }
  }

  // Função para enviar PDF automaticamente
  const handleAutoSendEmail = async (doc, timestamp) => {
    try {
      const pdfBlob = doc.output('blob')

      // Converter para base64
      const reader = new FileReader()
      reader.readAsDataURL(pdfBlob)
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]

        const templateParams = {
          to_email: companyInfo.email,
          from_name: 'ESG Nexus Pro',
          company_name: companyInfo.name,
          message: `Olá ${companyInfo.technicalResponsible},\n\nSegue em anexo o relatório ESG completo da ${companyInfo.name} gerado em ${new Date().toLocaleDateString('pt-BR')}.\n\nAtenciosamente,\nESG Nexus Pro`,
          pdf_attachment: base64data
        }

        // Enviar email via EmailJS
        await emailjs.send('service_dggqn0s', 'template_gl7qjvp', templateParams)

        alert(`✅ Relatório PDF enviado com sucesso para ${companyInfo.email}!`)
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      alert(`⚠️ PDF salvo localmente, mas houve erro ao enviar para ${companyInfo.email}.`)
    }
  }

  // Função para enviar PDF por email (modal manual)
  const handleSendEmail = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor, insira um email válido.')
      return
    }

    setSendingEmail(true)

    try {
      // Gerar PDF
      const doc = generatePDF()
      const pdfBlob = doc.output('blob')

      // Converter para base64
      const reader = new FileReader()
      reader.readAsDataURL(pdfBlob)
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]

        const templateParams = {
          to_email: email,
          from_name: 'ESG Nexus Pro',
          company_name: companyInfo.name,
          message: `Segue em anexo o relatório ESG completo gerado em ${new Date().toLocaleDateString('pt-BR')}.`,
          pdf_attachment: base64data
        }

        // Enviar email via EmailJS
        await emailjs.send('service_dggqn0s', 'template_gl7qjvp', templateParams)

        alert(`✅ Relatório enviado com sucesso para ${email}!`)
        setShowEmailModal(false)
        setEmail('')
        setSendingEmail(false)
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      alert('Erro ao enviar email. Tente novamente.')
      setSendingEmail(false)
    }
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
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {companyInfo.name || 'ESG Nexus Pro'}
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {companyInfo.sector ? `${companyInfo.sector} • Plataforma ESG` : 'Plataforma Profissional de Gestão ESG'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Methodology Button */}
              <button
                onClick={() => setShowMethodologyModal(true)}
                className={`p-2.5 rounded-lg transition-all ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                title="Metodologia de Avaliação"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

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

            </div>

            <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border-2 border-blue-200'}`}>
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>📧 Envio por Email</h4>
                  <p className={`${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                    Após gerar o relatório PDF, você terá a opção de enviá-lo diretamente por email para qualquer destinatário.
                    O PDF incluirá todas as métricas, KPIs do dashboard e sugestões personalizadas de melhoria.
                  </p>
                </div>
              </div>
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

      {/* Modal de Metodologia */}
      {showMethodologyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8`}>
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-inherit pb-4 border-b dark:border-gray-700">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📊 Metodologia de Avaliação ESG
              </h2>
              <button
                onClick={() => setShowMethodologyModal(false)}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Disclaimer */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>⚠️ Disclaimer Importante</h3>
                    <p className={`${darkMode ? 'text-yellow-200' : 'text-yellow-900'} leading-relaxed`}>
                      Esta plataforma é uma ferramenta de <strong>gestão e acompanhamento interno</strong> de métricas ESG.
                      As notas inseridas devem ser baseadas em <strong>auditorias profissionais, certificações externas e dados verificáveis</strong>.
                      Os scores não substituem avaliações oficiais de agências de rating (MSCI, Sustainalytics, CDP, etc.) e devem ser
                      validados por consultores especializados antes de divulgação pública.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sistema de Pontuação */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🎯 Sistema de Pontuação (0-100)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">🟢</span>
                      <h4 className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-800'}`}>90-100 | Excelente</h4>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-green-200' : 'text-green-700'}`}>
                      Práticas líderes de mercado, certificações internacionais, transparência total e metas ambiciosas cumpridas.
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">🔵</span>
                      <h4 className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>70-89 | Bom</h4>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      Conformidade com principais frameworks, programas estruturados e melhorias contínuas demonstradas.
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">🟡</span>
                      <h4 className={`font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>50-69 | Moderado</h4>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                      Práticas básicas implementadas, mas com lacunas significativas e necessidade de melhorias estruturais.
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">🔴</span>
                      <h4 className={`font-bold ${darkMode ? 'text-red-400' : 'text-red-800'}`}>0-49 | Crítico</h4>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-700'}`}>
                      Ausência de práticas essenciais, não-conformidade regulatória ou riscos materiais não gerenciados.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cálculo do Score ESG */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📐 Cálculo do Score ESG Global
                </h3>
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        🌱 Pilar Ambiental
                      </span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        👥 Pilar Social
                      </span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ⚖️ Pilar Governança
                      </span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>35%</span>
                    </div>
                    <div className={`pt-4 mt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>Fórmula:</strong> Score ESG = (Ambiental × 0.35) + (Social × 0.30) + (Governança × 0.35)
                      </p>
                      <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Cada pilar é calculado pela média ponderada de suas métricas específicas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Como Aplicar Notas */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ✍️ Como Aplicar as Notas
                </h3>
                <ol className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500 flex-shrink-0">1.</span>
                    <span>
                      <strong>Coleta de Dados:</strong> Reúna documentação oficial (certificados ISO, relatórios de auditoria,
                      medições de emissões verificadas, registros de treinamento, etc.)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500 flex-shrink-0">2.</span>
                    <span>
                      <strong>Benchmarking:</strong> Compare seus dados com padrões do setor e best practices
                      (ex: MSCI ESG Ratings Methodology, GRI Standards, SASB)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500 flex-shrink-0">3.</span>
                    <span>
                      <strong>Avaliação:</strong> Para cada métrica, atribua uma nota (0-100) baseada no gap entre
                      sua performance atual e as melhores práticas do mercado
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500 flex-shrink-0">4.</span>
                    <span>
                      <strong>Inserção:</strong> Acesse a aba específica (Ambiental/Social/Governança),
                      clique em "Adicionar Dados" e insira os valores avaliados
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="font-bold text-blue-500 flex-shrink-0">5.</span>
                    <span>
                      <strong>Revisão Periódica:</strong> Atualize as métricas trimestralmente ou conforme novas
                      auditorias/certificações sejam obtidas
                    </span>
                  </li>
                </ol>
              </div>

              {/* Frameworks de Referência */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📚 Frameworks de Referência
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'GRI', desc: 'Global Reporting Initiative' },
                    { name: 'SASB', desc: 'Sustainability Standards' },
                    { name: 'TCFD', desc: 'Climate Disclosures' },
                    { name: 'CDP', desc: 'Carbon Disclosure' },
                    { name: 'MSCI', desc: 'ESG Ratings' },
                    { name: 'ISO 14001', desc: 'Environmental Mgmt' },
                    { name: 'ISO 45001', desc: 'Occupational Safety' },
                    { name: 'B Corp', desc: 'Certified B Corp' }
                  ].map((framework, idx) => (
                    <div key={idx} className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{framework.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{framework.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão Fechar */}
              <div className="pt-4">
                <button
                  onClick={() => setShowMethodologyModal(false)}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-lg"
                >
                  Entendi
                </button>
              </div>
            </div>
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

            </div>
          </div>
        </div>
      )}

      {/* Modal de Email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-md w-full p-8`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📧 Enviar Relatório por Email
              </h2>
              <button
                onClick={() => {
                  setShowEmailModal(false)
                  setEmail('')
                }}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Email de destino:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500/50`}
                  disabled={sendingEmail}
                />
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                  ℹ️ O relatório PDF completo com todas as métricas, KPIs e sugestões de melhoria será enviado para o email informado.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false)
                    setEmail('')
                  }}
                  disabled={sendingEmail}
                  className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all font-bold ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={sendingEmail || !email}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {sendingEmail ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Enviar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Informações da Empresa */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-lg w-full p-8`}>
            <div className="mb-6 text-center">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                🏢 Informações da Empresa
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Preencha as informações antes de iniciar a avaliação ESG
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                  placeholder="Ex: Empresa Sustentável LTDA"
                  className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/50`}
                />
              </div>

              <div>
                <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Setor de Atuação *
                </label>
                <input
                  type="text"
                  value={companyInfo.sector}
                  onChange={(e) => setCompanyInfo({...companyInfo, sector: e.target.value})}
                  placeholder="Ex: Energia Renovável, Tecnologia, Construção Civil"
                  className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/50`}
                />
              </div>

              <div>
                <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Responsável Técnico *
                </label>
                <input
                  type="text"
                  value={companyInfo.technicalResponsible}
                  onChange={(e) => setCompanyInfo({...companyInfo, technicalResponsible: e.target.value})}
                  placeholder="Ex: João Silva - Gerente de Sustentabilidade"
                  className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/50`}
                />
              </div>

              <div>
                <label className={`block text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
                  Email para Receber Relatórios *
                </label>
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                  placeholder="exemplo@empresa.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/50`}
                />
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-emerald-900/30 border border-emerald-700' : 'bg-emerald-50 border border-emerald-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-emerald-200' : 'text-emerald-900'}`}>
                  ℹ️ O relatório PDF será enviado automaticamente para este email quando gerado.
                </p>
              </div>

              <button
                onClick={() => {
                  if (companyInfo.name && companyInfo.sector && companyInfo.technicalResponsible && companyInfo.email) {
                    if (!/\S+@\S+\.\S+/.test(companyInfo.email)) {
                      alert('Por favor, insira um email válido.')
                      return
                    }
                    setShowCompanyModal(false)
                  } else {
                    alert('Por favor, preencha todos os campos obrigatórios.')
                  }
                }}
                className="w-full px-4 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all font-bold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Continuar para a Plataforma</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`mt-16 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/tadeu-santana-037802a2/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">👨‍💼</span>
                </div>
              </a>
              <div>
                <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Desenvolvido por Eng. Tadeu Santana
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Engenheiro especializado em projetos sustentáveis e ESG
                </p>
              </div>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>© 2025 ESG Nexus Pro - Todos os direitos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App