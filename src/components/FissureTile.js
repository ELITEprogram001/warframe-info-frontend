import styles from '../styles/FissureTile.module.css'

export default function FissureTile ({time, fissure}) {

    return (
        <div className={`${styles.tile}`}>
            <h3 className={styles.nodeTitle}>{fissure.node}</h3>
            <span className='timer'>{time}</span>
        </div>
    )
}