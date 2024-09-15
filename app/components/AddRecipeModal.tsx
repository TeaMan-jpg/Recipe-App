"use client"

import { useContext, useState } from "react"
import { TypeExContext } from "../context/RecipeContext"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useRouter } from "next/navigation"
import { set } from "mongoose"

interface Recipe {
   
    extendedIngredients:string[]
    title:string,
    summary:string,
    cookingMinutes:number,
    servings:number,
    analyzedInstructions:string[]
    image:string,
    email:string


}
function AddRecipeModal() {

    const Router = useRouter()
    const {isAppearing,isSignedIn,setSignedIn} = useContext(TypeExContext)

    const [instructions,setInstructions] = useState<string[]>([])
    const [ingredients,setIngredients] = useState<string[]>([])

    const [instruction,setInstruction] = useState<string>('')
    const [ingredient,setIngredient] = useState<string>('')
    const [title,setTitle] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    const [servings,setServings] = useState<number>(0)
    const [duration,setDuration] = useState<number>(0)

    const [url,setUrl] = useState<string>('')

    const [datas,setData] = useState<Recipe[]>([])

    const {getItem} = useLocalStorage('email','password','isSignedIn')

  

    const [emails,setEmails] = useState<string>(getItem())
    

    const signOut = () => {
        const {removeItem,removeItem2,removeItem3} = useLocalStorage('email','password','isSignedIn')

        setSignedIn(false)

        removeItem()
        removeItem3()
        Router.push('/Login')
    }

    


    const handleInstruction = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInstruction(event.target.value)
    }

    const handleIngredient = (event:React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(event.target.value)
    }


    const addInstruction = () => {
        setInstructions(prevList => [...prevList,instruction])
    }

    const addIngredient = () => {
        setIngredients(prevList => [...prevList,ingredient])
    }

    const handleServing = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const number = parseInt(event.target.value)
        setServings(number)
    }

    const handleDuration = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const number = parseInt(event.target.value)
        setDuration(number)
    }

    const handleURL = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value)
    }


    const handleTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescription = (event:React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }


    const sendData = async (e:React.FormEvent) => {
        e.preventDefault()

        const obj:Recipe = {
            extendedIngredients:ingredients,
            title:title,
            summary:description,
            servings:servings,
            cookingMinutes:duration,
            analyzedInstructions:instructions,
            image:"https://www.simplyrecipes.com/thmb/lLEaTqRTWj8SVR_yUUf6HcGaugE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Jalapeno-Popper-Grilled-Cheese-LEAD-8-2662f589961b4965908c52e433c23628.jpg",
            email:emails
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
        <div className="recipeModal" style={{width:isAppearing ? "100%" : "70%"}}>
            <p>{emails}</p>
            <button className="w-32" onClick={() => signOut()}>Sign Out</button>
            <p>{isSignedIn}</p>
           
                <form action="" onSubmit={sendData} className="flex flex-col w-[400px]">
                    <label htmlFor="">Title</label>
                    <input type="text" onChange={handleTitle} value={title}/>
                    <label htmlFor="">Description</label>
                    <input type="text" onChange={handleDescription} value={description} />
                    <label htmlFor="">Servings</label>
                    <select name="" id="" onChange={handleServing} value={servings}>
                        <option value="-" selected>-</option>
                        {
                            [...Array(20)].map((num, i) => (
                                <>
                                <option value={i + 1}>{i + 1}</option>
                                </>
                            ))
                        }

                    </select>
                    <label htmlFor="">Duration</label>
                    <select name="" id="" onChange={handleDuration} value={duration}>
                        <option value="-" selected >-</option>
                        {
                            [...Array(9)].map((num, i) => (
                                <>
                                <option value={(i + 1) * 5}>{(i + 1) * 5} min</option>
                                </>
                            ))
                        }
                        <option value="60">1hr</option>
                        <option value="90">1hr, 30 min</option>
                        <option value="120">2hrs</option>
                        <option value="150">2hrs,30 min</option>
                        <option value="180">3hrs</option>
                        <option value="240">4 hrs</option>
                        <option value="250">&gt 4hrs</option>

                    </select>
                    <label htmlFor="">Ingredients</label>

                    <input type="text" onChange={handleIngredient} value={ingredient}/>
                    <ol>
                        {
                            ingredients.map((ingredient,index) => (
                                <>
                                <li key={index} className="flex flex-row">
                                    <p className="mx-2">{index + 1}. </p>
                                    <p>{ingredient}</p>
                                </li>
                                </>
                            ))
                        }
                    </ol>
                    <button type="button" onClick={addIngredient}>Add Ingredient</button>

                    <label htmlFor="">Instructions</label>

                    <input type="text" onChange={handleInstruction} value={instruction}/>
                    <ol>
                        {
                            instructions.map((instruction,index) => (
                                <>
                                <li key={index} className="flex flex-row">
                                    <p  className="mx-2">{index + 1}. </p>
                                    <p>{instruction}</p></li>
                                </>
                            ))
                        }
                    </ol>
                    <button type="button" onClick={addInstruction}>Add Instruction</button>
                    <label htmlFor="">Source URL</label>
                    <input type="text" onChange={handleURL} value={url} />
                    <button type="submit">Add Recipe</button>
            
                </form>
                
        </div>
        </>
    )
}

export default AddRecipeModal