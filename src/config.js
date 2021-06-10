const authEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = 'https://accounts.spotify.com/api/token'
export const dataEndpoint = 'https://api.spotify.com/v1/me'
export const redirectUri = "http://localhost:3000/home"; //temp redirect
export const logOutEndpoint = "https://accounts.spotify.com/en/logout"
const clientId = "2cb94ebe7e5c4f139c02692a872022ff";

const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "user-top-read",
  "user-follow-read",
  "user-read-recently-played"
];

export const base64ID_Secret = 'MmNiOTRlYmU3ZTVjNGYxMzljMDI2OTJhODcyMDIyZmY6NzFjOTczYzRlY2FhNDBkMWFkZmRmZTM3MjFiODc5NWU='

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;