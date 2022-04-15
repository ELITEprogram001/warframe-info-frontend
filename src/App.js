import NavBar from './components/NavBar'
import Home from './routes/Home'
import Footer from './components/Footer'
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
            <Footer />
        </Router>
    )
}

function Warframes() {
    return <h2>Warframes</h2>;
}

export default App;