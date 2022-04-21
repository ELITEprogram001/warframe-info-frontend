import axios from 'axios'
import {useState, useEffect} from 'react'
import styles from '../styles/DarvoDeals.module.css'

export default function DarvoDeals({time, deal, className}) {

    const [imgSrc, setImgSrc] = useState('')

    async function getItem() {
        const res = await axios.get(`/api/v1/items/${deal.item}`)
        // console.log(deal)
        setImgSrc(res.data.data.imageName)
    }

    function isSoldOut() {
        return deal.total - deal.sold <= 0
    }

    function percentItemsLeft() {
        return ((deal.total - deal.sold) / deal.total) * 100
    }

    useEffect(() => {
        getItem()
    }, [deal])

    return (
        <div className={styles[className]}>
            {isSoldOut() && 
                <div className={styles.soldOutOverlay}>
                    <div className={styles.soldOutBanner}>OUT OF STOCK</div>
                </div>
            }
            <div className={styles.wrapper}>
                <h1 className={`${styles.itemName}`}>
                    {deal.item}
                    <span className={styles.discount}>({`${deal.discount}% off` })</span>
                </h1>
                <div className={styles.infoRow}>
                    <p className={styles.infoRowText}>
                        <span className={styles.slightlyBolded}>Sale Price:</span> 
                        {` ${deal.salePrice} `}
                    </p>
                    <img className={styles.icon} src='/imgs/plat-icon.png' alt='plat icon' />
                </div>
                <div className={styles.infoRow}>
                    <p className={styles.infoRowText}>
                        <span className={styles.slightlyBolded}>Original Price:</span> 
                        {` ${deal.originalPrice} `}
                    </p>
                    <img className={styles.icon} src='/imgs/plat-icon.png' alt='plat icon' />
                </div>
                {imgSrc && <img className={styles.img} src={`https://cdn.warframestat.us/img/${imgSrc}`} alt='daily deal item'/>}
                <div className={`${styles.eta} timer`}>{time}</div>
                <div className={styles.stockInfo}>
                    <div className={styles.infoRow}>
                        <p><span className={styles.slightlyBolded}>Stock:</span> {`${deal.total - deal.sold} / ${deal.total} left`}</p>
                    </div>
                    <div className={`${styles.amountGone} ${styles.meter}`}>
                        <div className={`${styles.itemsLeft} ${styles.meter}`} style={{width: `${percentItemsLeft()}%`}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}