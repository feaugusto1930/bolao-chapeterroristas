import { PARTICIPANTES } from "./data";

export default function SelecaoUsuario({ onSelecionar }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⚽</div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Bolão <span className="text-gold">Copa 2026</span>
          </h1>
          <p className="text-light text-sm">Quem é você?</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PARTICIPANTES.map((nome) => (
            <button
              key={nome}
              onClick={() => onSelecionar(nome)}
              className="bg-card border border-white/5 rounded-2xl py-4 px-3 text-center
                         active:scale-95 active:bg-gold/20 active:border-gold
                         transition-all duration-150 shadow-sm"
            >
              <div
                className="w-10 h-10 mx-auto mb-2 rounded-full bg-gold/15 flex items-center
                              justify-center text-gold font-bold text-base"
              >
                {nome.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-white text-sm font-medium">{nome}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-light/40 text-xs mt-8">
          Sua seleção fica salva neste dispositivo
        </p>
      </div>
    </div>
  );
}
