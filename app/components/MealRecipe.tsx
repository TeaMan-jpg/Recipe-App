import { useContext } from "react"

import { TypeExContext } from "../context/RecipeContext"
function MealRecipe({name,email,time}:({name:string,email:string,time:string})) {
    const {isAppearing} = useContext(TypeExContext)
    return (
        <>
        <div className=" h-32 w-64 my-5 rounded-md flex flex-row" style={{width:isAppearing ? "80%" : "100%",border:"1px solid white"}}>
            <img className="w-10" style={{width:"30%"}} src="https://www.foodista.com/sites/default/files/styles/recype/public/DSC01604.jpg" alt="" />
            <div className="h-[150px] relative overflow-hidden flex flex-col">

        
                <div className="flex flex-row z-10 absolute float-left left-0 top-0 bg-white text-black rounded m-1 text-center">
                        <svg style={{fill:"black"}} className="w-[20px] p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 542 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                        <h6 className="mx-2 text-center">{time} min</h6>
                </div>
                <div className="p-4">
                    <h4 className="mt-3 mb-1">{name}</h4>
                    <h6 className="text-xs mb-3">Recipe by {email}</h6>
                    
                
                </div>
            
            </div>
            
        </div>
        </>
    )
}

export default MealRecipe