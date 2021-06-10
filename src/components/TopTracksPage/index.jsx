import './index.css'
import { useSelector } from 'react-redux'
import TrackHighlighted from '../TrackHighlighted'

export default function TopTracksPage({name}) {
    const { items } = useSelector(state => name === 'topTracks' ? state.topTracks: state.recentlyPlayed)

    return (
        <div className="top-tracks-page">
            <div className="top-tracks-header">
                <h2>{name === 'topTracks' ? 'Top Tracks': 'Recently Played' }</h2>

                <div className="toggle-links">

                </div>
            </div>

            <div className="top-tracks-content">
                {
                    name === 'topTracks' ? 
                        items.map( ({artists, name, album, duration_ms}, index) => (
                                <TrackHighlighted 
                                    key={`${name + index}`} 
                                    artists={artists}
                                    name={name} 
                                    image={album.images.find( image => image.height <= 300 )} 
                                    duration={duration_ms} 
                                /> 
                            )
                        )
                    : items.map( ({track}, index) => (
                        <TrackHighlighted 
                            key={`${track.name + index}`} 
                            artists={track.artists}
                            name={track.name} 
                            image={track.album.images.find( image => image.height <= 300 )} 
                            duration={track.duration_ms} 
                        /> 
                        )
                    )
                }
            </div>
        </div>
    )
}
