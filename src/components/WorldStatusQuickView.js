import {useState, useEffect} from 'react'
import '../styles/WorldStatusQuickView.css'

export default function WorldStatusQuickView({seconds, refresh, title}) {

    function printTime(seconds) {
        let str = ''
        let hours = Math.floor(seconds / 3600)
        if(hours >= 1) {
            str += `${hours}h `
        }
        let min = Math.floor(seconds % 3600 / 60)
        if(min >= 1) {
            str += `${min}m `
        }
        let sec = seconds % 60
        if(sec >= 0) {
            str += `${sec}s `
        }
        return str
    }

    const [time, setTime] = useState(seconds)

    useEffect(() => {
        console.log(`%ccomponent useEffect triggered %ctime: ${printTime(time)}`, 'color:aqua', 'color: white')
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        const refreshTimer = setTimeout(() => {
            refresh()
        }, (seconds + 5) * 1000)
        console.log(`setting refresh timer id:${refreshTimer} for ${seconds + 5}s`)
        setTime(seconds)
        return () => {
            console.log(`cleaning up refresh timer id:${refreshTimer}`)
            clearTimeout(refreshTimer)
        }
    }, [seconds])

    return (
        <div className='world-status'>
            <h2>{title}</h2>
            <p>timeLeft = {printTime(time)}</p>
        </div>
    )
}