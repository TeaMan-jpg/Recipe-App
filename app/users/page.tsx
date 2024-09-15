import React from 'react'
import ProductCard from '../components/ProductCard'
import ToDoList from '../components/ToDoList'
import CheckButton from '../components/CheckButton'
import Sidebar from '../components/Sidebar'
import Recipes1 from '../components/MyRecipes'
import { TypeExProvider } from '../context/RecipeContext'

const page = () => {
  return (
   <TypeExProvider>
        <div>
        
          <div className="flexed">
            <div className="flex flex-row">
                  <Sidebar/>
            
              
                  <CheckButton/>
            </div>
            <div className="hero"></div>
          </div>
        
      


        
        </div>
   </TypeExProvider>
  )
}

export default page