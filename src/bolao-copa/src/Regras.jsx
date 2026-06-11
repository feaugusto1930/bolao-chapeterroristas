import React from "react";

export default function Regras() {
  return (
    <div className="px-4 pb-4 pt-2 max-w-md mx-auto font-sans">
      <div className="bg-[#1F2833] rounded-2xl p-5 border border-white/5 shadow-md mb-4">
        <h2 className="text-[#C5A059] font-black text-xl mb-2 uppercase tracking-wide">
          A Visão do Bolão
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Salve rapaziada! Presta atenção na fita pra não ter choro nem caô
          depois. O bagulho aqui é sério, sem migué. Pega a visão de como o
          esquema funciona:
        </p>

        <div className="space-y-4">
          {/* Regra 1 */}
          <div className="bg-[#0B0C10] p-3.5 rounded-xl border border-white/5">
            <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
              <span>🎯</span> A Pontuação (Os Pontos)
            </h3>
            <ul className="text-gray-400 text-xs space-y-2 mt-2">
              <li>
                <strong className="text-[#C5A059]">
                  Cravou a fita toda (Placar Exato):
                </strong>{" "}
                6 pontos pro pai. Ex: Colocou 2x1 pro Brasil e deu 2x1.
              </li>
              <li>
                <strong className="text-white">
                  Acertou quem levou ou o empate:
                </strong>{" "}
                3 pontos pra não passar fome. Ex: Colocou 2x0 pro Brasil e foi
                3x1.
              </li>
              <li>
                <strong className="text-gray-300">Bônus de lambuja:</strong>{" "}
                Acertou os gols exatos de um dos times na partida? Leva +1
                pontinho de respiro.
              </li>
            </ul>
          </div>

          {/* Regra 2 */}
          <div className="bg-[#0B0C10] p-3.5 rounded-xl border border-white/5">
            <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
              <span>🔒</span> A Trava do Sistema (Sem Migué)
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Não adianta meter o louco de querer mudar o palpite depois que o
              juiz apitar. O sistema é blindado e{" "}
              <strong className="text-red-400">
                trava automático 5 minutos antes
              </strong>{" "}
              do jogo começar. Passou do horário, a caixa fecha e já era, truta.
            </p>
          </div>

          {/* Regra 3 */}
          <div className="bg-[#0B0C10] p-3.5 rounded-xl border border-white/5">
            <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
              <span>🏆</span> Prêmios de Longo Prazo
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Sabe aquela aba de Campeão, Artilheiro e as zoeiras? Vocês têm até
              o{" "}
              <strong className="text-[#C5A059]">
                minuto do primeiro jogo da Copa
              </strong>{" "}
              pra preencher. Quando a bola rolar no jogo de abertura, essa aba
              congela pra sempre. Mandou, mandou. Não mandou, senta e chora.
            </p>
          </div>

          {/* Regra 4 */}
          <div className="bg-[#0B0C10] p-3.5 rounded-xl border border-white/5">
            <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
              <span>🔄</span> Como Sincronizar (O Zap)
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              O celular de vocês é o cofre, os palpites ficam salvos aí. Quando
              acabar as rodadas, o Admin vai mandar um código cabuloso no grupo
              do WhatsApp. Vocês copiam a fita, vem na aba{" "}
              <strong className="text-white">Admin</strong>, cola no campo de
              importar e aperta o botão verde. O ranking atualiza na mesma hora.
            </p>
          </div>
        </div>

        <div className="mt-5 text-center border-t border-white/10 pt-4">
          <p className="text-[#C5A059] font-black text-xs uppercase tracking-widest">
            Marcha no progresso e boa sorte!
          </p>
        </div>
      </div>
      <div className="h-6" />
    </div>
  );
}
