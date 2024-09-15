"use client"

import { use, useContext, useState } from "react"
import { TypeExContext } from "../context/RecipeContext"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { get } from "http"
import { useRouter } from "next/navigation"




interface Recipe {
   
    extendedIngredients:object[]
    title:string,
    summary:string,
    cookingMinutes:string,
    servings:Number,
    analyzedInstructions:object[]
    image:string,
    sourceUrl:string,
    email:string


}

function AddRecipe() {


    const Router = useRouter()

    
    const [url,setURL] = useState<string>('')
    const [datas,setData] = useState<Recipe[]>([])
    const {isAppearing,email,setSignedIn} = useContext(TypeExContext)

   
    let data:Recipe;

    let obj:Recipe;

    const {getItem} = useLocalStorage('email','password','isSignedIn')

    const {getItem2} = useLocalStorage('email','password','isSignedIn')

    const [emails,setEmails] = useState<string>(getItem())

    const signOut = () => {
        const {removeItem,removeItem2,removeItem3} = useLocalStorage('email','password','isSignedIn')

        setSignedIn(false)

        removeItem()
        removeItem2()
        removeItem3()
        Router.push('/Login')
    }
    




    const handleURL = (event:React.ChangeEvent<HTMLInputElement>) =>{
        console.log(getItem())
        setURL(event.target.value)
    }

    const addRecipeToArray = async () => {

        const apiKey = 'b879fc7fe143426aaec9f40485d26977'

        const email = getItem()

        

        try {
            const res = await fetch(`https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${apiKey}`)


            if (!res.ok){
                throw new Error("No recipe found")
            }

            const data = await res.json()
            

            obj = {
                extendedIngredients:data.extendedIngredients,
                title:data.title,
                summary:data.summary,
                cookingMinutes:data.cookingMinutes,
                servings:data.servings,
                image:data.image,
                analyzedInstructions:data.analyzedInstructions,
                sourceUrl:data.sourceUrl,
                email:email

            }


            setData(prevData => [...prevData,obj])
            

            
        }
        catch(err) {
            console.log(err)
        }

        try {
            const res = await fetch('http://localhost:3000/api/recipes',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            })


            if (!res.ok){
                throw new Error("No recipe found")
            }

            const postData = await res.json()
        }
        catch(err){
            console.log(err)    
        }
    }
    return (
        <>
        <div className="addRecipe" style={{width:isAppearing ? "100%" : "70%"}}>
            <button className="w-28" onClick={() => signOut()}>Sign Out</button>
            <p>Add Recipe based on URL</p>
            <p>{emails}</p>
            <input type="text" onChange={handleURL} value={url} className="text-black"/>
            <button onClick={addRecipeToArray}>Add</button>
        </div>
        </>
    )
}

export default AddRecipe