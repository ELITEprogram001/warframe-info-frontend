import {useState, useEffect} from 'react'
import '../styles/WorldStatusQuickView.css'

export default function WorldStatusTile({time, title}) {

    return (
        <div className='world-status'>
            <div className='status-wrapper'>
                <h2 className='status-title'>{title}</h2>
                <p>timeLeft = {time}</p>
            </div>
        </div>
    )
}