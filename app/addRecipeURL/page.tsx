"use client"
import dynamic from "next/dynamic";
import CheckButton from "../components/CheckButton";
import Sidebar from "../components/Sidebar";
import { TypeExProvider } from "../context/RecipeContext";

function RecipePageURL() {

    const AddRecipe = dynamic(() => import("../components/AddRecipe"),{ssr:false});
    return (
        <TypeExProvider>
            <div className="flex flex-row h-[720px]">

                {/* <button>Sign Out</button> */}
                <div className="flex flex-row">
                    <Sidebar/>
            
                
                    <CheckButton/>
                </div>
            
                <AddRecipe></AddRecipe>
            </div>
        </TypeExProvider>
            
        
        
    );
}

export default RecipePageURL;