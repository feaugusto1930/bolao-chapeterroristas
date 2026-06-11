import React from "react";
import { calcularPontosJogo } from "./data";

export default function Palpites({
  jogos,
  meusPalpites,
  onSalvarPalpite,
  usuario,
  agoraUtc,
}) {
  function atualizarPalpite(jogoId, campo, valor) {
    const numero =
      valor === "" ? "" : Math.max(0, Math.min(99, parseInt(valor, 10) || 0));
    const palpiteAtual = meusPalpites[jogoId] || { golsA: "", golsB: "" };

    if (campo === "golsA") {
      onSalvarPalpite(jogoId, numero, palpiteAtual.golsB);
    } else {
      onSalvarPalpite(jogoId, palpiteAtual.golsA, numero);
    }
  }

  return (
    <div className="px-4 pb-4 pt-2 max-w-md mx-auto">
      {/* Alerta de Tempo Mobile */}
      <div className="bg-[#1F2833]/50 border border-white/5 rounded-2xl p-3.5 mb-4 shadow-sm">
        <p className="text-gray-300 text-xs leading-relaxed text-center">
          🔒 Modificações travam automaticamente{" "}
          <span className="text-[#C5A059] font-bold">5 minutos antes</span> do
          pontapé inicial de cada jogo!
        </p>
      </div>

      {/* Lista de Partidas */}
      <div className="flex flex-col gap-3.5">
        {jogos.map((indigo) => {
          // Lógica universal de fuso horário por UTC
          const horarioJogo = new Date(indigo.data_utc).getTime();
          const horarioLimite = horarioJogo - 5 * 60 * 1000; // -5 minutos exatos
          const horarioAtual = new Date(agoraUtc).getTime();
          const bloqueado = horarioAtual >= horarioLimite;

          const palpite = meusPalpites[indigo.id] || { golsA: "", golsB: "" };
          const temResultado =
            indigo.golsA_real !== null && indigo.golsB_real !== null;

          const pontos = temResultado
            ? calcularPontosJogo(
                palpite.golsA,
                palpite.golsB,
                indigo.golsA_real,
                indigo.golsB_real
              )
            : 0;

          // Exibe a data no fuso horário local do aparelho de cada amigo automaticamente
          const dataLocal = new Date(indigo.data_utc).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={indigo.id}
              className="bg-[#1F2833] rounded-2xl p-4 border border-white/5 relative shadow-md"
            >
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-3 border-b border-white/[0.03] pb-1.5">
                <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider">
                  {indigo.rodada}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {dataLocal}
                </span>
              </div>

              {/* Grid Central: Times e Inputs */}
              <div className="flex items-center justify-between gap-2 py-1">
                {/* Time Mandante */}
                <div className="flex-1 flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0 select-none">
                    {indigo.emojiA}
                  </span>
                  <span className="text-white text-sm font-bold truncate">
                    {indigo.timeA}
                  </span>
                </div>

                {/* Bloco de Inputs de Placar */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="99"
                    placeholder="-"
                    disabled={bloqueado}
                    value={palpite.golsA ?? ""}
                    onChange={(e) =>
                      atualizarPalpite(indigo.id, "golsA", e.target.value)
                    }
                    className={`w-11 h-11 text-center text-lg font-black rounded-xl border transition-all
                      placeholder:text-gray-600
                      ${
                        bloqueado
                          ? "bg-white/5 border-white/5 text-gray-500 cursor-not-allowed font-bold"
                          : "bg-[#0B0C10] border-white/10 text-white focus:border-[#C5A059] focus:outline-none"
                      }`}
                  />
                  <span className="text-gray-500 font-bold text-sm">×</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="99"
                    placeholder="-"
                    disabled={bloqueado}
                    value={palpite.golsB ?? ""}
                    onChange={(e) =>
                      atualizarPalpite(indigo.id, "golsB", e.target.value)
                    }
                    className={`w-11 h-11 text-center text-lg font-black rounded-xl border transition-all
                      placeholder:text-gray-600
                      ${
                        bloqueado
                          ? "bg-white/5 border-white/5 text-gray-500 cursor-not-allowed font-bold"
                          : "bg-[#0B0C10] border-white/10 text-white focus:border-[#C5A059] focus:outline-none"
                      }`}
                  />
                </div>

                {/* Time Visitante */}
                <div className="flex-1 flex items-center gap-2.5 justify-end min-w-0">
                  <span className="text-white text-sm font-bold truncate text-right">
                    {indigo.timeB}
                  </span>
                  <span className="text-2xl shrink-0 select-none">
                    {indigo.emojiB}
                  </span>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-white/[0.03]">
                <div className="flex items-center gap-1">
                  {bloqueado ? (
                    <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                      🔒 Palpites Encerrados
                    </span>
                  ) : (
                    <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                      🟢 Aberto para Palpites
                    </span>
                  )}
                </div>

                {temResultado && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-medium">
                      Real:{" "}
                      <span className="text-white font-bold">
                        {indigo.golsA_real} x {indigo.golsB_real}
                      </span>
                    </span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        pontos === 6
                          ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30"
                          : pontos > 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-gray-500"
                      }`}
                    >
                      +{pontos} PTS
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
