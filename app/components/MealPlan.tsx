"use client"
import { use, useContext, useEffect, useState } from "react"

import { TypeExContext } from "../context/RecipeContext"
import MealRecipe from "./MealRecipe"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "../hooks/useLocalStorage"
import MealPlanModal from "./MealPlanModal"
import { get } from "http"


interface Recipe {
    extendedIngredients:string[]
    title:string,
    summary:string,
    cookingMinutes:string,
    servings:number,
    analyzedInstructions:string[]
    image:string,
    email:string
}
interface Dates {
    dates:string,
    meal:Recipe[],
    email:string
}
function MealPlan() {

    const Router = useRouter()

    const generateDateArray = (numDays:number) => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < numDays; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };


    const [meals,setMeals] = useState<Dates[]>([])
    const [dateArray,setDateArray] = useState(generateDateArray(10)); // Generates 10 days including today
    useEffect(() => {


        const fetchMeals = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/meals',
                {
                    method:'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
                

                if (!res.ok) {
                    throw new Error('Something went wrong')
                }
                const data = await res.json()
                console.log("hregre")
                console.log(data.topics)
                setMeals(data.topics)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchMeals()

    },[])

    const [value,setValue] = useState<number>(0)


    const {getItem} = useLocalStorage('email','password','isSignedIn')


    const [email,setEmail] = useState<string>(getItem())


    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const {isAppearing,setSignedIn} = useContext(TypeExContext)

    const widthClasses = isAppearing ?   "w-[700px]" : "w-[950px]"

    const widthClasses1 = isAppearing ?   "w-[665px]" : "w-[930px]"

   

    const [isOpen,setIsOpen] = useState<boolean>(false)

    const toggleModal = (index:number) => {

        setValue(index)
        setIsOpen(prevState => !prevState)
    }


    const signOut = () => {
        const {removeItem,removeItem2,removeItem3} = useLocalStorage('email','password','isSignedIn')

        setSignedIn(false)

        removeItem()
        removeItem3()
        Router.push('/Login')
    }
    


    
    const [selectedDates, setSelectedDates] = useState([]);
    return (
        <>
        <div className="w-[1200px]">
            <div className="mealPlans" style={{width:isAppearing ? "100%" : "70%"}}>

                <button className="w-28" onClick={() => signOut()}>Sign out</button>
                {
                    dateArray.map((date,index) => (
                        <>
                        <div className="dayMeal" >
                            <div className="flex flex-row">
                                <h2 className="mx-1 w-60 ">{days[date.getDay() % 7]} {date.getDate()} {months[date.getMonth() % 12]}</h2>
                                <svg onClick={() => toggleModal(index)} className="fill-white ml-96 m-2 w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                            </div>
                            <hr className={`${widthClasses1}`} />
                            <ul className={widthClasses}>
                                {
                                    meals.map((meal,index) => {

                                        const dateString = meal.dates
                                        const dated = new Date(dateString);

                                        return (
                                            <>
                                             {
                                                days[dated.getDay() & 7] === days[date.getDay() % 7] && dated.getDate() === date.getDate() && months[date.getMonth() % 12] === months[dated.getMonth() % 12]  && meal.email === email ? <MealRecipe key={index} name={meal.meal[0].title}  email={meal.email} time={meal.meal[0].cookingMinutes} /> : null
                                            }
                                            </>
                                        )


                                        
                                    })
                                }
                            </ul>

                            {
                                isOpen && value === index ? <MealPlanModal dates={date.toISOString()}   toggleModal={toggleModal} email={email}/> : null
                            }

                        </div>
                        </>
                    ))
                }
                {

                }
            </div>
        </div>
        </>
    )
}

export default MealPlan