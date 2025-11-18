export default function Classifieds({ ads = [] }) {
  return (
    <section>
      <h3 className="font-serif text-xl mb-2 tracking-tight">Classified Advertisements</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {ads.map((ad, idx) => (
          <div key={idx} className="border border-black/40 p-3">
            <div className="font-black tracking-widest text-xs mb-1">{ad.title}</div>
            <p className="leading-snug">{ad.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
