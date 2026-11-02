const PLANS = [
  {
    name: 'Snack Pack',
    cans: 8,
    packs: '2 four-packs',
    originalPrice: 40,
    price: 36,
    perCan: '4.50',
    savings: 4,
    freeShipping: false,
  },
  {
    name: 'Classic Snack',
    cans: 12,
    packs: '3 four-packs',
    originalPrice: 60,
    price: 52,
    perCan: '4.33',
    savings: 8,
    freeShipping: false,
  },
  {
    name: 'Party Snack',
    cans: 24,
    packs: '6 four-packs',
    originalPrice: 120,
    price: 98,
    perCan: '4.08',
    savings: 22,
    freeShipping: true,
  },
]

const BENEFITS = [
  'Early access to new flavors',
  'Occasional bonus cans',
  '10% off additional orders',
]

const FREQUENCIES = ['Monthly', 'Every 2 Months', 'Quarterly']

function WineClub() {
  return (
    <div className="container container-padded">
      <div className="content content-wide">

        {/* Hero */}
        <section className="wc-hero">
          <h1 className="title">Snack Wine Club</h1>
          <p className="subtitle">A recurring delivery of easy-drinking wine spritzers.</p>
          <p className="description">
            Choose your Snack Pack. Delivered monthly, every two months, or quarterly.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="wc-section">
          <div className="wc-cards">
            {PLANS.map((plan) => (
              <div key={plan.name} className="wc-card">
                <h2 className="wc-card-name">{plan.name}</h2>
                <p className="wc-card-cans">{plan.cans} cans</p>
                <p className="wc-card-packs">({plan.packs})</p>

                <div className="wc-card-pricing">
                  <span className="wc-card-original">${plan.originalPrice}</span>
                  <span className="wc-card-price">${plan.price}</span>
                </div>

                <p className="wc-card-per-can">≈ ${plan.perCan} / can</p>
                <p className="wc-card-savings">Save ${plan.savings}</p>

                {plan.freeShipping && (
                  <p className="wc-card-shipping">Free shipping</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Member Benefits */}
        <section className="wc-section">
          <h2 className="wc-section-title wc-section-title--large">Why join the Snack Wine Club?</h2>
          <ul className="bullets-list wc-benefits-list">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        {/* Delivery & Shipping */}
        <section className="wc-section wc-logistics">
          <div className="wc-logistics-block">
            <h2 className="wc-section-title">Delivery Frequency</h2>
            <ul className="wc-frequency-list">
              {FREQUENCIES.map((f) => (
                <li key={f} className="wc-frequency-item">{f}</li>
              ))}
            </ul>
          </div>

          <div className="wc-logistics-block">
            <h2 className="wc-section-title">Shipping</h2>
            <p className="description">$10 flat shipping for club shipments</p>
            <p className="description">Free shipping on 24-can shipments</p>
          </div>
        </section>

        {/* CTA */}
        <section className="wc-section wc-cta">
          <a href="#" className="submit-btn">Join the Club</a>
        </section>

      </div>
    </div>
  )
}

export default WineClub
