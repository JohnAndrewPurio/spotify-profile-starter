import './index.css'
import { useSelector } from 'react-redux'
import PlaylistTrack from '../PlaylistTrack'

export default function Playlists() {
    const playlist = useSelector(state => state.playlist)
    const { items } = playlist

    return (
        <div className="playlists-page">
            <div className="playlists-header">
                <h2>Playlists</h2>
            </div>
            <div className="playlists-content">
                {
                    items.map( ({images, name, tracks}, index) => <PlaylistTrack key={`${name + index}`} name={name} image={images[0].url} total={tracks.total} /> )
                }
            </div>
        </div>
    )
}
