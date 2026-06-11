import React from "react";

// Lista exata de prêmios e extras do bolão baseado no seu pedido
const LISTA_CATEGORIAS = [
  { id: "campeao", label: "🥇 Campeão da Copa" },
  { id: "vice", label: "🥈 Vice-Campeão" },
  { id: "semis", label: "🤝 Semifinalistas" },
  { id: "quartas", label: "🏅 Chegam nas Quartas" },
  { id: "golden_ball", label: "⚽ Golden Ball (Melhor Jogador)" },
  { id: "golden_boot", label: "🥾 Golden Boot (Artilheiro)" },
  { id: "golden_glove", label: "🧤 Golden Glove (Melhor Goleiro)" },
  { id: "young_player", label: "👶 Best Young Player (Melhor Jovem)" },
  { id: "fair_play", label: "🕊️ Fair Play Trophy" },
  { id: "surpresa", label: "🚀 Seleção Surpresa" },
  { id: "decepcao", label: "📉 Seleção Decepção" },
  { id: "primeiro_gol", label: "⏱️ Primeiro Gol da Copa (Quem faz)" },
  { id: "maior_goleada", label: "🔥 Maior Goleada da Copa" },
  { id: "melhor_jogo", label: "🍿 Melhor Jogo da Copa" },
  { id: "total_gols", label: "⚽ Quantidade Total de Gols na Copa" },
  { id: "total_cartoes", label: "🟨 Quantidade Total de Cartões" },
];

export default function Premios({
  meusPremios,
  onSalvarPremios,
  usuario,
  agoraUtc,
  dataLimite,
}) {
  // Trava de segurança cruzando o relógio do aparelho convertido em UTC com o início da Copa
  const horarioLimite = new Date(dataLimite).getTime();
  const horarioAtual = new Date(agoraUtc).getTime();
  const travado = horarioAtual >= horarioLimite;

  function atualizarPremio(categoriaId, valor) {
    onSalvarPremios({ [categoriaId]: valor });
  }

  return (
    <div className="px-4 pb-4 pt-2 max-w-md mx-auto">
      {/* Box de Status de Modificação */}
      <div
        className={`rounded-2xl p-3.5 mb-4 border transition-colors ${
          travado
            ? "bg-red-500/10 border-red-500/20 text-center"
            : "bg-[#1F2833]/50 border-white/5 text-center"
        }`}
      >
        {travado ? (
          <p className="text-red-300 text-xs font-bold leading-relaxed">
            🔒 A Copa do Mundo já começou! Todos os palpites de prêmios de longo
            prazo foram congelados pelo sistema.
          </p>
        ) : (
          <p className="text-gray-300 text-xs leading-relaxed font-medium">
            📝 Digite abaixo seus palpites especiais. <br />
            Eles serão{" "}
            <span className="text-[#C5A059] font-black">
              bloqueados permanentemente
            </span>{" "}
            no minuto em que a Copa iniciar hoje!
          </p>
        )}
      </div>

      {/* Grid de Inputs de Prêmios */}
      <div className="flex flex-col gap-3.5">
        {LISTA_CATEGORIAS.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#1F2833] rounded-2xl p-3.5 border border-white/5 shadow-md"
          >
            <label className="block text-gray-400 text-[11px] font-black mb-2 uppercase tracking-wider">
              {cat.label}
            </label>
            <input
              type="text"
              disabled={travado}
              placeholder={
                travado ? "Nenhum palpite registrado" : "Escreva seu palpite..."
              }
              value={meusPremios[cat.id] || ""}
              onChange={(e) => atualizarPremio(cat.id, e.target.value)}
              className={`w-full h-11 px-3.5 rounded-xl border text-sm font-bold transition-all
                placeholder:text-gray-600
                ${
                  travado
                    ? "bg-white/5 border-white/5 text-gray-400 cursor-not-allowed"
                    : "bg-[#0B0C10] border-white/10 text-white focus:border-[#C5A059] focus:outline-none shadow-inner"
                }`}
            />
          </div>
        ))}
      </div>

      <div className="h-6" />
    </div>
  );
}
