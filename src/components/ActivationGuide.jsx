import React from 'react';
import { 
  Laptop, 
  KeyRound, 
  CheckCircle2, 
  HelpCircle, 
  Terminal, 
  ShieldCheck, 
  ArrowRight,
  MonitorCheck
} from 'lucide-react';

export default function ActivationGuide({ onGoToLicense }) {
  const steps = [
    {
      step: 1,
      title: "Abra o Nexus LS no seu Computador",
      desc: "Ao iniciar o sistema pela primeira vez ou quando sua licença estiver expirada, a tela de Ativação do Nexus LS será exibida automaticamente solicitando a chave.",
      icon: Laptop
    },
    {
      step: 2,
      title: "Copie o Código da Máquina (HWID)",
      desc: "Na tela do software, você verá o campo 'Identificador do Computador / HWID'. Clique no botão de copiar ao lado do código.",
      icon: Terminal
    },
    {
      step: 3,
      title: "Gere ou Solicite a Chave de Licença",
      desc: "Utilize o módulo 'Ativador de Licença' deste portal, preenchendo o nome da sua empresa e o Código da Máquina para gerar o token NXLS.",
      icon: KeyRound
    },
    {
      step: 4,
      title: "Cole a Chave e Conclua a Ativação",
      desc: "Retorne ao Nexus LS, cole o token gerado no campo 'Chave de Licença' e clique em 'Ativar Sistema'. O acesso total será liberado instantaneamente.",
      icon: MonitorCheck
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Guia Passo a Passo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Como Ativar o seu <span className="text-blue-500">Nexus LS</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Siga o procedimento abaixo para registrar seu software com segurança e começar a utilizá-lo.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div 
              key={s.step} 
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 transition-all space-y-4 shadow-lg shadow-slate-950/40"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-700">0{s.step}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="text-center pt-4">
        <button
          onClick={onGoToLicense}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
        >
          <span>Ir para o Gerador de Licença</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* FAQ / Troubleshooting */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          Perguntas Frequentes sobre Ativação
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">Preciso de internet para ativar?</h4>
            <p className="text-slate-400 leading-relaxed">
              O Nexus LS requer conexão com a internet apenas no momento da primeira validação. Após ativado, o sistema opera 100% offline normalmente.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">Posso usar a mesma chave em outro computador?</h4>
            <p className="text-slate-400 leading-relaxed">
              Cada chave de licença é vinculada exclusivamente à máquina em que foi ativada. Para transferir para outro PC, contate o administrador para desvincular o HWID anterior.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">O que acontece quando o período expirar?</h4>
            <p className="text-slate-400 leading-relaxed">
              O software avisará com antecedência quando restarem 7 dias para a expiração. Seus dados nunca são excluídos ou perdidos, bastando renovar a chave para continuar.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">Formatei o computador, como reativar?</h4>
            <p className="text-slate-400 leading-relaxed">
              Na maioria dos casos, o HWID continua o mesmo após formatar a mesma máquina. Caso o Windows altere algum identificador, entre em contato com o suporte com o novo código.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
