import './index.css'

export default function ArtistHiglighted({image, name}) {
    return (
        <div className="artist-highlighted">
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    )
}
