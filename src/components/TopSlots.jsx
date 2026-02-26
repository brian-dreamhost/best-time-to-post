import { useState } from 'react';
import { DAYS, formatHour, getTopSlots } from '../utils/postingData.js';

export default function TopSlots({ platformId, industryId, timezone }) {
  const [copied, setCopied] = useState(false);
  const slots = getTopSlots(platformId, industryId, 3);

  const text = slots.map(s => `${DAYS[s.day]} at ${formatHour(s.hour)}`).join(', ');

  const handleCopy = () => {
    navigator.clipboard.writeText(`Top posting times: ${text} (${timezone})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Top 3 Recommended Slots</h3>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Schedule'}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {slots.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-turtle/20 border border-turtle/30 text-turtle text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
            <span className="text-white font-medium">{DAYS[s.day]}</span>
            <span className="text-cloudy">at {formatHour(s.hour)}</span>
            <span className="ml-auto text-xs text-galactic">{timezone}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-galactic border-t border-metal/20 pt-3">
        Based on aggregated 2025 research. Your specific audience may differ — check your native analytics after 4 weeks of consistent posting to validate.
      </p>
    </div>
  );
}
