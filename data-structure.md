# 📊 Estrutura de Dados - ESG Platform

## Modelo de Dados Completo

### 1. Estrutura Principal

```javascript
const esgDataModel = {
  // Metadados
  companyId: "string",
  companyName: "string",
  sector: "string",
  reportingPeriod: "YYYY-MM",
  lastUpdated: "ISO 8601 date",
  currency: "EUR|USD|BRL",
  
  // Scores principais
  esgRiskScore: number, // 0-100 (calculado)
  
  // Três pilares ESG
  environmental: EnvironmentalData,
  social: SocialData,
  governance: GovernanceData,
  
  // Histórico
  historicalData: Array<HistoricalRecord>,
  
  // Metadados de auditoria
  audit: AuditData
}
```

### 2. Dados Ambientais Detalhados

```javascript
const EnvironmentalData = {
  score: number, // 0-100 (calculado)
  trend: "up" | "down" | "stable",
  lastAssessment: "ISO 8601 date",
  
  metrics: {
    climateRisk: {
      name: "Riscos Climáticos",
      value: number, // 0-100
      weight: 0.25, // peso no score ambiental
      status: "excellent" | "good" | "moderate" | "poor" | "critical",
      
      details: {
        // Riscos Físicos
        physicalRisk: number, // 0-100
        physicalRiskFactors: {
          floodRisk: number,
          droughtRisk: number,
          heatStress: number,
          seaLevelRise: number,
          extremeWeather: number
        },
        
        // Riscos de Transição
        transitionRisk: number, // 0-100
        transitionRiskFactors: {
          policyRisk: number,
          technologyRisk: number,
          marketRisk: number,
          reputationRisk: number
        },
        
        // Metas e Verificação
        netZeroTarget: "YYYY",
        scienceBasedTarget: boolean,
        verifiedByThirdParty: boolean,
        verificationBody: "string", // ex: "SBTi", "CDP"
        
        // Climate-adjusted PD
        climateAdjustedPD: number, // probability of default %
        climateSценarios: ["1.5°C", "2°C", "3°C"],
        tcfdAligned: boolean
      }
    },
    
    emissions: {
      name: "Emissões GEE",
      value: number, // 0-100
      weight: 0.25,
      status: "string",
      
      details: {
        // Valores absolutos
        scope1: number, // tCO2e
        scope2Location: number, // tCO2e
        scope2Market: number, // tCO2e
        scope3: {
          total: number, // tCO2e
          categories: {
            purchasedGoods: number,
            capitalGoods: number,
            fuelEnergy: number,
            upstreamTransport: number,
            waste: number,
            businessTravel: number,
            employeeCommuting: number,
            upstreamLeased: number,
            downstreamTransport: number,
            processing: number,
            useOfProducts: number,
            endOfLife: number,
            downstreamLeased: number,
            franchises: number,
            investments: number
          }
        },
        
        // Intensidades
        intensity: {
          revenue: number, // tCO2e/M€
          employee: number, // tCO2e/employee
          squareMeter: number, // tCO2e/m²
          product: number // tCO2e/unit
        },
        
        // Reduções
        reductionYoY: number, // %
        reductionVsBaseline: number, // %
        baselineYear: "YYYY",
        
        // Compensação
        offsetPercentage: number, // %
        removalCredits: number, // tCO2e
        avoidanceCredits: number // tCO2e
      }
    },
    
    resourceEfficiency: {
      name: "Economia Circular",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Materiais
        recyclingRate: number, // %
        recyclableContent: number, // %
        virginMaterials: number, // %
        hazardousWaste: number, // tons
        wasteToLandfill: number, // tons
        wasteReduction: number, // % YoY
        
        // Commodities críticas
        rareMetalsDependency: "High" | "Medium" | "Low",
        criticalMaterials: [
          {
            material: "string",
            dependency: number, // %
            alternatives: boolean,
            recyclingRate: number // %
          }
        ],
        
        // Circularidade
        circularityScore: number, // 0-100
        productLifeExtension: number, // months
        repairabilityIndex: number, // 0-10
        takeBckProgram: boolean
      }
    },
    
    waterManagement: {
      name: "Gestão Hídrica",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Consumo
        totalConsumption: number, // m³
        consumptionIntensity: number, // m³/M€
        
        // Eficiência
        reuseRate: number, // %
        recycleRate: number, // %
        rainwaterHarvesting: number, // m³
        
        // Risco hídrico
        waterStressAreas: number, // número de sites
        waterStressPercentage: number, // % operações em áreas de stress
        
        // Qualidade
        wastewaterTreated: number, // %
        waterQualityViolations: number,
        
        // CDP Water
        cdpWaterScore: "A" | "B" | "C" | "D" | "F"
      }
    },
    
    biodiversity: {
      name: "Biodiversidade",
      value: number, // 0-100
      weight: 0.20,
      status: "string",
      
      details: {
        // Impacto
        biodiversityFootprint: "High" | "Medium" | "Low",
        protectedAreasImpacted: number,
        criticalHabitats: number,
        iucnRedListSpecies: number,
        
        // Dependências
        ecosystemDependency: "High" | "Medium" | "Low",
        ecosystemServices: ["string"],
        
        // Ações positivas
        restorationProjects: number,
        restorationHectares: number,
        biodiversityOffsets: number, // hectares
        nativeSpeciesPrograms: number,
        
        // Frameworks
        tnfdAligned: boolean,
        sbtForNature: boolean
      }
    }
  }
}
```

### 3. Dados Sociais Detalhados

```javascript
const SocialData = {
  score: number, // 0-100
  trend: "up" | "down" | "stable",
  lastAssessment: "ISO 8601 date",
  
  metrics: {
    humanRights: {
      name: "Direitos Humanos",
      value: number, // 0-100
      weight: 0.25,
      status: "string",
      
      details: {
        // Auditoria de fornecedores
        suppliersTotal: number,
        tier1Audited: number, // %
        tier2Audited: number, // %
        tier3Audited: number, // %
        
        // Riscos identificados
        highRiskSuppliers: number,
        violations: number,
        correctiveActions: number,
        terminatedContracts: number,
        
        // Avaliações
        slaveryFootprint: "High" | "Medium" | "Low",
        childLaborRisk: "High" | "Medium" | "Low",
        forcedLaborRisk: "High" | "Medium" | "Low",
        
        // Certificações
        sa8000Certified: boolean,
        bsciAudited: boolean,
        smetaAudited: boolean,
        
        // Due Diligence
        humanRightsPolicy: boolean,
        grievanceMechanism: boolean,
        remediation: boolean
      }
    },
    
    diversity: {
      name: "Diversidade & Inclusão",
      value: number, // 0-100
      weight: 0.20,
      status: "string",
      
      details: {
        // Gênero
        womenTotal: number, // %
        womenLeadership: number, // %
        womenBoard: number, // %
        womenSTEM: number, // %
        
        // Etnia (onde aplicável)
        ethnicDiversity: number, // %
        ethnicLeadership: number, // %
        
        // Pay Gap
        genderPayGap: number, // %
        ethnicityPayGap: number, // %
        
        // Inclusão
        inclusionScore: number, // 0-10
        lgbtqPolicies: boolean,
        disabilityInclusion: number, // % employees
        
        // Programas
        mentoringPrograms: boolean,
        unconsciousBiasTraining: boolean,
        flexibleWork: boolean,
        parentalLeave: {
          maternity: number, // weeks
          paternity: number // weeks
        }
      }
    },
    
    communityImpact: {
      name: "Impacto Comunitário",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Impacto econômico
        localEmployment: number, // %
        localSuppliers: number, // %
        localTaxes: number, // currency
        
        // Investimento social
        socialInvestment: number, // currency
        volunteerHours: number,
        proBonoValue: number, // currency
        
        // SROI
        sroi: number, // ratio
        beneficiaries: number,
        
        // Programas
        educationPrograms: number,
        healthPrograms: number,
        infrastructureProjects: number,
        
        // Engajamento
        communityConsultations: number,
        grievances: number,
        satisfactionScore: number // 0-10
      }
    },
    
    employeeWellbeing: {
      name: "Bem-estar dos Funcionários",
      value: number, // 0-100
      weight: 0.20,
      status: "string",
      
      details: {
        // Saúde mental
        burnoutRate: number, // %
        stressIndex: number, // 0-100
        mentalHealthSupport: boolean,
        employeeAssistanceProgram: boolean,
        
        // Satisfação
        satisfactionScore: number, // 0-10
        eNPS: number, // -100 to 100
        engagementScore: number, // 0-100
        
        // Retenção
        turnover: number, // %
        voluntaryTurnover: number, // %
        averageTenure: number, // years
        
        // Benefícios
        healthInsurance: boolean,
        lifeInsurance: boolean,
        retirementPlan: boolean,
        profitSharing: boolean,
        stockOptions: boolean,
        
        // Work-life balance
        remoteWork: boolean,
        flexibleHours: boolean,
        unlimitedPTO: boolean,
        sabbatical: boolean
      }
    },
    
    safety: {
      name: "Segurança",
      value: number, // 0-100
      weight: 0.20,
      status: "string",
      
      details: {
        // Indicadores principais
        ltifr: number, // Lost Time Injury Frequency Rate
        trifr: number, // Total Recordable Injury Frequency Rate
        fatalities: number,
        
        // Indicadores proativos
        nearMisses: number,
        hazardReports: number,
        safetyObservations: number,
        
        // Treinamento
        safetyTrainingHours: number,
        safetyTrainingCoverage: number, // %
        
        // Certificações
        iso45001: boolean,
        ohsas18001: boolean,
        
        // Programas
        behaviorBasedSafety: boolean,
        stopWorkAuthority: boolean,
        safetyCommittees: number
      }
    }
  }
}
```

### 4. Dados de Governança Detalhados

```javascript
const GovernanceData = {
  score: number, // 0-100
  trend: "up" | "down" | "stable",
  lastAssessment: "ISO 8601 date",
  
  metrics: {
    esgIntegration: {
      name: "Integração ESG",
      value: number, // 0-100
      weight: 0.20,
      status: "string",
      
      details: {
        // Remuneração
        compensationLinked: number, // %
        ceoCompensationESG: number, // %
        ltipESGMetrics: boolean,
        
        // Estrutura
        esgCommittee: boolean,
        esgCommitteeIndependent: boolean,
        esgCommitteeMeetings: number, // per year
        
        // Estratégia
        strategyIntegrated: boolean,
        materialityAssessment: boolean,
        stakeholderEngagement: boolean,
        
        // KPIs
        esgKPIs: number, // count
        publicTargets: boolean,
        progressTracking: boolean
      }
    },
    
    boardStructure: {
      name: "Estrutura do Conselho",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Composição
        boardSize: number,
        independentDirectors: number, // %
        nonExecutive: number, // %
        
        // Diversidade
        womenBoard: number, // %
        ethnicMinorities: number, // %
        internationalBoard: number, // %
        
        // Experiência
        averageTenure: number, // years
        averageAge: number,
        relevantExpertise: number, // %
        
        // Práticas
        boardEvaluations: boolean,
        successionPlanning: boolean,
        termLimits: boolean,
        overboarding: number, // % with >3 boards
        
        // Reuniões
        boardMeetings: number, // per year
        attendance: number // % average
      }
    },
    
    transparency: {
      name: "Transparência",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Ratings ESG
        msciScore: "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "CCC",
        sustainalyticsRisk: "Negligible" | "Low" | "Medium" | "High" | "Severe",
        cdpClimate: "A" | "B" | "C" | "D" | "F",
        
        // Disclosure
        disclosureScore: number, // 0-100
        integratedReporting: boolean,
        tcfdReport: boolean,
        sasb Standards: boolean,
        griStandards: boolean,
        
        // Auditoria
        auditTrail: boolean,
        externalAssurance: boolean,
        assuranceScope: "Limited" | "Reasonable",
        
        // Comunicação
        quarterlyReports: boolean,
        investorDays: number,
        webcasts: boolean
      }
    },
    
    cyberEthics: {
      name: "Cyber & Ética",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Cibersegurança
        dataBreaches: number,
        breachSeverity: "None" | "Low" | "Medium" | "High" | "Critical",
        cyberInsurance: boolean,
        
        // Certificações
        iso27001: boolean,
        iso27701: boolean,
        socCompliance: bo
        olean,
        
        // Privacidade
        gdprCompliant: boolean,
        lgpdCompliant: boolean,
        privacyOfficer: boolean,
        
        // IA Ética
        aiEthicsPolicy: boolean,
        aiGovernance: boolean,
        algorithmicBias: boolean,
        explainableAI: boolean,
        
        // Treinamento
        cyberTraining: number, // % employees
        phishingTests: number, // per year
        ethicsTraining: number // % employees
      }
    },
    
    compliance: {
      name: "Compliance",
      value: number, // 0-100
      weight: 0.15,
      status: "string",
      
      details: {
        // Violações
        fines: number,
        fineAmount: number, // currency
        investigations: number,
        litigations: number,
        
        // Políticas
        codeOfConduct: boolean,
        anticorruptionPolicy: boolean,
        antitrustPolicy: boolean,
        sanctionsCompliance: boolean,
        
        // Programas
        whistleblowerChannel: boolean,
        whistleblowerCases: number,
        whistleblowerProtection: boolean,
        
        // Treinamento
        complianceTraining: number, // %
        anticorruptionTraining: number, // %
        
        // Due Diligence
        thirdPartyDueDiligence: boolean,
        politicalContributions: number,
        lobbying: number
      }
    },
    
    cryptoTreasury: {
      name: "Tesouraria Digital",
      value: number, // 0-100
      weight: 0.20,
      status: "string",
      
      details: {
        // Alocação Bitcoin
        btcAllocation: number, // %
        btcAmount: number, // BTC
        btcValue: number, // currency
        
        // Sustentabilidade
        sustainableMining: boolean,
        renewableEnergy: number, // %
        carbonNeutral: boolean,
        
        // Governança
        boardApproved: boolean,
        investmentPolicy: boolean,
        riskFramework: boolean,
        
        // Custódia
        custodyType: "Self" | "Third-party" | "Multi-sig" | "MPC",
        custodyProvider: "string",
        insurance: boolean,
        
        // Performance
        unrealizedGains: number, // %
        realizedGains: number, // currency
        
        // Outras criptos (se aplicável)
        otherCrypto: [
          {
            asset: "string",
            allocation: number, // %
            sustainable: boolean
          }
        ]
      }
    }
  }
}
```

### 5. Estrutura de Histórico

```javascript
const HistoricalRecord = {
  period: "YYYY-MM",
  esgRiskScore: number,
  environmental: {
    score: number,
    metrics: {} // snapshot das métricas
  },
  social: {
    score: number,
    metrics: {} // snapshot das métricas
  },
  governance: {
    score: number,
    metrics: {} // snapshot das métricas
  },
  events: [
    {
      date: "ISO 8601",
      type: "string",
      description: "string",
      impact: "High" | "Medium" | "Low"
    }
  ]
}
```

### 6. Estrutura de Auditoria

```javascript
const AuditData = {
  lastAudit: "ISO 8601 date",
  auditor: "string",
  auditType: "Internal" | "External" | "Third-party",
  
  dataQuality: {
    completeness: number, // %
    accuracy: number, // %
    timeliness: number, // %
    consistency: number, // %
    validity: number // %
  },
  
  verifications: [
    {
      metric: "string",
      verified: boolean,
      verifier: "string",
      date: "ISO 8601",
      certificate: "string" // URL ou ID
    }
  ],
  
  changes: [
    {
      timestamp: "ISO 8601",
      user: "string",
      metric: "string",
      oldValue: any,
      newValue: any,
      reason: "string"
    }
  ]
}
```

### 7. Cálculos e Fórmulas

```javascript
// ESG Risk Score Principal
function calculateESGRiskScore(environmental, social, governance) {
  const weights = {
    environmental: 0.35,
    social: 0.30,
    governance: 0.35
  };
  
  return (
    environmental.score * weights.environmental +
    social.score * weights.social +
    governance.score * weights.governance
  );
}

// Score de cada pilar
function calculatePillarScore(metrics) {
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const metric of Object.values(metrics)) {
    totalScore += metric.value * metric.weight;
    totalWeight += metric.weight;
  }
  
  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

// Normalização de valores
function normalizeValue(value, min, max, inverse = false) {
  let normalized = ((value - min) / (max - min)) * 100;
  
  if (inverse) {
    normalized = 100 - normalized;
  }
  
  return Math.max(0, Math.min(100, normalized));
}

// Status baseado no score
function getStatus(score) {
  if (score >= 80) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "moderate";
  if (score >= 30) return "poor";
  return "critical";
}
```

### 8. Validações de Dados

```javascript
const validationRules = {
  // Validações numéricas
  percentage: (value) => value >= 0 && value <= 100,
  positive: (value) => value >= 0,
  year: (value) => value >= 2000 && value <= 2100,
  
  // Validações de formato
  date: (value) => !isNaN(Date.parse(value)),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  
  // Validações lógicas
  targetYear: (value, current) => value > current,
  scope3: (value, scope1, scope2) => value > scope1 + scope2,
  
  // Validações de consistência
  totalPercentage: (values) => values.reduce((a, b) => a + b, 0) === 100,
  boardIndependence: (independent, total) => independent <= total
};
```

### 9. Mapeamento de Benchmarks

```javascript
const industryBenchmarks = {
  "technology": {
    environmental: {
      emissions: { excellent: 30, good: 50, moderate: 100 },
      renewable: { excellent: 80, good: 60, moderate: 40 }
    },
    social: {
      diversity: { excellent: 40, good: 30, moderate: 20 },
      turnover: { excellent: 10, good: 15, moderate: 20 }
    }
  },
  "manufacturing": {
    // benchmarks específicos
  },
  "finance": {
    // benchmarks específicos
  }
  // outros setores...
};
```

## 📤 Formato de Importação/Exportação

### JSON Format
```json
{
  "version": "1.0",
  "timestamp": "2025-01-15T10:00:00Z",
  "data": { /* estrutura completa */ }
}
```

### CSV Format
```csv
metric,category,subcategory,value,unit,date
emissions_scope1,environmental,ghg,12500,tCO2e,2025-01-15
emissions_scope2,environmental,ghg,8300,tCO2e,2025-01-15
```

---
*Documentação técnica v1.0*