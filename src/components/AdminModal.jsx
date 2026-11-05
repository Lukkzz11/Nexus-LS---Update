import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileCode2,
  HardDrive,
  Link2
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminModal({ isOpen, onClose, onVersionPublished }) {
  const [version, setVersion] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [sha256, setSha256] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [changelogItems, setChangelogItems] = useState([
    { type: 'new', text: '' }
  ]);
  const [publishing, setPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleAddChangelogItem = () => {
    setChangelogItems([...changelogItems, { type: 'new', text: '' }]);
  };

  const handleRemoveChangelogItem = (index) => {
    setChangelogItems(changelogItems.filter((_, i) => i !== index));
  };

  const handleChangelogChange = (index, field, value) => {
    const updated = [...changelogItems];
    updated[index][field] = value;
    setChangelogItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!version.trim() || !downloadUrl.trim()) {
      alert('Preencha ao menos a Versão e o Link de Download.');
      return;
    }

    setPublishing(true);
    setStatusMessage(null);

    const filteredChangelog = changelogItems
      .filter(item => item.text.trim().length > 0)
      .map(item => ({ type: item.type, text: item.text.trim() }));

    const newVersionData = {
      version: version.trim().replace(/^v/, ''),
      releaseDate: new Date().toLocaleDateString('pt-BR'),
      downloadUrl: downloadUrl.trim(),
      fileSize: fileSize.trim() || '48.0 MB',
      sha256: sha256.trim() || '',
      isMandatory,
      changelog: filteredChangelog.length > 0 ? filteredChangelog : [
        { type: 'improvement', text: 'Melhorias gerais de estabilidade e segurança.' }
      ],
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'atualizacoes'), newVersionData);
      setStatusMessage({ type: 'success', text: `Versão v${newVersionData.version} publicada com sucesso no Firestore!` });
      if (onVersionPublished) onVersionPublished(newVersionData);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.warn('Erro ao salvar no Firestore:', err);
      // Salva localmente em cache
      const local = JSON.parse(localStorage.getItem('nexus_custom_versions') || '[]');
      local.unshift(newVersionData);
      localStorage.setItem('nexus_custom_versions', JSON.stringify(local));
      
      setStatusMessage({ 
        type: 'success', 
        text: `Versão v${newVersionData.version} salva localmente no navegador (Firestore necessita de regras de gravação).` 
      });
      if (onVersionPublished) onVersionPublished(newVersionData);
      setTimeout(() => {
        onClose();
      }, 1800);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Upload className="w-3.5 h-3.5" />
            Painel do Desenvolvedor
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Publicar Nova Versão do Nexus LS
          </h2>
          <p className="text-xs text-slate-400">
            Cadastre os dados da nova release no Firestore para disponibilizar o download para os usuários.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Número da Versão <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Ex: 1.1.2"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Tamanho Estimado
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="Ex: 48.9 MB"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-blue-400" />
              URL de Download do Instalador (.exe) <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              required
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              placeholder="https://github.com/Lukkzz11/Nexus-LS---Update/releases/download/v1.1.2/NexusLS-Setup.exe"
              className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              Hash SHA-256 (Opcional para integridade)
            </label>
            <input
              type="text"
              value={sha256}
              onChange={(e) => setSha256(e.target.value)}
              placeholder="Ex: a1b2c3d4..."
              className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Mandatory Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isMandatory"
              checked={isMandatory}
              onChange={(e) => setIsMandatory(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isMandatory" className="text-xs font-medium text-slate-300 cursor-pointer">
              Marcar como atualização obrigatória / crítica
            </label>
          </div>

          {/* Changelog items editor */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Notas de Lançamento (Changelog)
              </label>
              <button
                type="button"
                onClick={handleAddChangelogItem}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Linha
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {changelogItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <select
                    value={item.type}
                    onChange={(e) => handleChangelogChange(idx, 'type', e.target.value)}
                    className="w-28 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs shrink-0"
                  >
                    <option value="new">Novo</option>
                    <option value="improvement">Melhoria</option>
                    <option value="fix">Correção</option>
                  </select>

                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleChangelogChange(idx, 'text', e.target.value)}
                    placeholder="Descrição da novidade..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  />

                  {changelogItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChangelogItem(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status feedback */}
          {statusMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={publishing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>{publishing ? 'Gravando no Firestore...' : 'Publicar Atualização'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
