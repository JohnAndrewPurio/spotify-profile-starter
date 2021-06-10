import { 
    AUTH_CODE, STORE_TOKEN, STORE_USER_DATA, STORE_PLAYLIST_DATA, TOGGLE_CURRENT_PAGE, STORE_TOP_ARTISTS_DATA, STORE_TOP_TRACKS_DATA, 
    STORE_FOLLOWED_ARTISTS, REFRESH_USER_TOKEN, STORE_RECENTLY_PLAYED, STORE_ARTISTS_TIME_RANGE, STORE_TRACKS_TIME_RANGE
} from "./action_types"

const initState = {
    authCode: null,
    userToken: null,
    userData: null,
    playlist: null,
    topArtists: null,
    topTracks: null,
    followedArtists: null,
    recentlyPlayed: null,
    artistTimeRange: null,
    tracksTimeRange: null,
    currentPage: 'profile'
}

export default function spotifyReducer(state = initState, action) {
    const {type, payload} = action
    const selector = {}
    selector[AUTH_CODE] = authenticateUser
    selector[STORE_TOKEN] = storeToken
    selector[REFRESH_USER_TOKEN] = storeToken
    selector[STORE_USER_DATA] = storeUserData
    selector[STORE_PLAYLIST_DATA] = storePlaylistData
    selector[TOGGLE_CURRENT_PAGE] = toggleCurrentPage
    selector[STORE_TOP_ARTISTS_DATA] = storeTopArtistsData
    selector[STORE_TOP_TRACKS_DATA] = storeTopTracksData
    selector[STORE_FOLLOWED_ARTISTS] = storeFollowedArtists
    selector[STORE_RECENTLY_PLAYED] = storeRecentlyPlayed
    selector[STORE_ARTISTS_TIME_RANGE] = storeArtistsTimeRange
    selector[STORE_TRACKS_TIME_RANGE] = storeTracksTimeRange

    if(selector[type] === undefined) return {...state}

    return selector[type](state, payload)
}

function authenticateUser(state, payload) {
    return {...state, authCode: payload}
}

function storeToken(state, payload) {
    return {...state, userToken: payload}
}

function storeUserData(state, payload) {
    return {...state, userData: payload}
}

function storePlaylistData(state, payload) {
    return {...state, playlist: payload}
}

function toggleCurrentPage(state, payload) {
    return {...state, currentPage: payload}
}

function storeTopArtistsData(state, payload) {
    return {...state, topArtists: payload}
}

function storeTopTracksData(state, payload) {
    return {...state, topTracks: payload}
}

function storeFollowedArtists(state, payload) {
    return {...state, followedArtists: payload}
}

function storeRecentlyPlayed(state, payload) {
    return {...state, recentlyPlayed: payload}
}

function storeArtistsTimeRange(state, payload) {
    return {...state, artistTimeRange: payload}
}

function storeTracksTimeRange(state, payload) {
    return {...state, tracksTimeRange: payload}
}

