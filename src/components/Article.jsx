function Paragraph({ children }) {
  return <p className="mb-3 leading-relaxed text-justify hyphens-auto">{children}</p>
}

export default function Article({ article, variant = 'normal' }) {
  return (
    <article className={variant === 'lead' ? 'col-span-3' : ''}>
      <h2 className={`font-serif ${variant === 'lead' ? 'text-3xl' : 'text-xl'} tracking-tight leading-snug`}>{article.headline}</h2>
      {article.subhead && (
        <h3 className="font-serif italic text-black/70 -mt-0.5 mb-2">{article.subhead}</h3>
      )}
      {article.byline && (
        <div className="text-xs uppercase tracking-wider text-black/70 mb-2">{article.byline}</div>
      )}
      {article.body?.map((p, i) => (
        <Paragraph key={i}>{p}</Paragraph>
      ))}
    </article>
  )
}
