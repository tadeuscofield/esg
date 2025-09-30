import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TenantProvider } from './contexts/TenantContext';

// Import all main components
import AdvancedCharts from './components/AdvancedCharts';
import AIInsightsEngine from './components/AIInsightsEngine';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import TenantManagement from './components/TenantManagement';
import ComplianceMonitoring from './components/ComplianceMonitoring';
import BenchmarkingAnalysis from './components/BenchmarkingAnalysis';
import BlockchainVerification from './components/BlockchainVerification';
import ESGPredictionModels from './components/ESGPredictionModels';
import StakeholderEngagement from './components/StakeholderEngagement';
import RegulatoryTracking from './components/RegulatoryTracking';

// Navigation icons
import {
  BarChart3, Brain, Activity, Building, Shield, TrendingUp,
  Link, Users, Scale, Settings, Sun, Moon, Menu, X, Home,
  ChevronDown, Bell, Search, User, LogOut
} from 'lucide-react';

const App = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Navigation modules
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, component: null },
    { id: 'charts', name: 'Analytics Avançados', icon: BarChart3, component: AdvancedCharts },
    { id: 'ai-insights', name: 'Insights com IA', icon: Brain, component: AIInsightsEngine },
    { id: 'monitoring', name: 'Monitoramento', icon: Activity, component: RealTimeMonitoring },
    { id: 'prediction', name: 'Modelos Preditivos', icon: TrendingUp, component: ESGPredictionModels },
    { id: 'compliance', name: 'Compliance', icon: Shield, component: ComplianceMonitoring },
    { id: 'benchmarking', name: 'Benchmarking', icon: BarChart3, component: BenchmarkingAnalysis },
    { id: 'blockchain', name: 'Blockchain', icon: Link, component: BlockchainVerification },
    { id: 'stakeholders', name: 'Stakeholders', icon: Users, component: StakeholderEngagement },
    { id: 'regulatory', name: 'Regulatório', icon: Scale, component: RegulatoryTracking },
    { id: 'tenant', name: 'Gestão Tenant', icon: Building, component: TenantManagement }
  ];

  // Dashboard component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bem-vindo ao ESG Nexus
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Plataforma enterprise completa para gerenciamento ESG com IA, blockchain e monitoramento em tempo real.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Score ESG</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">87.3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">+5.2% este mês</div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Compliance</h3>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">95.8%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">6 frameworks ativos</div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Stakeholders</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">78% engajamento</div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                <Link className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Blockchain</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">2,489</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">dados verificados</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Módulos Principais
          </h3>
          <div className="space-y-3">
            {modules.slice(1, 6).map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <module.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white">{module.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Atualizações Recentes
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Novo modelo de IA treinado
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Precisão aumentada para 94.7%
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  CSRD compliance atualizado
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Novos requisitos implementados
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  247 dados verificados
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Via blockchain Ethereum
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || Dashboard;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider>
      <TenantProvider>
        <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EN</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">ESG Nexus</h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Enterprise Platform</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>

                <div className="relative">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
            </div>
          </header>

          <div className="flex">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen transition-all duration-300`}>
              <nav className="p-4">
                <div className="space-y-2">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeModule === module.id
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <module.icon className={`w-5 h-5 ${activeModule === module.id ? 'text-blue-600' : 'text-gray-500'}`} />
                      {isSidebarOpen && (
                        <span className="font-medium">{module.name}</span>
                      )}
                    </button>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <ActiveComponent />
              </div>
            </main>
          </div>
        </div>
      </TenantProvider>
    </ThemeProvider>
  );
};

export default App;