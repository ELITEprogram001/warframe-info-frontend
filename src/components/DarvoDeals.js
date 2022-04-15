import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styles/DarvoDeals.css'

export default function DarvoDeals({time, deal}) {

    const [imgSrc, setImgSrc] = useState('')

    async function getItem() {
        const res = await axios.get(`/api/v1/items/${deal.item}`)
        console.log(deal)
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
                <div className='item-info-row'>
                    <p><span className='slightly-bolded'>Sale Price:</span> {`${deal.salePrice} `}</p>
                    <img className='icon' src='http://localhost:5055/imgs/plat-icon.png' alt='plat icon' />
                </div>
                <div className='item-info-row'>
                    <p><span className='slightly-bolded'>Original Price:</span> {`${deal.originalPrice} `}</p>
                    <img className='icon' src='http://localhost:5055/imgs/plat-icon.png' alt='plat icon' />
                </div>
                {imgSrc && <img className='weapon-img' src={`https://cdn.warframestat.us/img/${imgSrc}`} alt='daily deal item'/>}
                <div className='eta-timer'>{time}</div>
                <div className='stock-info'>
                    <div className='item-info-row'>
                        <p><span className='slightly-bolded'>Stock:</span> {`${deal.total - deal.sold} / ${deal.total} left`}</p>
                    </div>
                    <div className='items-out meter'>
                        <div className='items-left meter' style={{width: `${percentItemsLeft()}%`}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}