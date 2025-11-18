export default function Dateline({ city, date, price, edition }) {
  return (
    <div className="flex items-center justify-between text-xs uppercase tracking-widest border-b border-black/40 py-2">
      <span>{city}</span>
      <span className="font-semibold">{edition}</span>
      <span>{date}</span>
      <span className="px-2 py-0.5 border border-black/60">{price}</span>
    </div>
  )
}
