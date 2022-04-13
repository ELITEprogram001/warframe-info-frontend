import '../styles/ImageLink.css'
import { Link } from 'react-router-dom'


export default function ImageLink(props) {
    return (
        <div className={`img-link ${props.className}`}>
            <Link to={props.link} >
                <img src={props.src} alt='warframe link' />
                <div className='opacity'>
                    <h2 className='title'>{props.title}</h2>
                </div>
            </Link>
        </div>
    )
}