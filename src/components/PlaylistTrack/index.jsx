import './index.css'

export default function PlaylistTrack({image, name, total}) {
    return (
        <div className="playlist-track">
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <p>{total} Tracks</p>
        </div>
    )
}
