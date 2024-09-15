"use client"
import { use, useEffect, useState } from "react"
import './MealPlanModal.css'
import { set } from "mongoose";

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
interface Recipes {
    extendedIngredients:Ingredient[],
    title:string,
    summary:string,
    cookingMinutes:string,
    servings:number,
    analyzedInstructions: Instruction[],
    image:string,
    sourceUrl:string,
    email:string

}
function MealPlanModal({dates,email, toggleModal}:({dates:string,email:string, toggleModal: (index:number) => void})) {

    const [recipes, setRecipes] = useState<Recipes[]>([]);

    const [recipe,setRecipe] = useState<Recipes | null>(null)

    const [index,setIndex] = useState<number>(0)


    const [date,setDate] = useState<Date>(new Date(dates))

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']




    useEffect(() => {
        const fetchRecipes = async () => {

            try {
                const res = await fetch('http://localhost:3000/api/recipes',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const data = await res.json();

                console.log(data.topics)
                setRecipes(data.topics);
            }
            catch (error) {
                console.log(error);
            }

        }
        fetchRecipes();
    },[])

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt(e.target.value)
        setIndex(index)

        setRecipe(recipes[index])

    }


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        toggleModal(index)


        const obj = {
            email:email,
            meal:recipe,
            dates:dates
        }

        try {
            const res = await fetch('http://localhost:3000/api/meals',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            });
            const data = await res.json();

            console.log(data.topics)
            setRecipes(data.topics);
        }
        catch (error) {
            console.log(error);
        }
        
    }
    return (
      <div className="modal">
         <div className="overlay">
            <div className="modalbox">
                <h2 className="mx-1 w-60 m-2">{days[date.getDay() % 7]} {date.getDate()} {months[date.getMonth() % 12]}</h2>
                <form action="" onSubmit={handleSubmit}>
                    <select name="" id="" onChange={handleSelect} className="m-2">
                        {
                            recipes.map((recipe, index) => {
                                return (
                                    <option key={index} value={index}>{recipe.title}</option>
                                )
                            })

                        }
                    </select>
                    <div className="buttons flex justify-between ">
                        <button  className="m-2" type="submit">Add</button>
                        <button  className="m-2" onClick={() =>toggleModal(index)}>Close</button>
                    </div>
                </form>
            </div>
       </div>
      </div>
    )
}

export default MealPlanModal