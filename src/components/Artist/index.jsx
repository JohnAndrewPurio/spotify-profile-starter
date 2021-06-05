import './index.css'

export default function Artist({name, image}) {
    return (
        <div className="artist">
            <img src={image} alt={name} />
            <h3>{name}</h3>
        </div>
    )
}
