# Nexus LS — Portal de Atualizações & Ativador de Licença 🚀

Aplicação web moderna desenvolvida para o ecossistema **Nexus LS**, responsável pela distribuição centralizada de novas versões do software e gestão completa de ativação e licenciamento de clientes.

Pronta para deploy contínuo na **Vercel** e conectada ao **Firebase Firestore**.

---

## 🌟 Funcionalidades Principais

### 1. Central de Atualizações (Nexus LS Update)
- **Detecção e Exibição da Última Versão:** Apresenta a versão disponível (ex: `v1.1.1`), data de lançamento, tamanho do arquivo executável (`.exe`) e hash SHA-256 para integridade.
- **Download Direto:** Botão para download rápido da versão oficial.
- **Changelog Detalhado:** Notas de lançamento categorizadas em *Novidades*, *Melhorias* e *Correções* (ex: telas responsivas, novo layout de início, performance).
- **Histórico Completo:** Linha do tempo com versões anteriores e notas de lançamento.
- **Painel Administrativo:** Interface intuitiva para publicação de novas versões diretamente no Firestore com sincronização em tempo real.

### 2. Ativador de Licença (Nexus LS Activator)
- **Emissão de Chaves Padronizadas:** Gera chaves formatadas (`NXLS-XXXX-XXXX-XXXX-XXXX`).
- **Vinculação por Hardware (HWID):** Suporte opcional à identificação da máquina para evitar pirataria e clonagem.
- **Planos e Validades Flexíveis:** Emissão para 30 dias (teste), 90 dias, 365 dias (anual) ou Vitalícia.
- **Validador de Licenças:** Consulta rápida para administradores ou clientes verificarem o status e expiração de qualquer chave.
- **Guia Visual Passo a Passo:** Explicação detalhada de como ativar o software no computador do cliente.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Banco de Dados em Nuvem:** [Firebase Firestore](https://firebase.google.com/)
- **Hospedagem / Deploy:** [Vercel](https://vercel.com/)

---

## ⚙️ Configuração do Firebase

A aplicação já está integrada ao projeto **nexus-ls** no Firebase.

Coleções utilizadas no Firestore:
- `atualizacoes`: Armazena os lançamentos de novas versões, URLs de download e changelogs.
- `licencas`: Registra as chaves geradas, clientes associados, HWIDs e datas de expiração.

> **Fallback Offline:** Caso o Firestore esteja sem regras de escrita abertas ou sem conexão, o sistema salva e lê do armazenamento local (`localStorage`), garantindo que o portal nunca quebre para o usuário.

---

## 💻 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Lukkzz11/Nexus-LS---Update.git
   cd Nexus-LS---Update
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Gerar a build de produção:**
   ```bash
   npm run build
   ```

---

## 🚀 Como Fazer Deploy na Vercel

O projeto conta com o arquivo `vercel.json` configurado para roteamento SPA automático.

### Passo a Passo:
1. Acesse sua conta na [Vercel](https://vercel.com).
2. Clique em **"Add New..."** ➔ **"Project"**.
3. Importe o repositório GitHub:
   ```
   https://github.com/Lukkzz11/Nexus-LS---Update.git
   ```
4. Na tela de configuração:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**.
6. Pronto! A cada novo `git push` na branch `main`, a Vercel atualizará o site automaticamente.

---

## 📄 Licença e Direitos

Desenvolvido para o ecossistema **Nexus LS**. Todos os direitos reservados.
