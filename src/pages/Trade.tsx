import { trade } from '../content/siteCopy'

function Trade() {
  const pdfUrl = 'https://s3.us-west-2.amazonaws.com/snack.wine/assets/Snack-Wine_One-Pager_2026.pdf'

  return (
    <div className="container container-padded">
      <div className="content">
        <h1 className="title">{trade.heading}</h1>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="trade-link">
          Download one-pager (PDF)
        </a>
        <p className="pdf-subtitle">For vendors and partners. Updated 2026.</p>
        <p className="description">{trade.intro}</p>

        <h2 className="section-title">What to include</h2>
        <div className="trade-list">
          {trade.whatToInclude.map((item, idx) => (
            <div key={idx} className="trade-list-item">{item}</div>
          ))}
        </div>

        <a href="mailto:info@snack.wine" className="trade-link">{trade.cta}</a>
      </div>
    </div>
  )
}

export default Trade
