import NavBar from './components/NavBar'
import Home from './routes/Home'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import ItemGrid from './routes/ItemGrid';

function App(props) {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/items' element={<ItemGrid />} />
                <Route path='/warframes' element={<Warframes />} />
            </Routes>
            <footer>
                <div className='footer-attributions'>
                    <h4>Attributions</h4>
                    <ul>
                        <li>
                            <a href='https://github.com/WFCD' target='_blank' rel='noreferrer'>
                                Warframe Community Developers
                            </a>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </footer>
        </Router>
    )
}

function Warframes() {
    return <h2>Warframes</h2>;
}

export default App;