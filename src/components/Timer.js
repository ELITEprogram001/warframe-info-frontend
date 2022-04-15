import { useState, useEffect } from "react"

export default function withTimer (WrappedComponent, timeString) {
    return ({refresh, ...props}) => {
        
        // 2022-04-15T07:00:00.000Z Time Format
        // -> 2022-04-15 Resets at 2 AM CDT

        function getTimeInSeconds(timeString='0') {
            const parts = timeString.split(' ')
            parts.reverse()
            let sum = 0
            parts.forEach((t, i) => {
                sum += Number.parseInt(t) * (60 ** i)
            })
            return sum
        }

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
    
        const [time, setTime] = useState(getTimeInSeconds(timeString))
    
        useEffect(() => {
            console.log(`%cTimer.js useEffect triggered %ctime: ${printTime(time)}`, 'color:red', 'color: white')
            const timer = setInterval(() => {
                setTime(prevTime => prevTime - 1)
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        }, [])
    
        useEffect(() => {
            const refreshTimer = setTimeout(() => {
                // refresh() temporarily disabled due to suspected bug
            }, (getTimeInSeconds(timeString) + 10) * 1000)
            console.log(`setting refresh timer id:${refreshTimer} for ${getTimeInSeconds(timeString) + 5}s`)
            setTime(getTimeInSeconds(timeString))
            return () => {
                console.log(`cleaning up refresh timer id:${refreshTimer}`)
                clearTimeout(refreshTimer)
            }
        }, [timeString])

        return <WrappedComponent time={printTime(time)} {...props} />
    }
}

