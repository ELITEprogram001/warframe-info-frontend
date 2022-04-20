import {useState, useEffect} from 'react'
import axios from 'axios'
import ImageLink from '../components/ImageLink'
import '../styles/Home.css'
import withTimer from '../components/Timer'
import WorldStatusTile from '../components/WorldStatusTile'
import DarvoDeals from '../components/DarvoDeals'
import FissureTile from '../components/FissureTile'

axios.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
}

function Home(props) {

    const [worldstatuses, setWorldStatuses] = useState()
    const [fissures, setFissures] = useState([])
    const [deals, setDeals] = useState([])
 
    async function fetchWorldStatus() {
        const res = await axios.get(`https://api.warframestat.us/pc`)
        setFissures(res.data.fissures)
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
        console.log('%cattempting a refresh...', 'color:crimson')
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
            return <Deal className='dealTile' refresh={refreshAPI} key={item.id} deal={item} />
        })
    }
    let fissureList
    if(fissures.length) {
        fissures.filter(fissure => fissure.expired !== true)
        fissures.sort((a, b) => {
            if(a.tierNum === b.tierNum) return 0
            if(a.tierNum < b.tierNum) return -1
            return 1
        })
        fissureList = fissures.map(fissure => {
            const Fissure = withTimer(FissureTile, fissure.expiry)
            return <Fissure refresh={refreshAPI} key={fissure.id} fissure={fissure} />
        })
    }

    return (
        <div className='content-wrapper'>
            <div className='home-content'>
                <div className='banner'>
                    <img src='/imgs/wf-example-major-news.jpeg' alt='warframe-news' />
                </div>
                <h1 className='fissure-header section-header'>Fissures</h1>
                <div className='fissure-list'>
                    {fissures.length && fissureList}
                </div>
                <h1 className='status-header section-header'>World Statuses</h1>
                <div className='worldStatuses'>
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
                </div>
                <h1 className='darvo-header section-header'>Darvo Deals</h1>
                {worldstatuses && dealList}
                <h1 className='explore-header section-header'>Explore Game Content</h1>
                <ImageLink
                    src='/imgs/wf-primary-img-link.jpg'
                    title='Primaries'
                    link='/items?p=1&f=Primary'
                    className='primary'
                />
                <ImageLink 
                    src='/imgs/wf-secondary-img-link.png'
                    title='Secondaries'
                    link='/items?p=1&f=Secondary'
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