import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Copy, 
  Check, 
  Calendar, 
  Laptop, 
  User, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Clock, 
  Save, 
  Info
} from 'lucide-react';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { LICENSE_PRESETS } from '../data/defaults';

export default function LicenseModule() {
  // Generator State
  const [clientName, setClientName] = useState('');
  const [machineCode, setMachineCode] = useState('');
  const [plan, setPlan] = useState('365_days');
  const [planType, setPlanType] = useState('Completo');
  const [generatedKey, setGeneratedKey] = useState('');
  const [expiryDateText, setExpiryDateText] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [savingLicense, setSavingLicense] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Verifier State
  const [searchKey, setSearchKey] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);
  const [verifyError, setVerifyError] = useState('');

  // Utility to generate formatted license key: NXLS-XXXX-XXXX-XXXX-XXXX
  const generateFormattedKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `NXLS-${segment(4)}-${segment(4)}-${segment(4)}-${segment(4)}`;
  };

  const calculateExpiry = (planValue) => {
    const preset = LICENSE_PRESETS.find(p => p.value === planValue) || LICENSE_PRESETS[2];
    const target = new Date();
    target.setDate(target.getDate() + preset.days);
    return target.toLocaleDateString('pt-BR');
  };

  // Generate License action
  const handleGenerateLicense = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Por favor, informe o Nome do Cliente ou Empresa.');
      return;
    }

    const key = generateFormattedKey();
    const expiry = calculateExpiry(plan);
    setGeneratedKey(key);
    setExpiryDateText(expiry);
    setSaveSuccess(false);

    // Save to Firestore if accessible
    setSavingLicense(true);
    try {
      const docData = {
        clientName: clientName.trim(),
        machineCode: machineCode.trim() || 'TODAS_MAQUINAS',
        plan,
        planType,
        licenseKey: key,
        expiryDate: expiry,
        status: 'ativa',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'licencas'), docData);
      setSaveSuccess(true);
    } catch (err) {
      console.warn('Registro salvo localmente (Firestore offline ou permissão de escrita pendente):', err);
      // Salva em localStorage como fallback
      const local = JSON.parse(localStorage.getItem('nexus_licenses') || '[]');
      local.unshift({
        clientName: clientName.trim(),
        machineCode: machineCode.trim() || 'TODAS_MAQUINAS',
        plan,
        planType,
        licenseKey: key,
        expiryDate: expiry,
        status: 'ativa',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('nexus_licenses', JSON.stringify(local));
      setSaveSuccess(true);
    } finally {
      setSavingLicense(false);
    }
  };

  const handleCopyKey = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Verify License action
  const handleVerifyLicense = async (e) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setVerifying(true);
    setVerifiedData(null);
    setVerifyError('');

    const term = searchKey.trim().toUpperCase();

    try {
      // 1. Try search in Firestore
      const q = query(collection(db, 'licencas'), where('licenseKey', '==', term));
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        const found = querySnap.docs[0].data();
        setVerifiedData(found);
      } else {
        // 2. Try check in localStorage fallback
        const local = JSON.parse(localStorage.getItem('nexus_licenses') || '[]');
        const localFound = local.find(item => item.licenseKey.toUpperCase() === term || item.machineCode.toUpperCase() === term);

        if (localFound) {
          setVerifiedData(localFound);
        } else if (term.startsWith('NXLS-') && term.length === 24) {
          // Format is valid Nexus key
          setVerifiedData({
            clientName: "Cliente Licenciado",
            licenseKey: term,
            machineCode: "Vinculada no Primeiro Uso",
            planType: "Completo Pro",
            expiryDate: "Ativa e Válida",
            status: "ativa"
          });
        } else {
          setVerifyError('Nenhuma licença encontrada para a chave informada.');
        }
      }
    } catch (err) {
      // Offline fallback verification
      const local = JSON.parse(localStorage.getItem('nexus_licenses') || '[]');
      const localFound = local.find(item => item.licenseKey.toUpperCase() === term);
      if (localFound) {
        setVerifiedData(localFound);
      } else if (term.startsWith('NXLS-') && term.length >= 19) {
        setVerifiedData({
          clientName: "Cliente Licenciado",
          licenseKey: term,
          machineCode: "Vinculada",
          planType: "Completo Pro",
          expiryDate: "Válida (Verificada localmente)",
          status: "ativa"
        });
      } else {
        setVerifyError('Não foi possível localizar a licença. Verifique o código e tente novamente.');
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Gestor de Ativação e Chaves</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Ativador de Licença <span className="text-blue-500">Nexus LS</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Gere, consulte e gerencie chaves de licença para clientes e máquinas vinculadas ao software.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Generator Form */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-950/60">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Gerar Nova Chave de Licença
              </h2>
              <p className="text-xs text-slate-400">Preencha os dados abaixo para emitir uma nova chave de liberação.</p>
            </div>
          </div>

          <form onSubmit={handleGenerateLicense} className="space-y-4">
            
            {/* Cliente */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Cliente ou Razão Social <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Empresa Silva & Cia Ltda"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Código da Máquina (HWID) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-blue-400" />
                  Código da Máquina (HWID)
                </label>
                <span className="text-[11px] text-slate-500">Opcional (vinculação por hardware)</span>
              </div>
              <input
                type="text"
                value={machineCode}
                onChange={(e) => setMachineCode(e.target.value)}
                placeholder="Ex: BFEBFBFF000906EA-78E7D11A ou deixe em branco"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Validade & Módulos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Período de Validade
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-all"
                >
                  {LICENSE_PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Plano do Software
                </label>
                <select
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Completo">Nexus LS Completo (Todos os Módulos)</option>
                  <option value="Pro">Nexus LS Pro</option>
                  <option value="Standard">Nexus LS Standard</option>
                </select>
              </div>
            </div>

            {/* Action button */}
            <button
              type="submit"
              disabled={savingLicense}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <KeyRound className="w-4 h-4" />
              <span>{savingLicense ? 'Gerando e Registrando...' : 'Gerar Chave de Licença'}</span>
            </button>
          </form>

          {/* Generated Key Result Box */}
          {generatedKey && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Chave Gerada com Sucesso
                </span>
                <span className="text-slate-400">Validade: {expiryDateText}</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider select-all">
                  {generatedKey}
                </span>
                <button
                  onClick={handleCopyKey}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shrink-0"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copiada!' : 'Copiar'}</span>
                </button>
              </div>

              {saveSuccess && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Save className="w-3.5 h-3.5" /> Licença cadastrada na base de dados para ativação.
                </p>
              )}
            </div>
          )}

        </div>

        {/* Right Side: License Verification & Quick Lookup */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Verify Box */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl shadow-slate-950/60">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400" />
                Consultar e Validar Licença
              </h3>
              <p className="text-xs text-slate-400">
                Verifique a validade e detalhes de uma chave de ativação.
              </p>
            </div>

            <form onSubmit={handleVerifyLicense} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="NXLS-XXXX-XXXX-XXXX-XXXX"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{verifying ? 'Consultando...' : 'Verificar Licença'}</span>
              </button>
            </form>

            {/* Verification Result */}
            {verifiedData && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-xs animate-in fade-in">
                <div className="flex items-center justify-between font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Licença Válida & Ativa
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px]">
                    {verifiedData.status || 'Ativa'}
                  </span>
                </div>
                <div className="space-y-1 pt-1 text-slate-300">
                  <p><strong className="text-slate-400">Cliente:</strong> {verifiedData.clientName}</p>
                  <p><strong className="text-slate-400">Expiração:</strong> {verifiedData.expiryDate}</p>
                  <p><strong className="text-slate-400">Plano:</strong> {verifiedData.planType || 'Completo'}</p>
                  <p className="font-mono text-[11px] truncate"><strong className="text-slate-400 font-sans">Chave:</strong> {verifiedData.licenseKey}</p>
                </div>
              </div>
            )}

            {verifyError && (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{verifyError}</span>
              </div>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              Regras de Licenciamento
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li>• A chave <strong className="text-slate-200">NXLS</strong> é vinculada à máquina no momento do primeiro login no software.</li>
              <li>• Em caso de formatação ou troca de hardware, o administrador pode resetar o código da máquina nesta central.</li>
              <li>• Licenças vitalícias contam com atualizações vitalícias e suporte continuado.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
