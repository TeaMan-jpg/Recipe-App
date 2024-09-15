"use client"

import Sidebar from "../components/Sidebar";

import CheckButton from "../components/CheckButton";
import MealPlan from "../components/MealPlan";
import { TypeExProvider } from "../context/RecipeContext";

function MealPlanPage() {
    return (
        <>
        <TypeExProvider>
            <div className="flex flex-row">
        
                    <div className="flex flex-row">
                        <Sidebar></Sidebar>
                        <CheckButton></CheckButton>
                    </div>
                    <MealPlan></MealPlan>
                
            </div>
        </TypeExProvider>
       
        
        </>
    )
}

export default MealPlanPage;