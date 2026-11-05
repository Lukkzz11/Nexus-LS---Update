export const DEFAULT_VERSIONS = [
  {
    id: "v1.1.1",
    version: "1.1.1",
    releaseDate: "05/11/2026",
    downloadUrl: "https://github.com/Lukkzz11/Nexus-LS---Update/releases/download/v1.1.1/NexusLS-Setup-v1.1.1.exe",
    isMandatory: false,
    fileSize: "48.5 MB",
    sha256: "9f83ac27d8123efb0945a1c3de8134ea475f91f3a2c",
    changelog: [
      { type: "new", text: "Design 100% responsivo adaptável para todas as resoluções de tela" },
      { type: "new", text: "Novo layout na tela de início com estatísticas e atalhos em tempo real" },
      { type: "improvement", text: "Velocidade de inicialização acelerada em até 40%" },
      { type: "fix", text: "Ajuste na sincronização do validador de licenças via nuvem" },
      { type: "improvement", text: "Interface aprimorada com tons elegantes de azul e cinza escuro" }
    ]
  },
  {
    id: "v1.1.0",
    version: "1.1.0",
    releaseDate: "20/10/2026",
    downloadUrl: "https://github.com/Lukkzz11/Nexus-LS---Update/releases/download/v1.1.0/NexusLS-Setup-v1.1.0.exe",
    isMandatory: true,
    fileSize: "46.2 MB",
    sha256: "7a12cb59e1208fb11029da48fe334cb12093ea721c",
    changelog: [
      { type: "new", text: "Sistema integrado de notificação de novas versões em segundo plano" },
      { type: "new", text: "Gerenciamento e vinculação de licença por Máquina (HWID)" },
      { type: "improvement", text: "Transições de janelas mais suaves e refinadas" }
    ]
  }
];

export const LICENSE_PRESETS = [
  { label: "Teste (30 Dias)", value: "30_days", days: 30 },
  { label: "Trimestral (90 Dias)", value: "90_days", days: 90 },
  { label: "Anual (365 Dias)", value: "365_days", days: 365 },
  { label: "Vitalícia (Permanente)", value: "lifetime", days: 3650 }
];
