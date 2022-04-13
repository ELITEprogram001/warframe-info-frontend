import {useState, useEffect} from 'react'
import axios from 'axios'
import WorldStatusQuickView from '../components/WorldStatusQuickView'
import ImageLink from '../components/ImageLink'
import '../styles/Home.css'
import withTimer from '../components/Timer'
import WorldStatusTile from '../components/WorldStatusTile'

function Home(props) {
    
    function getTimeInSeconds(timeString='0') {
        const parts = timeString.split(' ')
        parts.reverse()
        let sum = 0
        parts.forEach((t, i) => {
            sum += Number.parseInt(t) * (60 ** i)
        })
        return sum
    }

    const [worldstatuses, setWorldStatuses] = useState({cetus:{},fortuna:{},deimos:{}})

    async function fetchWorldStatus() {
        const res = await axios.get('https://api.warframestat.us/pc')
        console.log(`%cfetching api...`, 'color:#009B77')
        console.groupCollapsed('World Times')
        console.log(`  cetus: ${res.data.cetusCycle.timeLeft}`)
        console.log(`fortuna: ${res.data.vallisCycle.timeLeft}`)
        console.log(` deimos: ${res.data.cambionCycle.timeLeft}`)
        console.groupEnd()
        setWorldStatuses({
            cetus: res.data.cetusCycle,
            fortuna: res.data.vallisCycle,
            deimos: res.data.cambionCycle,
        })
    }

    useEffect(() => {
        fetchWorldStatus()
    }, [])

    function refreshAPI() {
        fetchWorldStatus()
    }

    // felt testing - might delete later ;)
    const WorldStatus = WorldStatusTile
    const CetusStatusWithTimer = withTimer(WorldStatus, worldstatuses.cetus.timeLeft)
    const FortunaStatusWithTimer = withTimer(WorldStatus, worldstatuses.fortuna.timeLeft)
    const DeimosStatusWithTimer = withTimer(WorldStatus, worldstatuses.deimos.timeLeft)

    return (
        <div className='content-wrapper'>
            <div className='home-content'>
                <div className='major-news news'>
                    <img src='http://localhost:5055/imgs/wf-example-major-news.jpeg' alt='warframe-news' />
                </div>
                <h1 className='status-header section-header'>World Statuses</h1>
                {worldstatuses.cetus.timeLeft && <CetusStatusWithTimer 
                    className='cetus'
                    title='Plains of Eidolon'
                    refresh={refreshAPI}
                />}
                {worldstatuses.fortuna.timeLeft && <FortunaStatusWithTimer 
                    className='fortuna'
                    title='Orb Vallis'
                    refresh={refreshAPI}
                />}
                {worldstatuses.deimos.timeLeft && <DeimosStatusWithTimer 
                    className='cetus'
                    title='Cambion Drift'
                    refresh={refreshAPI}
                />}
                {/* This code works but doesn't implement HOC design pattern.
                    Delete this code when you're satisfied the HOC timer structure works 100%.
                {worldstatuses.cetus.timeLeft && <WorldStatusQuickView 
                    className='cetus'
                    title='Plains of Eidolon'
                    refresh={refreshAPI}
                    seconds={getTimeInSeconds(worldstatuses.cetus.timeLeft)}
                />}
                {worldstatuses.fortuna.timeLeft && <WorldStatusQuickView 
                    className='fortuna'
                    title='Orb Vallis'
                    refresh={refreshAPI}
                    seconds={getTimeInSeconds(worldstatuses.fortuna.timeLeft)}
                />}
                {worldstatuses.cambion.timeLeft && <WorldStatusQuickView 
                    className='deimos'
                    title='Cambion Drift'
                    refresh={refreshAPI}
                    seconds={getTimeInSeconds(worldstatuses.cambion.timeLeft)}
                />} */}

                <h1 className='explore-title section-header'>Explore Game Content</h1>
                <ImageLink
                    src='http://localhost:5055/imgs/wf-primary-img-link.jpg'
                    title='Primaries'
                    link='/items'
                    className='primary'
                />
                <ImageLink 
                    src='http://localhost:5055/imgs/wf-secondary-img-link.png'
                    title='Secondaries'
                    link='/items'
                    className='secondary'
                />
                <ImageLink 
                    src='http://localhost:5055/imgs/warframe-img-link.png'
                    title='Warframes'
                    link='/warframes'
                    className='warframe'
                />
            </div>
        </div>
    )
}

export default Home