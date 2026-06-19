import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
const [product,setproduct] = useState([]);
const [search,setsearch]=useState("")
const [filterType, setfilterType] = useState("title")
const [categories, setcategories] = useState([])

useEffect(()=>{
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    setproduct(data)
    const uniqueCategories = [...new Set(data.map(p => p.category))]
    setcategories(uniqueCategories)
  });
  
},[])

const filterdata = search === "" ? product : product.filter((emp)=> {
  if(filterType === "title") {
    return emp.title.toLowerCase().includes(search.toLowerCase())
  } else if(filterType === "category") {
    return emp.category.toLowerCase().includes(search.toLowerCase())
  } else if(filterType === "price") {
    return emp.price <= parseFloat(search) || search === ""
  } else if(filterType === "rating") {
    return emp.rating.rate >= parseFloat(search) || search === ""
  }
  return true
})

return (
  <div className="app-wrapper">
    <div className="sidebar">
      <div className="filter-section">
        <h3>Filters</h3>
        <div className="filter-group">
          <label>Filter By:</label>
          <select 
            value={filterType} 
            onChange={(e) => {
              setfilterType(e.target.value)
              setsearch("")
            }}
            className="filter-dropdown"
          >
            <option value="title">Product Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="filter-group">
          <label>
            {filterType === "title" && "Search Product Name"}
            {filterType === "category" && "Select Category"}
            {filterType === "price" && "Max Price"}
            {filterType === "rating" && "Min Rating"}
          </label>

          {filterType === "category" ? (
            <select 
              value={search} 
              onChange={(e) => setsearch(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          ) : (
            <input 
              type={filterType === "price" || filterType === "rating" ? "number" : "text"}
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder={
                filterType === "title" ? "Search by name..." :
                filterType === "price" ? "Max price..." :
                "Min rating..."
              }
              className="filter-input"
            />
          )}
        </div>

        {search && (
          <button 
            onClick={() => setsearch("")}
            className="clear-filter-btn"
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>

    <div className="main-content">
      <div className="products-grid">
        {
          filterdata.length > 0 ? (
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
          ) : (
            <div className="no-products">No products found</div>
          )
        }
      </div>
    </div>
  </div>
)
}

export default App
