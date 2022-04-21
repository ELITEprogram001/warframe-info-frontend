import styles from '../styles/NavBar.module.css'
import { Link } from 'react-router-dom'

const NavBar = props => {
    return (
        <nav>
            <h1><Link to='/'>Warframe Info</Link></h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li className={styles.wip}>
                    <span className={styles.info}>This feature is still being worked on.</span>
                    {/* <Link to='/items'>Items</Link> */}
                    <Link to='/'>Items</Link>
                </li>
                <li className={styles.wip}>
                    <span className={styles.info}>This feature is still being worked on.</span>
                    {/* <Link to='/warframes'>Warframes</Link> */}
                    <Link to='/'>Warframes</Link>
                </li>
                <li className={styles.wip}>
                    <span className={styles.info}>This feature is still being worked on.</span>
                    {/* <Link to='/planner'>Planner</Link> */}
                    <Link to='/'>Planner</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar