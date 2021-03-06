import {useState, useEffect} from 'react'
import styles from '../styles/WorldStatusTile.module.css'

export default function WorldStatusTile({time, title, world}) {

    const {state, active} = world
    let colorClass = ''
    if(state === 'cold' || active === 'vome') colorClass = 'coldAndVoss'
    else if(state === 'warm' || active === 'fass') colorClass = 'warmAndFass'
    else if(state === 'day') colorClass = 'yellow'
    else if(state === 'night') colorClass = 'night'

    return (
        <div className={styles.status}>
            <div className={styles.titleAndTimerWrapper}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.worldState}>
                    (<span className={styles[colorClass]}>
                        {world.state || world.active}
                    </span>)
                </span>
                <span className={`timer ${styles.timer}`}>{time}</span>
            </div>
            <p className={styles.desc}></p>
        </div>
    )
}