import React, { useState } from 'react';
import { 
  DownloadCloud, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileCode2, 
  ShieldAlert, 
  ArrowRight, 
  RefreshCw, 
  HardDrive, 
  ExternalLink,
  Laptop,
  Check,
  Copy
} from 'lucide-react';

export default function UpdateModule({ versions, loading, onRefresh }) {
  const [copiedHash, setCopiedHash] = useState(false);
  const latest = versions && versions.length > 0 ? versions[0] : null;
  const previousVersions = versions && versions.length > 1 ? versions.slice(1) : [];

  const handleCopyHash = (hash) => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  if (!latest) {
    return (
      <div className="text-center py-20">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Carregando informações de atualização...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-950 border border-blue-500/20 p-6 sm:p-10 shadow-2xl shadow-blue-950/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Último Lançamento Disponível</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Nexus LS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">v{latest.version}</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Atualização oficial com telas responsivas aprimoradas, novo layout moderno de início, melhorias críticas de desempenho e validação em nuvem.
              </p>
            </div>

            {/* Specs Badges */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Lançado: {latest.releaseDate || 'Recente'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                <span>Tamanho: {latest.fileSize || '48 MB'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <Laptop className="w-3.5 h-3.5 text-blue-400" />
                <span>Windows 10 / 11 (64-bit)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={latest.downloadUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5"
              >
                <DownloadCloud className="w-5 h-5" />
                <span>Baixar Atualização Oficial (.exe)</span>
              </a>

              <button
                onClick={onRefresh}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : ''}`} />
                <span>Checar Novamente</span>
              </button>
            </div>

            {/* SHA Hash verification */}
            {latest.sha256 && (
              <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
                <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono truncate max-w-xs sm:max-w-md">SHA256: {latest.sha256}</span>
                <button 
                  onClick={() => handleCopyHash(latest.sha256)}
                  className="hover:text-blue-400 transition-colors p-1"
                  title="Copiar Checksum SHA256"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            )}
          </div>

          {/* Quick Changelog Preview Box */}
          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                O que há de novo na v{latest.version}
              </h3>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Recomendada
              </span>
            </div>

            <ul className="space-y-3">
              {latest.changelog && latest.changelog.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                    item.type === 'new'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : item.type === 'fix'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.type === 'new' ? 'Novo' : item.type === 'fix' ? 'Correção' : 'Melhoria'}
                  </span>
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 text-center">
              <a
                href="#historico"
                className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-semibold"
              >
                Ver histórico completo de versões
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* How Nexus LS Updates Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h4 className="text-base font-bold text-white">Download Automático ou Manual</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            O próprio aplicativo Nexus LS notifica quando uma nova versão é lançada, ou você pode baixar o executável diretamente por este portal.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h4 className="text-base font-bold text-white">Instalação Rápida e Segura</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Execute o instalador <code className="text-blue-400 font-mono">NexusLS-Setup.exe</code>. O instalador preserva seus dados locais, configurações e banco de dados intactos.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/30 transition-all space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h4 className="text-base font-bold text-white">Licença Mantida</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sua ativação e chave de licença continuam válidas após a atualização sem necessidade de reativação para o mesmo computador.
          </p>
        </div>
      </div>

      {/* Version History Section */}
      <div id="historico" className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Histórico de Versões</h2>
            <p className="text-xs sm:text-sm text-slate-400">Linha do tempo e notas de lançamento anteriores do Nexus LS</p>
          </div>
        </div>

        <div className="space-y-4">
          {versions.map((ver, index) => (
            <div 
              key={ver.id || index}
              className={`p-5 rounded-2xl border transition-all ${
                index === 0 
                  ? 'bg-slate-900/90 border-blue-500/40 shadow-lg shadow-blue-950/30' 
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-white">v{ver.version}</span>
                  {index === 0 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Versão Atual
                    </span>
                  )}
                  {ver.isMandatory && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Atualização Obrigatória
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{ver.releaseDate}</span>
                  {ver.downloadUrl && (
                    <a
                      href={ver.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Changelog items */}
              <div className="pt-3">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ver.changelog && ver.changelog.map((c, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{c.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
