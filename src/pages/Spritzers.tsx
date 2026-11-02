import { whatsInTheCan } from '../content/siteCopy'
import heroMobile from '../assets/snack_wine_mockups_600.webp'
import heroTablet from '../assets/snack_wine_mockups_1200.webp'
import heroDesktop from '../assets/snack_wine_mockups_2400.webp'

function Spritzers() {
  return (
    <div className="container container-padded">
      <div className="content content-wide">
        <h1 className="title">{whatsInTheCan.heading}</h1>

        <picture>
          <source media="(min-width: 1921px)" srcSet={heroDesktop} />
          <source media="(min-width: 769px)" srcSet={heroTablet} />
          <img src={heroMobile} alt="Snack Wine canned spritzers" className="spritzers-hero" />
        </picture>

        <p className="description">{whatsInTheCan.body}</p>
      </div>
    </div>
  )
}

export default Spritzers
