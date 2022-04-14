import '../styles/DarvoDeals.css'

export default function DarvoDeals({time, deal}) {
    return (
        <div>
            <h1 className='deal-item-name status-title'>{deal.item}</h1>
        </div>
    )
}