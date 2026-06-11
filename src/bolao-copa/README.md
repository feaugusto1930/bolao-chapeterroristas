# Bolão Copa do Mundo 2026 🏆

Interface mobile-first em React + Tailwind CSS para gerenciar o bolão de 12 amigos.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Deploy no Vercel

```bash
npm run build
```
Suba a pasta gerada (`dist/`) ou conecte o repositório diretamente no Vercel
(framework preset: **Vite**).

## Estrutura

- `src/data.js` — participantes, jogos, regras de pontuação e funções utilitárias
- `src/useLocalStorage.js` — hook de persistência local
- `src/SelecaoUsuario.jsx` — tela "Quem é você?"
- `src/Header.jsx` / `src/NavInferior.jsx` — layout (header + navegação inferior)
- `src/Ranking.jsx` — aba 📊 Ranking
- `src/Palpites.jsx` — aba ⚽ Palpites dos Jogos
- `src/Premios.jsx` — aba 🏆 Prêmios & Extras
- `src/Admin.jsx` — aba ⚙️ Painel Admin (senha padrão: `copa2026`)

## Personalização rápida

- **Jogos**: edite o array `JOGOS_INICIAIS` em `src/data.js` com a tabela oficial completa.
- **Pontuação**: ajuste o objeto `PONTOS` em `src/data.js`.
- **Senha do admin**: altere `SENHA_ADMIN` em `src/Admin.jsx`.
- **Cores**: edite `tailwind.config.js` (chaves `bg`, `card`, `gold`, `light`).

## Regras de bloqueio

- Cada jogo trava os palpites **5 minutos antes** do horário marcado.
- A aba Prêmios & Extras trava **inteiramente e permanentemente** assim que a constante
  `INICIO_COPA` (em `src/data.js`) for atingida.

## Persistência

Todos os dados (usuário ativo, palpites, prêmios e resultados) ficam salvos no
`localStorage` do navegador — ideal para um grupo pequeno usando o mesmo link
no celular. Para sincronização entre dispositivos, será necessário um backend
(ex: Firebase, Supabase) substituindo o `useLocalStorage`.
