export default function Header({ titulo, usuario, onTrocarUsuario }) {
  return (
    <header
      className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-white/5
                        px-4 pt-[max(env(safe-area-inset-top),1rem)] pb-3"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">{titulo}</h1>
        <button
          onClick={onTrocarUsuario}
          className="flex items-center gap-2 bg-card border border-white/5 rounded-full
                     pl-1 pr-3 py-1 active:scale-95 transition-transform"
        >
          <span
            className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center
                           text-gold font-bold text-[10px]"
          >
            {usuario.slice(0, 2).toUpperCase()}
          </span>
          <span className="text-xs text-white font-medium">{usuario}</span>
        </button>
      </div>
    </header>
  );
}
