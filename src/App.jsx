import React, { useState, useEffect } from "react";
import {
  PARTICIPANTES,
  JOGOS_INICIAIS,
  DATA_LIMITE_PREMIOS,
} from "./bolao-copa/src/data";
import Ranking from "./bolao-copa/src/Ranking";
import Palpites from "./bolao-copa/src/Palpites";
import Premios from "./bolao-copa/src/Premios";
import Admin from "./bolao-copa/src/Admin";
import Regras from "./bolao-copa/src/Regras";

// Gerenciador interno simplificado para salvar tudo no celular sem quebrar
function useLocalStorageSimples(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return [storedValue, setValue];
}

export default function App() {
  const [usuario, setUsuario] = useLocalStorageSimples("bolao_usuario", null);
  const [abaAtiva, setAbaAtiva] = useState("palpites");
  const [jogos, setJogos] = useLocalStorageSimples(
    "bolao_jogos",
    JOGOS_INICIAIS
  );

  // Banco de dados interno cruzado para salvar palpites e prêmios de todos
  const [allPalpites, setAllPalpites] = useLocalStorageSimples(
    "bolao_todos_palpites",
    {}
  );
  const [allPremios, setAllPremios] = useLocalStorageSimples(
    "bolao_todos_premios",
    {}
  );
  const [agoraUtc, setAgoraUtc] = useState(new Date().toISOString());

  // Atualiza o relógio a cada segundo para verificar travas automáticas
  useEffect(() => {
    const interval = setInterval(() => {
      setAgoraUtc(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // TELA 1: Seleção de Usuário (Quem é você no grupo?)
  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col items-center justify-center px-4 font-sans">
        <div className="w-full max-w-md bg-[#1F2833] rounded-3xl p-6 border border-[#C5A059]/20 text-center shadow-2xl">
          <span className="text-5xl mb-2 block">🏆</span>
          <h1 className="text-xl font-black text-white tracking-wide uppercase mb-1">
            Bolão CHAPETERRORISTAS 2026
          </h1>
          <p className="text-gray-400 text-xs mb-6">
            Escolha o seu nome na lista para dar os seus palpites e acompanhar
            os pontos.
          </p>

          <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {PARTICIPANTES.map((nome) => (
              <button
                key={nome}
                onClick={() => setUsuario(nome)}
                className="h-12 bg-[#0B0C10] border border-white/5 rounded-xl font-semibold text-sm text-gray-200 hover:border-[#C5A059] active:scale-95 transition-all"
              >
                {nome}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const meusPalpites = allPalpites[usuario] || {};
  const meusPremios = allPremios[usuario] || {};

  const handleSavePalpite = (jogoId, golsA, golsB) => {
    setAllPalpites((prev) => ({
      ...prev,
      [usuario]: { ...(prev[usuario] || {}), [jogoId]: { golsA, golsB } },
    }));
  };

  const handleSavePremios = (novosPremios) => {
    setAllPremios((prev) => ({
      ...prev,
      [usuario]: { ...(prev[usuario] || {}), ...novosPremios },
    }));
  };

  const handleImportDados = (novosJogos, todosPalpites, todosPremios) => {
    if (novosJogos) setJogos(novosJogos);
    if (todosPalpites) setAllPalpites(todosPalpites);
    if (todosPremios) setAllPremios(todosPremios);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-24 font-sans antialiased selection:bg-[#C5A059]/30">
      {/* CABEÇALHO (HEADER EMBUTIDO) */}
      <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between max-w-md mx-auto">
        <div>
          <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest block">
            Chapeterroristas 💣💥
          </span>
          <h2 className="text-base font-black text-white uppercase tracking-tight">
            {abaAtiva === "ranking" && "📊 Ranking Geral"}
            {abaAtiva === "palpites" && "⚽ Meus Palpites"}
            {abaAtiva === "regras" && "📜 A Visão do Bolão"}
            {abaAtiva === "premios" && "🏆 Prêmios & Extras"}
            {abaAtiva === "admin" && "⚙️ Sincronização"}
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-[#1F2833] px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-xs font-bold text-gray-200">{usuario}</span>
          <button
            onClick={() => setUsuario(null)}
            className="text-[10px] text-gray-500 hover:text-red-400 font-medium border-l border-white/10 pl-2"
          >
            Trocar
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL DAS ABAS */}
      <main className="max-w-md mx-auto pt-2">
        {abaAtiva === "ranking" && (
          <Ranking jogos={jogos} allPalpites={allPalpites} />
        )}
        {abaAtiva === "palpites" && (
          <Palpites
            jogos={jogos}
            meusPalpites={meusPalpites}
            onSalvarPalpite={handleSavePalpite}
            usuario={usuario}
            agoraUtc={agoraUtc}
          />
        )}
        {abaAtiva === "premios" && (
          <Premios
            meusPremios={meusPremios}
            onSalvarPremios={handleSavePremios}
            usuario={usuario}
            agoraUtc={agoraUtc}
            dataLimite={DATA_LIMITE_PREMIOS}
          />
        )}
        {abaAtiva === "regras" && <Regras />}
        {abaAtiva === "admin" && (
          <Admin
            jogos={jogos}
            setJogos={setJogos}
            allPalpites={allPalpites}
            allPremios={allPremios}
            onImport={handleImportDados}
          />
        )}
      </main>

      {/* MENU INFERIOR MOBILE (NAV INFERIOR EMBUTIDA) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0B0C10] border-t border-white/5 py-2 px-4 flex items-center justify-around z-50 max-w-md mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {[
          { id: "ranking", label: "Ranking", icon: "📊" },
          { id: "palpites", label: "Jogos", icon: "⚽" },
          { id: "premios", label: "Prêmios", icon: "🏆" },
          { id: "regras", label: "Visão", icon: "📜" },
          { id: "admin", label: "Admin", icon: "⚙️" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAbaAtiva(tab.id)}
            className={`flex flex-col items-center gap-0.5 min-w-[60px] transition-all ${
              abaAtiva === tab.id
                ? "text-[#C5A059] scale-105 font-bold"
                : "text-gray-500 text-opacity-80"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
