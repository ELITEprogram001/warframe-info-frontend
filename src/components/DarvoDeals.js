import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styles/DarvoDeals.css'

export default function DarvoDeals({time, deal}) {

    const [imgSrc, setImgSrc] = useState('')

    async function getItem() {
        const res = await axios.get(`/api/v1/items/${deal.item}`)
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
        <div className='deal-tile'>
            {isSoldOut() && 
                <div className='out-of-stock-overlay'>
                    <div className='out-of-stock-banner '>OUT OF STOCK</div>
                </div>
            }
            <div className='deal-wrapper'>
                <h1 className='deal-item-name status-title'>
                    {deal.item}
                    <span>({`${deal.discount}% off` })</span>
                </h1>
                <p>Sale Price: {`${deal.salePrice} platinum`}</p>
                <p>Original Price: {`${deal.originalPrice} platinum`}</p>
                {imgSrc && <img src={`https://cdn.warframestat.us/img/${imgSrc}`} alt='daily deal item'/>}
                <div className='stock-info'>
                    <p>Stock: {`${deal.total - deal.sold} / ${deal.total} left`}</p>
                    <div className='items-out meter'>
                        <div className='items-left meter' style={{width: `${percentItemsLeft()}%`}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}