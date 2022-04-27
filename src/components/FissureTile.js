import styles from '../styles/FissureTile.module.css'

export default function FissureTile ({time, fissure}) {

    function getTileName() {
        const end = fissure.node.indexOf('(') - 1
        return fissure.node.slice(0, end).trim()
    }

    function getTilePlanet() {
        const start = fissure.node.indexOf('(') + 1
        const end = fissure.node.indexOf(')')
        return fissure.node.slice(start, end).trim()
    }
    
    const nodeName = getTileName()
    const nodePlanet = getTilePlanet()

    return (
        <div className={`${styles.tile}`}>
            <div className={styles.titleAndTimer}>
                <h3 className={styles.nodeTitle}>{nodeName}</h3>
                <span className='timer'>{time}</span>
            </div>
            <span className={styles.nodePlanet}>{nodePlanet}</span>
        </div>
    )
}