import { trade } from '../content/siteCopy'

function Trade() {
  return (
    <div className="container container-padded">
      <div className="content">
        <h1 className="title">{trade.heading}</h1>
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
