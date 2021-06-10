import { useDispatch, useSelector } from 'react-redux'
import { toggleCurrentPage } from '../../redux/actions'
import './index.css'

export default function NavButton({name}) {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    const atCurrentPage = currentPage === name

    const buttonHandler = () => {
        dispatch(toggleCurrentPage(name))
    }

    return (
        <button className={`nav-button ${atCurrentPage ? 'selected-nav-button': ''}`} onClick={ buttonHandler }>
            <img src={`${process.env.PUBLIC_URL}/icons/${name}.svg`} alt={name} className='nav-icons' />
            <p>{name}</p>
        </button>
    )
}