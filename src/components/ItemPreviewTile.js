import '../styles/ItemPreviewTile.css'

export default function ItemPreviewTile(props) {
    return (
        <div className='item-preview-tile'>
            <img src={props.imgsrc} alt={`${props.name} preview`}/>
            <div className='info-panel'>
                <h3>{props.name}</h3>
                <span>{`MR${props.masteryReq}`}</span>
            </div>
        </div>
    )
}