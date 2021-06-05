import { useDispatch, useSelector } from 'react-redux'
import { toggleCurrentPage } from '../../redux/actions'
import { useHistory } from 'react-router'
import './index.css'

export default function NavButton({name}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentPage = useSelector(state => state.currentPage)
    const atCurrentPage = currentPage === name

    const buttonHandler = () => {
        dispatch(toggleCurrentPage(name))

        const address = name === 'profile' ? '/home/': `/home/${name}`

        history.push(address)
    }

    return (
        <button className={`nav-button ${atCurrentPage ? 'selected-nav-button': ''}`} onClick={ buttonHandler }>
            <img src={`${process.env.PUBLIC_URL}/icons/${name}.svg`} alt={name} className='nav-icons' />
            <p>{name}</p>
        </button>
    )
}