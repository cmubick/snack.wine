import { spritzers } from '../content/siteCopy'

function Spritzers() {
  return (
    <div className="container container-padded">
      <div className="content">
        <h1 className="title">{spritzers.heading}</h1>
        <p className="description">{spritzers.intro}</p>

        <ul className="preview-list">
          {spritzers.items.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> — {item.description}
            </li>
          ))}
        </ul>

        <p className="note">{spritzers.note}</p>
      </div>
    </div>
  )
}

export default Spritzers
