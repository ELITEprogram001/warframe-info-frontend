import {useState, useEffect} from 'react'
import axios from 'axios'
import ImageLink from '../components/ImageLink'
import '../styles/Home.css'
import withTimer from '../components/Timer'
import WorldStatusTile from '../components/WorldStatusTile'
import DarvoDeals from '../components/DarvoDeals'

axios.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
}

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

    const [worldstatuses, setWorldStatuses] = useState({cetus:{},fortuna:{},deimos:{},deals:[]})

    async function fetchWorldStatus() {
        const res = await axios.get('https://api.warframestat.us/pc')
        console.log(`%cfetching api...`, 'color:#009B77')
        console.groupCollapsed('%cWorld Times', 'font-weight:bold')
        console.log(`%c  cetus%c: ${res.data.cetusCycle.timeLeft}`, 'color:#00FF00', 'color:white')
        console.log(`%cfortuna%c: ${res.data.vallisCycle.timeLeft}`, 'color:#00FF00', 'color:white')
        console.log(`%c deimos%c: ${res.data.cambionCycle.timeLeft}`, 'color:#00FF00', 'color:white')
        console.log(`%c  deals%c: ${res.data.dailyDeals[0].item}`, 'color:#BEC2CB', 'color:white')
        console.groupEnd()
        setWorldStatuses({
            cetus: res.data.cetusCycle,
            fortuna: res.data.vallisCycle,
            deimos: res.data.cambionCycle,
            deals: res.data.dailyDeals,
        })
    }

    useEffect(() => {
        fetchWorldStatus()
    }, [])

    function refreshAPI() {
        fetchWorldStatus()
    }

    const WorldStatus = WorldStatusTile
    const CetusStatusWithTimer = withTimer(WorldStatus, worldstatuses.cetus.timeLeft)
    const FortunaStatusWithTimer = withTimer(WorldStatus, worldstatuses.fortuna.timeLeft)
    const DeimosStatusWithTimer = withTimer(WorldStatus, worldstatuses.deimos.timeLeft)
    let deals = worldstatuses.deals.map(item => {
        const Deal = withTimer(DarvoDeals, item.eta)
        return <Deal key={item.id} deal={item} />
    })
    

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
                    world={worldstatuses.cetus}
                    refresh={refreshAPI}
                />}
                {worldstatuses.fortuna.timeLeft && <FortunaStatusWithTimer 
                    className='fortuna'
                    title='Orb Vallis'
                    world={worldstatuses.fortuna}
                    refresh={refreshAPI}
                />}
                {worldstatuses.deimos.timeLeft && <DeimosStatusWithTimer 
                    className='cetus'
                    title='Cambion Drift'
                    world={worldstatuses.deimos}
                    refresh={refreshAPI}
                />}
                <h1 className='darvo-header section-header'>Darvo Deals</h1>
                {worldstatuses.deals && deals}
                <h1 className='explore-header section-header'>Explore Game Content</h1>
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