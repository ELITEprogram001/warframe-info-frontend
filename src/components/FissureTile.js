import styles from '../styles/FissureTile.module.css'

export default function FissureTile ({time, fissure}) {
    
    console.log(`${fissure.node}: ${time}`)

    return (
        <div className={styles.tile}>
            <h3 className={styles.nodeTitle} >{fissure.node} {fissure.tier} {time}</h3>
        </div>
    )
}