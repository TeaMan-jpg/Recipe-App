"use client"
import CheckButton from "../components/CheckButton";
import Recipes from "../components/MyRecipes";
import Sidebar from "../components/Sidebar";
import { TypeExProvider } from "../context/RecipeContext";


function MyRecipesPage() {
    return (
        <TypeExProvider>
            <div className="flex flex-row">
               
                <div className="flex flex-row">
                    <Sidebar></Sidebar>
                    <CheckButton></CheckButton>
                </div>
                <Recipes></Recipes>
              
            </div>
        </TypeExProvider>
        
            
       
        
    );
}

export default MyRecipesPage;