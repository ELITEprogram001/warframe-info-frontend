import ItemPreviewTile from '../components/ItemPreviewTile'
import axios from 'axios'
import { useState, useEffect } from 'react';
import '../styles/ItemGrid.css'

function ItemGrid() {

  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/v1/items?p=${page}`)
      const newItems = response.data.data.items
      console.log(newItems.map(item => item.name))
      setItems(newItems)
    }
    fetchData()
  }, [page])

  const itemTiles = items.map(item => {
    return (
      <ItemPreviewTile 
        key={item.uniqueName}
        name={item.name}
        imgsrc={`https://cdn.warframestat.us/img/${item.imageName}`}
        masteryReq={item.masteryReq}
      />
    )
  })

  const changePage = (e) => {
    setPage(prevPage => {
      return prevPage + 1
    })
  }

  return (
    <div className='item-content content-wrapper'>
      <div className='item-grid'>
        {itemTiles}
      </div>
      <div className='btn-nav'>
      </div>
      
      {/* <Button onChange={changePage}>Next</Button> */}
    </div>
  );
}

export default ItemGrid;