const HealthBar = ({ life }) => {
  return (
    <div className="absolute top-24 left-1/2 z-10 -translate-x-1/2 transform">
      <div className="min-w-96 rounded-lg border border-cyan-500/30 bg-black/80 p-4 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>
            <span className="font-mono text-sm tracking-wider text-cyan-300 uppercase">
              Sistema Neural
            </span>
          </div>
          <span className="font-mono text-lg font-bold text-white">
            {life}/100
          </span>
        </div>

        {/* Health Bar */}
        <div className="relative">
          <div className="h-4 w-full overflow-hidden rounded-full border border-gray-600 bg-gray-800">
            <div
              className={`relative h-full transition-all duration-1000 ease-out ${
                life > 60
                  ? "bg-gradient-to-r from-green-400 to-green-500"
                  : life > 30
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : "bg-gradient-to-r from-red-500 to-red-600"
              }`}
              style={{ width: `${life}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 animate-pulse bg-white/20"></div>
            </div>
          </div>

          {/* Status indicators */}
          <div className="mt-2 flex justify-between font-mono text-xs">
            <span
              className={`${life > 60 ? "text-green-400" : life > 30 ? "text-yellow-400" : "text-red-400"}`}
            >
              {life > 60 ? "ÓTIMO" : life > 30 ? "CRÍTICO" : "FALHA IMINENTE"}
            </span>
            <span className="text-gray-400">
              {life > 60 ? "█████" : life > 30 ? "███░░" : "█░░░░"}
            </span>
          </div>
        </div>

        {/* Warning for low health */}
        {life <= 30 && (
          <div className="mt-3 flex animate-pulse items-center gap-2 font-mono text-xs text-red-400">
            <span className="text-red-500">⚠</span>
            <span>ALERTA: Sistema em estado crítico</span>
            <span className="text-red-500">⚠</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthBar;
