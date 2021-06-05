import { useSelector } from "react-redux"

const defaultProfile = `${process.env.PUBLIC_URL}/icons/profile.svg`

export default function UserInfo() {
    const images = useSelector(state => state.userData.images )
    const userAvatar = images ? images[0].url: defaultProfile

    return(
        <div className="user-info">
            <img src={userAvatar} alt='user-icon' />
        </div>
    )
}