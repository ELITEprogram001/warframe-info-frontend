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

    const [worldstatuses, setWorldStatuses] = useState()
    const [deals, setDeals] = useState([])
 
    async function fetchWorldStatus() {
        const res = await axios.get(`https://api.warframestat.us/pc`)
        console.log(`%cfetching api...`, 'color:#009B77')
        console.groupCollapsed('%cWorld Times', 'font-weight:bold')
        console.log(`%c  cetus%c: ${res.data.cetusCycle.timeLeft}`, 'color:#00FF00', 'color:white')
        console.log(`%cfortuna%c: ${res.data.vallisCycle.timeLeft}`, 'color:#00FF00', 'color:white')
        console.log(`%c deimos%c: ${res.data.cambionCycle.timeLeft}`, 'color:#00FF00', 'color:white')
        console.log(`%c  deals%c: ${res.data.dailyDeals[0].item}`, 'color:#BEC2CB', 'color:white')
        console.groupEnd()
        setWorldStatuses({
            earth: res.data.earthCycle,
            cetus: res.data.cetusCycle,
            fortuna: res.data.vallisCycle,
            deimos: res.data.cambionCycle,
        })
        setDeals(res.data.dailyDeals)
    }

    useEffect(() => {
        fetchWorldStatus()
    }, [])

    function refreshAPI() {
        fetchWorldStatus()
    }

    let EarthStatusWithTimer, CetusStatusWithTimer, FortunaStatusWithTimer, 
        DeimosStatusWithTimer, dealList
    if(worldstatuses) {
        EarthStatusWithTimer = withTimer(WorldStatusTile, worldstatuses.earth.expiry)
        CetusStatusWithTimer = withTimer(WorldStatusTile, worldstatuses.cetus.expiry)
        FortunaStatusWithTimer = withTimer(WorldStatusTile, worldstatuses.fortuna.expiry)
        DeimosStatusWithTimer = withTimer(WorldStatusTile, worldstatuses.deimos.expiry)
        dealList = deals.map(item => {
            const Deal = withTimer(DarvoDeals, item.expiry)
            return <Deal key={item.id} deal={item} />
        })
    }
    
    

    return (
        <div className='content-wrapper'>
            <div className='home-content'>
                <div className='major-news news'>
                    <img src='/imgs/wf-example-major-news.jpeg' alt='warframe-news' />
                </div>
                <h1 className='status-header section-header'>World Statuses</h1>
                {worldstatuses && <EarthStatusWithTimer 
                    className='earth'
                    title='Earth'
                    world={worldstatuses.earth}
                    refresh={refreshAPI}
                />}
                {worldstatuses && <CetusStatusWithTimer 
                    className='cetus'
                    title='Plains of Eidolon'
                    world={worldstatuses.cetus}
                    refresh={refreshAPI}
                />}
                {worldstatuses && <FortunaStatusWithTimer 
                    className='fortuna'
                    title='Orb Vallis'
                    world={worldstatuses.fortuna}
                    refresh={refreshAPI}
                />}
                {worldstatuses && <DeimosStatusWithTimer 
                    className='cetus'
                    title='Cambion Drift'
                    world={worldstatuses.deimos}
                    refresh={refreshAPI}
                />}
                <h1 className='darvo-header section-header'>Darvo Deals</h1>
                {worldstatuses && dealList}
                <h1 className='explore-header section-header'>Explore Game Content</h1>
                <ImageLink
                    src='/imgs/wf-primary-img-link.jpg'
                    title='Primaries'
                    link='/items'
                    className='primary'
                />
                <ImageLink 
                    src='/imgs/wf-secondary-img-link.png'
                    title='Secondaries'
                    link='/items'
                    className='secondary'
                />
                <ImageLink 
                    src='/imgs/warframe-img-link.png'
                    title='Warframes'
                    link='/warframes'
                    className='warframe'
                />
            </div>
        </div>
    )
}

export default Home