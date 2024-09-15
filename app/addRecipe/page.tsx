"use client";

import dynamic from "next/dynamic";

import CheckButton from "../components/CheckButton";
import Sidebar from "../components/Sidebar";
import { TypeExContext, TypeExProvider } from "../context/RecipeContext";
import { useContext } from "react";

function RecipePage() {

    const {isSignedIn} = useContext(TypeExContext);

    const AddRecipeModal = dynamic(() => import("../components/AddRecipeModal"),{ssr:false});
    return (
        <TypeExProvider>
            <div className="flex flex-row h-[720px]">
       

                
                <div className="flex flex-row">
                        
                            <Sidebar/>
                    
                        
                            <CheckButton/>
                </div>
                <AddRecipeModal></AddRecipeModal>
            </div>
        </TypeExProvider>
    );
}

export default RecipePage;