export default function Masthead({ title, founded, city, motto }) {
  return (
    <header className="text-center py-8 border-b-4 border-black/70">
      <div className="text-xs tracking-[0.3em] uppercase text-black/70">{founded} • {city}</div>
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none mt-2">
        {title}
      </h1>
      <p className="mt-2 text-sm italic text-black/70">{motto}</p>
    </header>
  )
}
