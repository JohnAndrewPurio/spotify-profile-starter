import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser, requestData, requestPlaylistData, requestToken, requestTopArtistsData } from '../../redux/actions'
import Profile from '../Profile'
import Sidebar from '../Sidebar'
import './index.css'

export default function Home() {
    const dispatch = useDispatch()
    const authCode = useSelector(state => state.authCode)
    const userToken = useSelector(state => state.userToken)
    const userData = useSelector(state => state.userData)
    const playlist = useSelector(state => state.playlist)

    useEffect(() => {
        dispatch( authenticateUser(window.location.search.split('=')[1]) )

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(authCode) dispatch( requestToken(authCode) )

        // eslint-disable-next-line
    }, [authCode])

    useEffect(() => {
        if(userToken) {
            dispatch( requestData(userToken) )
            dispatch( requestTopArtistsData('artists') )
            dispatch( requestTopArtistsData('tracks') )
        }

        // eslint-disable-next-line
    }, [userToken])

    useEffect(() => {
        if(userData) dispatch( requestPlaylistData(userData) )

        // eslint-disable-next-line
    }, [userData])
    
    return (
        <div className="home">
            <Sidebar />
            {
                userData && playlist ? <Profile />: <h2>Loading...</h2>
            }
        </div>
    )
}
