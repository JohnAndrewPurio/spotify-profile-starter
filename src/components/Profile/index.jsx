import './index.css'
import { useSelector } from "react-redux"
import Stats from '../Stats'
import TopArtists from '../TopArtists'
import { logOutEndpoint } from '../../config'

const tops = ['artists','tracks']

export default function Profile() {
    const userData = useSelector( state => state.userData )
    const playlist = useSelector( state => state.playlist )
    const followedArtists = useSelector( state => state.followedArtists ) 
    const { images, followers, display_name } = userData
    const { artists } = followedArtists
    const titles = ['Followers', 'Following', 'Playlists']
    const numbers = [followers.total, artists.total, playlist.items.length]

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

                <a href={logOutEndpoint} id="logout">Log Out</a>
            </div>
            <div className="favorites">
                    {
                        tops.map( name => <TopArtists key={name} name={name} />)
                    }
                    
            </div>
        </div>
    )
}