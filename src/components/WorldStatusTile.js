import {useState, useEffect} from 'react'
import '../styles/WorldStatusQuickView.css'

export default function WorldStatusTile({time, title, world}) {

    return (
        <div className='world-status'>
            <h2 className='status-title'>{title}</h2>
            <p>State: {world.state || world.active}</p>
            <p>Time Remaining: {time}</p>
        </div>
    )
}