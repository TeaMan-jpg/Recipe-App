"use client"
import CheckButton from "../components/CheckButton";
import Recipes1 from "../components/Recipes";

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
                    <Recipes1></Recipes1>
                
                </div>
            </TypeExProvider>
        

    );
}

export default MyRecipesPage;