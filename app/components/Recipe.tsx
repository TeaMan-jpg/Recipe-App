import { useContext } from "react"

import { TypeExContext } from "../context/RecipeContext"

interface Ingredient {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}
interface Equipment {
    id: number;
    name: string;
    localizedName: string;
    image: string;
}
interface Step {
    number: number;
    step: string;
    ingredients: Ingredient[];
    equipment: Equipment[];
    length?: Length; // Length is optional as not all steps might have this property
}
interface Length {
    number: number;
    unit: string;
}


interface Instruction {
    name: string;
    steps: Step[];
}

interface Recipe {
    extendedIngredients:Ingredient[],
    title:String,
    summary:String,
    cookingMinutes:String,
    servings:Number,
    analyzedInstructions: Instruction[],
    image:String,
    sourceUrl:String,
    email:String

}

function Recipe({title,extendedIngredients,summary,cookingMinutes,servings,analyzedInstructions,image,sourceUrl,email}:{title:string,extendedIngredients:Ingredient[],summary:string,cookingMinutes:string,servings:Number,analyzedInstructions:Instruction[],image:string,sourceUrl:string,email:string}) {
    const {isAppearing} = useContext(TypeExContext)
    return (
        <>
        <div className=" h-64 mx-7 rounded-md" style={{width:isAppearing ? "70%" : "100%",border:"1px solid white"}}>
            <div className="h-[150px] relative overflow-hidden">
                <img className="w-60" style={{width:"100%"}} src={image} alt="" />
          
                <div className="flex flex-row z-10 absolute float-left left-0 top-0 bg-white text-black rounded m-1 text-center">
                        <svg style={{fill:"black"}} className="w-[20px] p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 542 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                     
                        {
                           cookingMinutes === null ? null :  cookingMinutes.includes("min") ? <h6 className="mx-2 text-center">{cookingMinutes}</h6> : <h6 className="mx-2 text-center">{cookingMinutes} min</h6>
                        }
                </div>
            
            </div>
            <div className="p-4">
                <h4 className="mt-3 mb-1">{title}</h4>
                <h6 className="text-xs mb-3">Recipe by {email}</h6>
                
               
            </div>
        </div>
        </>
    )
}

export default Recipe