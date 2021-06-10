import { 
    AUTH_CODE, STORE_TOKEN, STORE_USER_DATA, STORE_PLAYLIST_DATA, TOGGLE_CURRENT_PAGE, STORE_TOP_ARTISTS_DATA, STORE_TOP_TRACKS_DATA,
    STORE_FOLLOWED_ARTISTS, REFRESH_USER_TOKEN, STORE_RECENTLY_PLAYED, STORE_ARTISTS_TIME_RANGE, STORE_TRACKS_TIME_RANGE
} from "./action_types";
import { base64ID_Secret, tokenEndpoint, dataEndpoint, redirectUri } from "../config";
import querystring from 'querystring'
import axios from 'axios'

export const authenticateUser = (payload) => ({
    type: AUTH_CODE,
    payload: payload
})

export const refreshUserToken = (payload) => ({
    type: REFRESH_USER_TOKEN,
    payload: payload
})

export const storeToken = (payload) => ({
    type: STORE_TOKEN,
    payload: payload
})

export const storeUserData = (payload) => ({
    type: STORE_USER_DATA,
    payload: payload
})

export const storePlaylistData = (payload) => ({
    type: STORE_PLAYLIST_DATA,
    payload: payload
})

export const toggleCurrentPage = (payload) => ({
    type: TOGGLE_CURRENT_PAGE,
    payload: payload
})

export const storeTopArtistsData = (payload) => ({
    type: STORE_TOP_ARTISTS_DATA,
    payload: payload
})

export const storeTopTracksData = (payload) => ({
    type: STORE_TOP_TRACKS_DATA,
    payload: payload
})

export const storeFollowedArtists = (payload) => ({
    type: STORE_FOLLOWED_ARTISTS,
    payload: payload
})

export const storeRecentlyPlayed = (payload) => ({
    type: STORE_RECENTLY_PLAYED,
    payload: payload
})

export const storeArtistsTimeRange = (payload) => ({
    type: STORE_ARTISTS_TIME_RANGE,
    payload: payload
})

export const storeTracksTimeRange = (payload) => ({
    type: STORE_TRACKS_TIME_RANGE,
    payload: payload
})

export const requestRefreshToken = (refreshToken) => {
    return async (dispatch, getState) => {
        const data = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }

        const headers = {
            'Authorization': `Basic ${base64ID_Secret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const request = {
            method: 'post',
            url: tokenEndpoint,
            data: querystring.stringify(data),
            headers: headers
        }

        try {
            const result = await axios(request)

            result.data.refresh_token = refreshToken

            dispatch(refreshUserToken(result.data))
        } catch (e) {
            alert(e)
        }
    }
}

export const requestToken = () => {
    return async (dispatch, getState) => {
        const { authCode } = getState()

        const data = {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: redirectUri
        }

        const headers = {
            'Authorization': `Basic ${base64ID_Secret}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const request = {
            method: 'post',
            url: tokenEndpoint,
            data: querystring.stringify(data),
            headers: headers
        }

        try {
            const result = await axios(request)

            dispatch(storeToken(result.data))
        } catch (e) {
            console.log(authCode)
            alert(e)
        }
    }
}

export const requestData = (userToken) => {
    return async (dispatch, getState) => {
        // const { userToken } = getState()

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ userToken }`
        }

        const request = {
            method: 'get',
            url: dataEndpoint,
            headers: headers
        }
        
        try {
            const result = await axios(request)

            dispatch( storeUserData(result.data) )
        } catch(e) {
            alert(e)
        }
        
    }
}

export const requestPlaylistData = (userData, userToken) => {
    return async (dispatch, getState) => {
        const { href } = userData

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ userToken }`
        }

        const request = {
            method: 'get',
            url: href + '/playlists',
            headers: headers
        }

        try {
            const result = await axios(request)

            dispatch( storePlaylistData(result.data) )
        } catch(e) {
            alert(e)
        }
        
    }
}

export const requestTopArtistsData = (data, userToken, timeRange) => {
    return async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ userToken }`
        }

        const request = {
            method: 'get',
            url: dataEndpoint + `/top/${data}?limit=20${ timeRange ? '&' + timeRange: '' }`,
            headers: headers
        }

        try {
            const result = await axios(request)

            if(timeRange) {
                dispatch( )
            }

            dispatch( data === 'artists' ? storeTopArtistsData(await result.data): storeTopTracksData(await result.data)  )
        } catch(e) {
            alert(e)
        }
    }
}

export const requestNumberOfFollowedArtists = (userToken) => {
    return async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ userToken }`
        }

        const request = {
            method: 'get',
            url: dataEndpoint + `/following?type=artist`,
            headers: headers
        }

        try {
            const result = await axios(request)

            dispatch( storeFollowedArtists( await result.data ) )
        } catch(e) {
            alert(e)
        }
    }
}

export const requestRecentlyPlayed = (userToken) => {
    return async (dispatch, getState) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ userToken }`
        }

        const request = {
            method: 'get',
            url: dataEndpoint + `/player/recently-played`,
            headers: headers
        }

        try {
            const result = await axios(request)

            dispatch( storeRecentlyPlayed( await result.data ) )
        } catch(e) {
            alert(e)
        }
    }
}

