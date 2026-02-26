import { useState, useEffect } from 'react'
import WeeklyGrid from './components/WeeklyGrid.jsx'
import TopSlots from './components/TopSlots.jsx'
import { PLATFORMS, INDUSTRIES } from './utils/postingData.js'

export default function App() {
  const [platform, setPlatform] = useState('instagram')
  const [industry, setIndustry] = useState('general')
  const [timezone, setTimezone] = useState('your timezone')

  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    } catch {}
  }, [])

  return (
    <div className="bg-glow bg-grid min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/social-media/" className="text-azure hover:text-white transition-colors">Social Media Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Best Time to Post Guide</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center border border-turtle text-turtle rounded-full px-4 py-2 text-sm font-medium mb-4">
            Free Social Media Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Best Time to Post Guide</h1>
          <p className="text-cloudy text-lg max-w-2xl mx-auto">
            Select your platform and industry to get a visual weekly heatmap showing your best, good, and avoid time slots — based on 2025 engagement research, not a generic blog post.
          </p>
        </div>

        {/* Selectors */}
        <div className="card-gradient border border-metal/20 rounded-2xl p-6 mb-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-cloudy">Platform</label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${platform === p.id ? 'border-azure bg-azure/10 text-azure' : 'border-metal/30 text-galactic hover:text-cloudy'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-cloudy">Industry</label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-azure max-w-xs"
            >
              {INDUSTRIES.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-galactic">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Times shown in: <span className="text-cloudy font-medium">{timezone}</span>
          </div>
        </div>

        <TopSlots platformId={platform} industryId={industry} timezone={timezone} />

        <div className="mt-6">
          <h2 className="text-white font-semibold mb-3">Weekly Posting Heatmap</h2>
          <WeeklyGrid platformId={platform} industryId={industry} />
        </div>

        <footer className="mt-16 pt-8 border-t border-metal/30 text-center text-sm text-galactic">
          Free marketing tools by{' '}
          <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">DreamHost</a>
        </footer>
      </div>
    </div>
  )
}
