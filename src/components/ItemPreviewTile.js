import styles from '../styles/ItemPreviewTile.module.css'

export default function ItemPreviewTile(props) {

    const {item} = props

    return (
        <div className={styles.tile}>
            <img className={styles.img} src={props.imgsrc} alt={`${props.name} preview`}/>
            <div className={styles.info}>
                <div className={styles.quickInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    {
                        item.masteryReq && 
                        <span className={styles.mrreq}>{`MR${item.masteryReq}`}</span>
                    }
                </div>
                {item.description && <p className={styles.desc}>{item.description}</p>}
            </div>
        </div>
    )
}