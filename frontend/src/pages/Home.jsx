import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from "react-router-dom"

const Home = () => {
  const navigate1 = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [search,setsearch]=useState("")
  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate1('/');
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/get/recipe")
        const data = await res.json()
        setRecipes(data.recipe) 
      } catch (err) {
        console.error("Error fetching recipes:", err)
      }
    }
    fetchRecipes()
  }, [])
  const filterdata = recipes.filter((rcms)=> rcms.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="logout-btn">
    <button onClick={handleLogout}>
      Log Out
    </button>
    </div>
  <h1>Cocktail Recipe Names</h1>
  <input 
    className="search-bar" 
    onChange={(e)=> setsearch(e.target.value)} 
    placeholder="Search recipes..."
  />
  <div className="recipe-grid">
    {filterdata.map((recipe) => (
      <div className="recipe-card" key={recipe._id}>
        <Link to={`/product/${recipe._id}`} className="recipe-card" key={recipe._id}>
        <img src={recipe.image} alt={recipe.name}/>
        <span>{recipe.name}</span>
        </Link>
      </div>
    ))}
  </div>

</div>

  )
}

export default Home
