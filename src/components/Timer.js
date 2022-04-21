import { useState, useEffect } from "react"
import axios from 'axios'

export default function withTimer (WrappedComponent, expiry) {
    return ({...props}) => {

        const [time, setTime] = useState()

        function getTimeString() {
            let temp = time
            if(temp < 0) {
                return 'waiting...'
            }
            
            // const ms = temp % 1000
            temp = Math.floor(temp / 1000)
            const sec = temp % 60
            temp = Math.floor(temp / 60)
            const min = temp % 60
            temp = Math.floor(temp / 60)
            const hour = temp % 24
            temp = Math.floor(temp / 24)
            const day = temp
            
            let str = ''
            str += day ? `${day}:` : ''
            if(day) {
                str += hour ? `${hour}:`.padStart(3, '0') : ''
            } else {
                str += hour ? `${hour}:` : ''
            }
            str += min ? `${min}:`.padStart(3, '0') : '00:'
            str += sec ? `${sec}`.padStart(2, '0') : '00'

            return str
        }

        // async function fetchCurrentTime() {
        //     const currentUTCTime = await axios.get('http://worldclockapi.com/api/json/utc/now')
        //     const localTime = new Date(currentUTCTime.data.currentDateTime)
        //     console.group('Accurate Time from API')
        //     console.log(localTime.toISOString())
        //     const hostTime = new Date(Date.now())
        //     console.log(hostTime - localTime)
        //     if(Math.abs(localTime - hostTime) >= 3600) {
                
        //     }
        //     console.groupEnd()
        //     return currentUTCTime
        // }

        function getTimeDifference(expiration, currentTime) {
            return expiration - currentTime
        }
    
        // Creates an adjusting timer to tick every second
        useEffect(() => {
            let expected = Date.now() + 1000
            let timer = setTimeout(tick, 1000)
            function tick () {
                setTime(prevTime => prevTime - 1000)
                const drift = Date.now() - expected
                expected += 1000
                timer = setTimeout(tick, 1000 - drift)
            }
            return () => {
                clearTimeout(timer)
            }
        }, [])
    
        useEffect(() => {
            // console.log('expiration changing')
            const diff = getTimeDifference(Date.parse(expiry), Date.now())
            setTime(diff)
            
            let refreshTime
            if(diff < 0) {
                refreshTime = 5000
            }
            const refreshTimer = setTimeout(() => {
                props.refresh()
            }, refreshTime || (diff + 10 * 1000))

            return () => {
                clearTimeout(refreshTimer)
            }
        }, [expiry])

        return <WrappedComponent time={getTimeString()} {...props} />
    }
}

