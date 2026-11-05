import React from 'react';
import { 
  DownloadCloud, 
  KeyRound, 
  HelpCircle, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export default function Header({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  dbConnected, 
  onOpenAdmin 
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 border-slate-800 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('updates')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  NEXUS <span className="text-blue-500">LS</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Portal Oficial
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Central de Atualizações & Gerenciador de Licenças
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
            <button
              onClick={() => setActiveTab('updates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'updates'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <DownloadCloud className="w-4 h-4" />
              Atualizações
            </button>

            <button
              onClick={() => setActiveTab('license')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'license'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              Ativador de Licença
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Como Ativar
            </button>
          </nav>

          {/* Right Actions: Status, GitHub & Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-900 border-slate-800 text-slate-300">
              <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>{dbConnected ? 'Firebase Sincronizado' : 'Modo Offline/Cache'}</span>
            </div>

            {/* Admin Button */}
            <button
              onClick={onOpenAdmin}
              title="Gerenciar Versões no Firestore"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Publicar Versão</span>
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/Lukkzz11/Nexus-LS---Update"
              target="_blank"
              rel="noopener noreferrer"
              title="Repositório GitHub"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60">
          <button
            onClick={() => setActiveTab('updates')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'updates' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            Atualizações
          </button>
          <button
            onClick={() => setActiveTab('license')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'license' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Licença
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
              activeTab === 'guide' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Tutorial
          </button>
        </div>

      </div>
    </header>
  );
}
