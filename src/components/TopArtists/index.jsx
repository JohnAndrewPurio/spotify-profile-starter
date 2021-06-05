import './index.css'
import { useSelector } from 'react-redux'
import Artist from "../Artist"

export default function TopArtists({name}) {
    const {items} = useSelector(state => name === 'artists' ? state.topArtists: state.topTracks )

    console.log(name)

    return (
        <div className="top-artists">
            <div className="header">
                <h2>Top {name.replace(name[0], name[0].toUpperCase())} of All Time</h2>
                <button className="pill-button">See More</button>
            </div>
            <div className="artists-list">
                {
                    name === 'artists' ?
                        items.map( artist => <Artist key={artist.name} name={artist.name} image={artist.images.find( image => image.height >= 160).url} /> )
                        : items.map( track => <Artist key={track.name} name={track.name} image={track.album.images.find( image => image.height >= 160).url} /> )
                }
            </div>
        </div>
    )
}
