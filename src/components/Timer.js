import { useState, useEffect } from "react"

export default function withTimer (WrappedComponent, expiry) {
    return ({refresh, ...props}) => {
        
        // 2022-04-15T07:00:00.000Z Time Format

        function getTimeString() {
            let temp = time
            if(temp < 0) {
                // setTimeout(refresh, 5000)
                return 'waiting...'
            }

            const ms = temp % 1000
            temp = Math.floor(temp / 1000)
            const sec = temp % 60
            temp = Math.floor(temp / 60)
            const min = temp % 60
            temp = Math.floor(temp / 60)
            const hour = temp % 24
            temp = Math.floor(temp / 24)
            const day = temp
            
            let str = ''
            str += day ? `${day}d` : ''
            str += hour ? ` ${hour}h` : ''
            str += min ? ` ${min}m` : ''
            str += sec ? ` ${sec}s` : ''
    
            return str
        }

        function getTimeDifference(expiration) {
            // console.log(expiration - Date.now())
            return expiration - Date.now()
        }
    
        const [time, setTime] = useState(getTimeDifference(Date.parse(expiry)))
    
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
            const diff = getTimeDifference(Date.parse(expiry))
            setTime(diff)
            
            let refreshTime
            if(diff < 0) {
                refreshTime = 5000
            }
            const refreshTimer = setTimeout(() => {
                refresh()
            }, refreshTime || (Date.parse(expiry) + 5 * 1000))

            return () => {
                clearTimeout(refreshTimer)
            }
        }, [expiry])

        return <WrappedComponent time={getTimeString()} {...props} />
    }
}

