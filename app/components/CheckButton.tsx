"use client"
import { useContext } from "react"
import { TypeExContext } from "../context/RecipeContext"



function CheckButton() {

    const {isAppearing,setIsAppearing} = useContext(TypeExContext)
    const {width,setWidth} = useContext(TypeExContext)

   

    const handleAppearing = () => {
        setIsAppearing(prevState => !prevState)
        console.log(isAppearing)
        
        
    }

    
    return (
        <>
        <div className="button">
            {/* <img src="" alt="checks" onClick={handleAppearing}/> */}

            <button className="w-[20px] h-[20px] m-2 relative top-3" onClick={handleAppearing}></button>
               
            
        </div>
        </>
    )
}
export default CheckButton