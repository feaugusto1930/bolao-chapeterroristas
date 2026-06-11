import React, { useMemo } from "react";
import { PARTICIPANTES, calcularPontosJogo } from "./data";

export default function Ranking({ jogos, allPalpites }) {
  const dadosRanking = useMemo(() => {
    return PARTICIPANTES.map((nome) => {
      let pontos = 0;
      let placaresExatos = 0;
      let palpitesFeitos = 0;
      let jogosComResultado = 0;

      jogos.forEach((jogo) => {
        const palpite = allPalpites?.[nome]?.[jogo.id];

        if (
          palpite &&
          palpite.golsA !== undefined &&
          palpite.golsB !== undefined &&
          palpite.golsA !== "" &&
          palpite.golsB !== ""
        ) {
          palpitesFeitos++;
        }

        if (jogo.golsA_real !== null && jogo.golsB_real !== null) {
          jogosComResultado++;

          const pA = palpite?.golsA;
          const pB = palpite?.golsB;

          const p = calcularPontosJogo(
            pA,
            pB,
            jogo.golsA_real,
            jogo.golsB_real
          );
          pontos += p;

          if (p === 6) {
            placaresExatos++;
          }
        }
      });

      return {
        nome,
        pontos,
        placaresExatos,
        palpitesFeitos,
        jogosComResultado,
      };
    }).sort(
      (a, b) => b.pontos - a.pontos || b.placaresExatos - a.placaresExatos
    );
  }, [jogos, allPalpites]);

  const totalJogosFinalizados = jogos.filter(
    (j) => j.golsA_real !== null && j.golsB_real !== null
  ).length;

  const lider = dadosRanking[0];
  const maisPlacaresExatos = [...dadosRanking].sort(
    (a, b) => b.placaresExatos - a.placaresExatos
  )[0];

  return (
    <div className="px-4 pb-4 pt-2 max-w-md mx-auto">
      {/* Cards de Destaque Superior */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#1F2833] rounded-2xl p-3 border border-[#C5A059]/20 shadow-md">
          <p className="text-gray-400 text-[11px] mb-0.5 font-medium">
            👑 Líder Atual
          </p>
          <p className="text-white font-black text-base truncate">
            {lider?.nome || "-"}
          </p>
          <p className="text-[#C5A059] text-xs font-bold">
            {lider?.pontos || 0} PTS
          </p>
        </div>
        <div className="bg-[#1F2833] rounded-2xl p-3 border border-white/5 shadow-md">
          <p className="text-gray-400 text-[11px] mb-0.5 font-medium">
            🎯 O Mitador (Cravadas)
          </p>
          <p className="text-white font-black text-base truncate">
            {maisPlacaresExatos?.placaresExatos > 0
              ? maisPlacaresExatos.nome
              : "-"}
          </p>
          <p className="text-[#C5A059] text-xs font-bold">
            {maisPlacaresExatos?.placaresExatos || 0} cravadas
          </p>
        </div>
      </div>

      {totalJogosFinalizados === 0 && (
        <div className="bg-[#1F2833]/40 border border-white/5 rounded-2xl p-4 mb-4 text-center">
          <p className="text-gray-400 text-xs leading-relaxed">
            Nenhum placar oficial lançado ainda. O ranking vai pegar fogo assim
            que a bola rolar! ⚽🔥
          </p>
        </div>
      )}

      {/* Tabela de Classificação */}
      <div className="bg-[#1F2833] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="bg-white/[0.02] text-gray-400 text-[11px] uppercase tracking-wider font-bold border-b border-white/5">
              <th
                className="text-left py-3 pl-3 font-semibold"
                style={{ width: "40px" }}
              >
                #
              </th>
              <th className="text-left py-3 font-semibold">Nome</th>
              <th
                className="text-center py-3 font-semibold"
                style={{ width: "55px" }}
              >
                Pts
              </th>
              <th
                className="text-center py-3 pr-3 font-semibold"
                style={{ width: "55px" }}
              >
                🎯
              </th>
            </tr>
          </thead>
          <tbody>
            {dadosRanking.map((dado, i) => {
              const aproveitamento =
                totalJogosFinalizados > 0
                  ? Math.round(
                      (dado.pontos / (totalJogosFinalizados * 6)) * 100
                    )
                  : 0;

              return (
                <tr
                  key={dado.nome}
                  className={`border-b border-white/5 last:border-none transition-colors ${
                    i === 0 ? "bg-[#C5A059]/5" : ""
                  }`}
                >
                  <td className="py-3.5 pl-3">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-black ${
                        i === 0
                          ? "bg-[#C5A059] text-[#0B0C10]"
                          : i === 1
                          ? "bg-gray-300 text-[#0B0C10]"
                          : i === 2
                          ? "bg-[#cd7f32] text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <p className="text-white font-bold text-sm truncate">
                      {dado.nome}
                    </p>
                    {totalJogosFinalizados > 0 && (
                      <p className="text-gray-400 text-[10px] font-medium">
                        {aproveitamento}% de aproveitamento
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="text-[#C5A059] font-black text-sm">
                      {dado.pontos}
                    </span>
                  </td>
                  <td className="py-3.5 pr-3 text-center text-gray-300 font-semibold">
                    {dado.placaresExatos}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Box de Regras Simplificado */}
      <div className="mt-4 bg-[#1F2833]/30 p-3 rounded-2xl border border-white/5 text-center">
        <p className="text-gray-400 text-[10px] leading-relaxed font-medium">
          🎯 Placar Exato ={" "}
          <span className="text-[#C5A059] font-bold">6 pts</span> | Acertar só
          Vencedor/Empate = <span className="text-white font-bold">3 pts</span>{" "}
          <br />
          Bônus extra: <span className="text-white font-bold">+1 pt</span> por
          número exato de gols de cada time.
        </p>
      </div>
    </div>
  );
}
