import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    authenticateUser, requestData, requestNumberOfFollowedArtists, requestPlaylistData, requestRecentlyPlayed, requestRefreshToken, requestToken, requestTopArtistsData, storeToken 
} from '../../redux/actions'
import Profile from '../Profile'
import Sidebar from '../Sidebar'
import TopArtistsPage from '../TopArtistsPage'
import Loading from '../Loading'
import './index.css'
import TopTracksPage from '../TopTracksPage'
import Playlists from '../Playlists'

let refreshTimer

export default function Home() {
    const dispatch = useDispatch()
    const authCode = useSelector(state => state.authCode)
    const userToken = useSelector(state => state.userToken)
    const userData = useSelector(state => state.userData)
    const playlist = useSelector(state => state.playlist)
    const currentPage = useSelector(state => state.currentPage)

    useEffect(() => {
        const currentAuthCode = window.location.search.split('=')[1]

        if(!authCode) {
            dispatch( authenticateUser(currentAuthCode) )
        }

        return () => {
            clearInterval(refreshTimer)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(authCode && !userToken) {
            const authToken = JSON.parse( localStorage.getItem('authToken') )

            if( !authToken || authToken !== authCode ) {
                dispatch( requestToken(authCode) )
            }
            
            if(authToken === authCode && !userToken) {
                const formerToken = JSON.parse( localStorage.getItem('userToken') )

                dispatch( storeToken(formerToken) )
            }       

            localStorage.setItem('authToken', JSON.stringify(authCode) )
        }

        // eslint-disable-next-line
    }, [authCode])

    useEffect(() => {
        if(userToken) {
            localStorage.setItem('userToken', JSON.stringify(userToken))

            if(!refreshTimer) {
                refreshTimer = setInterval( 
                    dispatch( requestRefreshToken(userToken.refresh_token) )
                , userToken.expires_in * 1000)
            }

            dispatch( requestData(userToken.access_token) )
            dispatch( requestTopArtistsData('artists', userToken.access_token) )
            dispatch( requestTopArtistsData('tracks', userToken.access_token) )
            dispatch( requestNumberOfFollowedArtists(userToken.access_token) )
            dispatch( requestRecentlyPlayed(userToken.access_token) )
        }
        
        // eslint-disable-next-line
    }, [userToken])

    useEffect(() => {
        if(userData) dispatch( requestPlaylistData(userData, userToken.access_token) )

        // eslint-disable-next-line
    }, [userData])
    
    return (
        <div className="home">
            <Sidebar />
            {
                userData && playlist ? 
                    currentPage === 'profile' ? <Profile />
                        : currentPage === 'topArtists' ? <TopArtistsPage />
                        : currentPage === 'topTracks' ? <TopTracksPage name={currentPage} />
                        : currentPage === 'recent' ? <TopTracksPage name={currentPage} />
                        : <Playlists />
                : <Loading />
            }
        </div>
    )
}