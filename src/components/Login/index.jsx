import { loginUrl } from '../../config'
import './index.css'

export default function Login() {
    return (
        <div className="login">
            <h2>Spotify Profile</h2>
            <a href={ loginUrl } >Login</a>
        </div>
    )
}
