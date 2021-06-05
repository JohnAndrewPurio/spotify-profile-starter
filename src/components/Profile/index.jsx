import './index.css'
import { useSelector } from "react-redux"
import Stats from '../Stats'
import TopArtists from '../TopArtists'

const tops = ['artists','tracks']

export default function Profile() {
    const userData = useSelector( state => state.userData )
    const playlist = useSelector( state => state.playlist )
    const { images, followers, display_name } = userData
    const titles = ['Followers', 'Following', 'Playlists']
    const numbers = [followers.total, 0, playlist.items.length]

    return(
        <div className="profile">
            <div className="about">
                <img src={images ? images[0].url: `${process.env.PUBLIC_URL}/icons/profile.svg`} alt="profile" />
                <h2>{display_name}</h2>
                <div className="stats-container">
                    {
                        titles.map( (title, index) => <Stats key={title} number={numbers[index]} title={title} /> )
                    }
                </div>
            </div>
            <div className="favorites">
                    {
                        tops.map( name => <TopArtists key={name} name={name} />)
                    }
                    
            </div>
        </div>
    )
}