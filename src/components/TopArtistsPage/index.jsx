import { useSelector } from 'react-redux'
import ArtistHiglighted from '../ArtistHighlighted'
import './index.css'

export default function TopArtistsPage() {
    const { items } = useSelector(state => state.topArtists)

    return (
        <div className="top-artists-page">
            <div className="top-artists-header">
                <h2>Top Artists</h2>

                <div className="toggle-links">

                </div>
            </div>

            <div className="top-artists-content">
                {
                    items.map( ({name, images}) => <ArtistHiglighted key={name} image={images.find( image => image.width <= 320).url} name={name} /> )
                }
            </div>
        </div>
    )
}
