import './index.css'

export default function Stats({number, title}) {
    return (
        <div className="stats">
            <h3>{number}</h3>
            <p>{title}</p>
        </div>
    )
}
