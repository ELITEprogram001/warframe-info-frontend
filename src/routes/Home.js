import {useState, useEffect} from 'react'
import axios from 'axios'
import WorldStatusQuickView from '../components/WorldStatusQuickView'
import ImageLink from '../components/ImageLink'
import '../styles/Home.css'

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

    const [worldstatuses, setWorldStatuses] = useState({cetus:{},vallis:{},cambion:{}})

    async function fetchWorldStatus() {
        const res = await axios.get('https://api.warframestat.us/pc')
        console.log(`%cfetching api...`, 'color:#009B77')
        console.groupCollapsed('World Times')
        console.log(`  cetus: ${res.data.cetusCycle.timeLeft}`)
        console.log(` vallis: ${res.data.vallisCycle.timeLeft}`)
        console.log(`cambion: ${res.data.cambionCycle.timeLeft}`)
        console.groupEnd()
        setWorldStatuses({
            cetus: res.data.cetusCycle,
            vallis: res.data.vallisCycle,
            cambion: res.data.cambionCycle,
        })
    }

    useEffect(() => {
        fetchWorldStatus()
    }, [])

    function refreshAPI() {
        fetchWorldStatus()
    }

    return (
        <div className='content-wrapper'>
            <div className='home-content'>
                <div className='major-news news'>
                    <img src='http://localhost:5055/imgs/wf-example-major-news.jpeg' alt='warframe-news' />
                </div>
                <h1 className='status-title section-header'>World Statuses</h1>
                {worldstatuses.cetus.timeLeft && <WorldStatusQuickView 
                    className='cetus'
                    title='Cetus'
                    refresh={refreshAPI}
                    seconds={getTimeInSeconds(worldstatuses.cetus.timeLeft)}
                />}
                {worldstatuses.vallis.timeLeft && <WorldStatusQuickView 
                    className='fortuna'
                    title='Orb Vallis'
                    refresh={refreshAPI}
                    seconds={getTimeInSeconds(worldstatuses.vallis.timeLeft)}
                />}
                {worldstatuses.cambion.timeLeft && <WorldStatusQuickView 
                    className='deimos'
                    title='Deimos'
                    refresh={refreshAPI}
                    seconds={getTimeInSeconds(worldstatuses.cambion.timeLeft)}
                />}

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