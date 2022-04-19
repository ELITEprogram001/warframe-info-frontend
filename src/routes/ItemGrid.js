import ItemPreviewTile from '../components/ItemPreviewTile'
import axios from 'axios'
import { useState, useEffect } from 'react';
import styles from '../styles/ItemGrid.module.css'
import { useSearchParams } from 'react-router-dom';

function ItemGrid() {

  const [items, setItems] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/v1/items?` + searchParams.toString())
      const newItems = response.data.data.items
      console.log(newItems)
      setItems(newItems)
    }
    fetchData()
  }, [searchParams])

  useEffect(() => {
    console.log(searchParams)
    if(!searchParams.has('p')) {
      setSearchParams('p=1')
    }
  }, [])

  const itemTiles = items.map(item => {
    return (
      <ItemPreviewTile 
        key={item.uniqueName}
        item={item}
        imgsrc={`https://cdn.warframestat.us/img/${item.imageName}`}
      />
    )
  })

  const changePage = (e) => {
    
  }

  return (
    <div className='content-wrapper'>
      <h2 className={styles.header}>Items</h2>
      <div className={styles.grid}>
        {itemTiles}
      </div>
      <div className='btn-nav'>
      </div>
      
      {/* <Button onChange={changePage}>Next</Button> */}
    </div>
  );
}

export default ItemGrid;