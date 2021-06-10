import './index.css'

export default function TrackHighlighted({artists, name, image, duration}) {
    duration /= 1000

    return (
        <div className="track-highlighted">
            <img src={image.url} alt={name} />
            <div className="details">
                <div className="desc">
                    <h4>{name}</h4>
                    <p>{artists.map( artist => artist.name ).join(' • ')}</p>
                </div>

                <p>{`${Math.floor(duration / 60)}:${('0' + Math.round(duration % 60)).substr(-2)}`}</p>
            </div>
            
        </div>
    )
}
