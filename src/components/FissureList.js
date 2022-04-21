import styles from '../styles/FissureList.module.css'
import withTimer from './Timer'
import FissureTile from './FissureTile'

export default function FissureList({fissures, refresh}) {
    
    let filteredFissures = fissures
    filteredFissures = fissures.filter(fissure => {
        return fissure.expired !== true
    })
    filteredFissures.sort((a, b) => {
        if(a.tierNum === b.tierNum) return 0
        if(a.tierNum < b.tierNum) return -1
        return 1
    })

    let lithFissures = []
    let mesoFissures = []
    let neoFissures = []
    let axiFissures = []
    let reqFissures = []
    filteredFissures.forEach(fissure => {
        const Fissure = withTimer(FissureTile, fissure.expiry)
        const fissureComponent = <Fissure 
                                    refresh={refresh} 
                                    key={fissure.id} 
                                    fissure={fissure} 
                                />
        switch(fissure.tier.toLowerCase()){
            case 'lith': 
                lithFissures.push(fissureComponent)
                break
            case 'meso': 
                mesoFissures.push(fissureComponent)
                break
            case 'neo': 
                neoFissures.push(fissureComponent)
                break
            case 'axi': 
                axiFissures.push(fissureComponent)
                break
            case 'requiem': 
                reqFissures.push(fissureComponent)
                break
            default:
        }
    })
    
    return (
        <div className={styles.list}>
            <h3 className={styles.columnHeader}>Lith</h3>
            <h3 className={styles.columnHeader}>Meso</h3>
            <h3 className={styles.columnHeader}>Neo</h3>
            <h3 className={styles.columnHeader}>Axi</h3>
            <h3 className={styles.columnHeader}>Requiem</h3>
            <div className={`${styles.lithFissures} ${styles.fissureColumn}`}>{lithFissures.length && lithFissures}</div>
            <div className={`${styles.mesoFissures} ${styles.fissureColumn}`}>{mesoFissures}</div>
            <div className={`${styles.neoFissures} ${styles.fissureColumn}`}>{neoFissures}</div>
            <div className={`${styles.axiFissures} ${styles.fissureColumn}`}>{axiFissures}</div>
            <div className={`${styles.reqFissures} ${styles.fissureColumn}`}>{reqFissures}</div>
            {/* {fissureList} */}
        </div>
    )
}