import { useEffect, useState } from 'react'
import Masthead from './components/Masthead'
import Dateline from './components/Dateline'
import Article from './components/Article'
import Classifieds from './components/Classifieds'

function App() {
  const [edition, setEdition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEdition = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/news`)
        if (!res.ok) throw new Error('Failed to load edition')
        const data = await res.json()
        setEdition(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEdition()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 grid place-items-center">
        <div className="text-neutral-700">Setting the type…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100 grid place-items-center">
        <div className="max-w-md text-center">
          <p className="mb-2 font-semibold">Could not load today\'s edition.</p>
          <p className="text-sm text-neutral-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-200 py-6">
      <div className="max-w-5xl mx-auto bg-[#f7f2e7] text-[#111] shadow-xl print:shadow-none print:bg-white">
        <div className="p-6 sm:p-10">
          <Masthead
            title={edition.masthead.title}
            founded={edition.masthead.founded}
            city={edition.masthead.city}
            motto={edition.masthead.motto}
          />

          <Dateline
            city={edition.dateline.city}
            date={edition.dateline.date}
            price={edition.dateline.price}
            edition={edition.dateline.edition}
          />

          <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Front Page lead story spans all columns on desktop */}
            {edition.sections.find(s => s.name === 'Front Page')?.articles?.[0] && (
              <Article article={edition.sections.find(s => s.name === 'Front Page').articles[0]} variant="lead" />
            )}

            {/* Remaining stories arranged in columns */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {edition.sections.find(s => s.name === 'Front Page')?.articles?.slice(1).map((a, i) => (
                <Article key={i} article={a} />
              ))}
            </div>

            {/* Society page as right column */}
            <div className="space-y-6">
              {edition.sections.find(s => s.name === 'Society')?.articles?.map((a, i) => (
                <Article key={i} article={a} />
              ))}
            </div>
          </main>

          {/* Classifieds */}
          <section className="mt-10 pt-6 border-t border-black/30">
            <Classifieds ads={edition.sections.find(s => s.name === 'Classifieds')?.ads || []} />
          </section>
        </div>
      </div>

      <footer className="text-center text-xs text-neutral-600 mt-4">
        Printed in New Albion • All rights reserved
      </footer>
    </div>
  )
}

export default App
