import '../styles/NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = props => {
    return (
        <nav>
            <h1><Link to='/'>Warframe Info</Link></h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/items'>Items</Link>
                </li>
                <li>
                    <Link to='/warframes'>Warframes</Link>
                </li>
                <li>
                    <Link to='/planner'>Planner</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar