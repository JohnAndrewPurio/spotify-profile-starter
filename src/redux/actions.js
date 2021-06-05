import { AUTH_CODE, STORE_TOKEN, STORE_USER_DATA, STORE_PLAYLIST_DATA, TOGGLE_CURRENT_PAGE, STORE_TOP_ARTISTS_DATA, STORE_TOP_TRACKS_DATA  } from "./action_types";
import { base64ID_Secret, tokenEndpoint, dataEndpoint, redirectUri } from "../config";
import querystring from 'querystring'
import axios from 'axios'

export const authenticateUser = (payload) => ({
    type: AUTH_CODE,
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
            let authToken = authCode

            if (result.data.access_token) {
                authToken = result.data.access_token
            }

            dispatch(storeToken(authToken))
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

export const requestPlaylistData = (userData) => {
    return async (dispatch, getState) => {
        const { userToken } = getState()
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

export const requestTopArtistsData = (data) => {
    return async (dispatch, getState) => {
        const { userToken } = getState()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ userToken }`
        }

        const request = {
            method: 'get',
            url: dataEndpoint + `/top/${data}?limit=20`,
            headers: headers
        }

        try {
            const result = await axios(request)

            dispatch( data === 'artists' ? storeTopArtistsData(result.data): storeTopTracksData(result.data)  )
        } catch(e) {
            alert(e)
        }
    }
}