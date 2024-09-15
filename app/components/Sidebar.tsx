"use client"
import { useContext, useEffect, useState } from "react"
import { TypeExContext, TypeExProvider } from "../context/RecipeContext"
import AddRecipe from "./AddRecipe"
import AddRecipeModal from "./AddRecipeModal"
import Recipes from "./Recipes"
import Recipes1 from "./MyRecipes"
import MealPlan from "./MealPlan"
import Link from "next/link"
import { useRouter,usePathname } from "next/navigation"

import './Sidebar.css'
import { useLocalStorage } from "../hooks/useLocalStorage"
function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    // Get the last part of the path
    const lastSegment = pathname.split('/').filter(Boolean).pop();
    const {isAppearing,isSignedIn} = useContext(TypeExContext)
    const widthClass = isAppearing ? "w-full" : "w-0"
    const widthClass1 = isAppearing ? "100%" : "0"
    const overflowClass = isAppearing ? "overflow-y-auto" : "overflow-y-hidden"

    const widthClass2 = isAppearing ? "w-[300px] opacity-100" : "w-[0px] opacity-0"
    const opacity = isAppearing ? "opacity-100" : "opacity-0"

    const opacity1 = isAppearing ? "1" : "0"


    useEffect(() => {
        const url = window.location.pathname;
    })


    const {getItem,getItem3} = useLocalStorage('email','password','isSignedIn')

    const [signed,setSigned] = useState<string>(getItem3())

    
    
    // Get the last part of the path
    // const lastSegment = pathname.split('/').filter(Boolean).pop();
    return (
        <>
        <TypeExProvider>
            <div className={`${widthClass2} bg-gradient-to-b from-blue-900 to-gray-800`} >
                <aside  className={`${opacity} relative top-60`}>
                    <div className="personl" style={{width:widthClass,overflow:overflowClass}}>
                        <ul>
                           {
                            getItem3() ? null: <li className={lastSegment === "Login" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"20px"}}>
                                <Link className="animated-underline" href="/Login">Login</Link>
                            </li>

                           
                           }
                           {
                            getItem3() ? null: <li className={lastSegment === "signUp" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"20px"}}>
                            <Link className="animated-underline" href="/signUp">Sign Up</Link>
                        </li>
                           }
                        
                            
                            <li className={lastSegment === "mealPlan" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"20px"}}>
                                <Link className="animated-underline" href="/mealPlan">Meal Plan</Link>
                            </li>
                            <li className={lastSegment === "myRecipes" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"20px"}}>
                                <Link className="animated-underline" href="/myRecipes">My recipes</Link>
                            </li>
                            <li className={lastSegment === "Recipes" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"60px"}}>
                                <Link className="animated-underline" href="/Recipes">Recipes</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="addRecipe0" style={{width:widthClass}}>
                        <ul>
                            <li className={lastSegment === "addRecipe" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"20px"}}>
                                <Link className="animated-underline" href="/addRecipe">Add recipe</Link>
                            </li>
                            <li className={lastSegment === "addRecipeURL" ? "border-r-4 border-red-500" : ""} style={{opacity:opacity1,marginBottom:"20px"}}>
                                <Link className="animated-underline" href="/addRecipeURL">Add recipe via URL</Link>
                            </li>
                        </ul>
                    </div>
                    
                </aside>
            </div>
        </TypeExProvider>
        
        </>
    )
}

export default Sidebar