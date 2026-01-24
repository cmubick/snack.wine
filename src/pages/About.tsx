import { about } from '../content/siteCopy'

function About() {
  return (
    <div className="container container-padded">
      <div className="content content-left">
        <h1 className="title">{about.heading}</h1>

        {about.story.map((paragraph, idx) => (
          <p key={idx} className="description">{paragraph}</p>
        ))}

        <h2 className="section-title">{about.whyCansHeading}</h2>
        <p className="description">{about.whyCans}</p>
      </div>
    </div>
  )
}

export default About
