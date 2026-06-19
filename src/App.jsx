import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
const [product,setproduct] = useState([]);
const [search,setsearch]=useState("")

useEffect(()=>{
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => 
    setproduct(data)
  );
  
},[])

const filterdata = product.filter((emp)=> emp.category.toLowerCase().includes(search.toLowerCase()))

return (
  <div className="app-container">
    <div className="search-bar">
      <input 
        onChange={(e)=> setsearch(e.target.value)} 
        placeholder='Search category...'
        value={search}
        className="search-input"
      />
    </div>
    
    <div className="products-grid">
      {
        filterdata.map((emplo)=>(
          <div key={emplo.id} className="product-card">
            <div className="product-image">
              <img src={emplo.image} alt={emplo.title} />
            </div>
            <div className="product-info">
              <h3>{emplo.title}</h3>
              <p className="category">{emplo.category}</p>
              <p className="description">{emplo.description.substring(0, 100)}...</p>
              <div className="product-footer">
                <div className="price-rating">
                  <span className="price">${emplo.price}</span>
                  <span className="rating">⭐ {emplo.rating.rate} ({emplo.rating.count})</span>
                </div>
                <button className="add-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
)
}

export default App
