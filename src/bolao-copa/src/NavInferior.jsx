const ABAS = [
  { id: 'ranking', label: 'Ranking', icone: '📊' },
  { id: 'palpites', label: 'Palpites', icone: '⚽' },
  { id: 'premios', label: 'Prêmios', icone: '🏆' },
  { id: 'admin', label: 'Admin', icone: '⚙️' },
];

export default function NavInferior({ abaAtiva, onMudarAba }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-white/5 z-50
                     pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto grid grid-cols-4">
        {ABAS.map((aba) => {
          const ativa = abaAtiva === aba.id;
          return (
            <button
              key={aba.id}
              onClick={() => onMudarAba(aba.id)}
              className="flex flex-col items-center justify-center py-2.5 gap-0.5
                         active:bg-white/5 transition-colors"
            >
              <span className={`text-xl transition-transform ${ativa ? 'scale-110' : 'opacity-50'}`}>
                {aba.icone}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  ativa ? 'text-gold' : 'text-light/50'
                }`}
              >
                {aba.label}
              </span>
              {ativa && (
                <span className="absolute top-0 h-0.5 w-8 bg-gold rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
