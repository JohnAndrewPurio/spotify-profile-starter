import NavButton from '../NavButton'
import './index.css'

const buttons = ['profile', 'topArtists', 'topTracks', 'recent', 'playlists' ]

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <img src={ `${process.env.PUBLIC_URL}/icons/spotify.png`} alt='spotify-icon' className="icon" id="spotify-logo" />
            
            <div className="nav-buttons-group">
                {
                    buttons.map( button => <NavButton key={button} name={button} />)
                }
            </div>

            <img src={ `${process.env.PUBLIC_URL}/icons/github-logo.svg`} alt='github-icon' className="icon" id="github-logo" />
        </div>
    )
}
