import React, { useState } from "react";

const SENHA_ADMIN = "copa2026"; // Sua senha mestra para lançar resultados reais

export default function Admin({
  jogos,
  setJogos,
  allPalpites,
  allPremios,
  onImport,
}) {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [salvoId, setSalvoId] = useState(null);

  const [textoImportacao, setTextoImportacao] = useState("");
  const [sucessoSinc, setSucessoSinc] = useState(false);

  function entrar() {
    if (senha === SENHA_ADMIN) {
      setAutenticado(true);
      setErro(false);
    } else {
      setErro(true);
    }
  }

  function atualizarResultado(jogoId, campo, valor) {
    const numero =
      valor === "" ? null : Math.max(0, Math.min(99, parseInt(valor, 10) || 0));
    setJogos((prev) =>
      prev.map((j) => (j.id === jogoId ? { ...j, [campo]: numero } : j))
    );
  }

  function salvar(jogoId) {
    setSalvoId(jogoId);
    setTimeout(() => setSalvoId(null), 1500);
  }

  // Empacota todos os dados em uma linha de texto leve para mandar no Zap
  function copiarBackupGrupo() {
    const pacoteDados = { jogos, allPalpites, allPremios };
    const stringCriptografada = btoa(
      unescape(encodeURIComponent(JSON.stringify(pacoteDados)))
    );
    navigator.clipboard.writeText(stringCriptografada);
    alert(
      "🚀 Código do grupo copiado! Jogue lá no grupo do WhatsApp para a galera sincronizar."
    );
  }

  // Recebe o texto gerado e reconstrói as notas e posições na tela de quem colou
  function rodarImportacao() {
    try {
      const stringDecodificada = decodeURIComponent(
        escape(atob(textoImportacao.trim()))
      );
      const dadosAjustados = JSON.parse(stringDecodificada);

      onImport(
        dadosAjustados.jogos,
        dadosAjustados.allPalpites,
        dadosAjustados.allPremios
      );
      setSucessoSinc(true);
      setTextoImportacao("");
      setTimeout(() => setSucessoSinc(null), 3000);
    } catch (e) {
      alert("❌ Código inválido! Copie o texto completo enviado no grupo.");
    }
  }

  return (
    <div className="px-4 pb-4 pt-2 max-w-md mx-auto">
      {/* SEÇÃO 1: Sincronização Geral (Aberto para os 12 amigos colarem o resultado do WhatsApp) */}
      <div className="bg-[#1F2833] rounded-2xl p-4 border border-white/5 mb-6 shadow-md">
        <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-1.5">
          🔄 Sincronizar pelo WhatsApp
        </h3>
        <p className="text-gray-400 text-xs mb-3">
          Cole o código enviado pelo administrador para atualizar a tabela de
          jogos e conferir o ranking atualizado.
        </p>
        <textarea
          rows={2}
          placeholder="Cole o código do grupo aqui..."
          value={textoImportacao}
          onChange={(e) => setTextoImportacao(e.target.value)}
          className="w-full p-2.5 rounded-xl border border-white/10 bg-[#0B0C10] text-white text-xs placeholder:text-gray-600 focus:border-[#C5A059] focus:outline-none mb-3 resize-none font-sans"
        />
        <button
          onClick={rodarImportacao}
          className={`w-full h-11 rounded-xl font-bold text-sm transition-all active:scale-95 ${
            sucessoSinc
              ? "bg-green-600 text-white"
              : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
          }`}
        >
          {sucessoSinc ? "✓ App Sincronizado!" : "Atualizar Meu Bolão"}
        </button>
      </div>

      <hr className="border-white/5 my-5" />

      {/* SEÇÃO 2: Painel do Admin (Exige senha) */}
      {!autenticado ? (
        <div className="bg-[#1F2833] rounded-2xl p-5 border border-white/5 text-center shadow-md">
          <div className="text-3xl mb-2">🔐</div>
          <h2 className="text-white font-bold text-sm mb-1">
            Painel do Administrador
          </h2>
          <p className="text-gray-400 text-xs mb-4">
            Espaço reservado para lançar placares oficiais e disparar as notas
            do grupo.
          </p>
          <input
            type="password"
            placeholder="Senha secreta"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-white/10 bg-[#0B0C10] text-white text-sm placeholder:text-gray-600 focus:border-[#C5A059] focus:outline-none text-center mb-3"
          />
          {erro && (
            <p className="text-red-400 text-xs mb-3">
              Senha incorreta, parceiro!
            </p>
          )}
          <button
            onClick={entrar}
            className="w-full h-11 rounded-xl bg-[#C5A059] text-[#0B0C10] font-bold text-sm active:scale-95 transition-all"
          >
            Acessar Controle de Gols
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3 text-center">
            <p className="text-yellow-400 text-xs font-semibold">
              Modo Editor Ativo. Insira os placares e use o botão verde.
            </p>
          </div>

          <button
            onClick={copiarBackupGrupo}
            className="w-full h-12 bg-green-600 text-white font-black text-sm rounded-xl border border-green-500 active:scale-95 transition-transform shadow-lg mb-3"
          >
            📢 Copiar Código de Atualização (Zap)
          </button>

          {jogos.map((jogo) => {
            const dataLocal = new Date(jogo.data_utc).toLocaleString([], {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={jogo.id}
                className="bg-[#1F2833] rounded-2xl p-4 border border-white/5 shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#C5A059] font-bold uppercase">
                    {jogo.rodada}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {dataLocal}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    <span className="text-2xl">{jogo.emojiA}</span>
                    <span className="text-white text-sm font-bold truncate">
                      {jogo.timeA}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="99"
                      placeholder="-"
                      value={jogo.golsA_real ?? ""}
                      onChange={(e) =>
                        atualizarResultado(
                          jogo.id,
                          "golsA_real",
                          e.target.value
                        )
                      }
                      className="w-11 h-11 text-center text-lg font-black rounded-xl border bg-[#0B0C10] border-[#C5A059]/40 text-white focus:border-[#C5A059] focus:outline-none"
                    />
                    <span className="text-gray-500 font-bold text-sm">×</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="99"
                      placeholder="-"
                      value={jogo.golsB_real ?? ""}
                      onChange={(e) =>
                        atualizarResultado(
                          jogo.id,
                          "golsB_real",
                          e.target.value
                        )
                      }
                      className="w-12 h-12 text-center text-lg font-black rounded-xl border bg-[#0B0C10] border-[#C5A059]/40 text-white focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
                    <span className="text-white text-sm font-bold truncate text-right">
                      {jogo.timeB}
                    </span>
                    <span className="text-2xl">{jogo.emojiB}</span>
                  </div>
                </div>

                <button
                  onClick={() => salvar(jogo.id)}
                  className={`w-full h-10 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    salvoId === jogo.id
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-[#C5A059] text-[#0B0C10]"
                  }`}
                >
                  {salvoId === jogo.id
                    ? "✓ Placar Registrado!"
                    : "Confirmar Placar Real"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
