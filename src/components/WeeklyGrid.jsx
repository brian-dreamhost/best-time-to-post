import { DAYS, HOURS, formatHour, getScore } from '../utils/postingData.js';

const CELL_COLORS = [
  'bg-abyss border-metal/5',         // 0: avoid
  'bg-metal/10 border-metal/20',     // 1: poor
  'bg-metal/20 border-metal/30',     // 2: ok
  'bg-azure/20 border-azure/30',     // 3: good
  'bg-turtle/30 border-turtle/40',   // 4: best
];

export default function WeeklyGrid({ platformId, industryId }) {
  const displayHours = HOURS.filter(h => h >= 6 && h <= 22);

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6 overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header row */}
        <div className="grid mb-1" style={{ gridTemplateColumns: '3rem repeat(7, 1fr)' }}>
          <div />
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-cloudy py-1">{d}</div>
          ))}
        </div>

        {/* Hour rows */}
        {displayHours.map(h => (
          <div key={h} className="grid mb-0.5" style={{ gridTemplateColumns: '3rem repeat(7, 1fr)' }}>
            <div className="text-right pr-2 text-xs text-galactic flex items-center justify-end">
              {h % 3 === 0 ? formatHour(h) : ''}
            </div>
            {DAYS.map((d, di) => {
              const score = getScore(platformId, industryId, di, h);
              return (
                <div
                  key={d}
                  title={`${d} ${formatHour(h)}: ${['Avoid', 'Poor', 'OK', 'Good', 'Best'][score]}`}
                  className={`mx-0.5 h-5 rounded-sm border ${CELL_COLORS[score]}`}
                />
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <span className="text-xs text-galactic">Legend:</span>
          {[
            { color: 'bg-turtle/30 border-turtle/40', label: 'Best' },
            { color: 'bg-azure/20 border-azure/30', label: 'Good' },
            { color: 'bg-metal/20 border-metal/30', label: 'OK' },
            { color: 'bg-abyss border-metal/5', label: 'Avoid' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded border ${color}`} />
              <span className="text-xs text-galactic">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
