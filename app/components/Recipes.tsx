"use client";
import { useContext, useEffect, useState } from "react";
import { TypeExContext } from "../context/RecipeContext";
import Recipe from "./Recipe";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import RecipeModal from "./RecipeModal";
import Link from "next/link"
import ProfileCard from "./ProfileCard";
import './Recipes.css'
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

interface Users {
    email:string
    image:string
}

function Recipes1() {
    const Router = useRouter();
    const { isAppearing,setSignedIn } = useContext(TypeExContext);
    const [recipes, setRecipes] = useState<Recipes[]>([]);

    const [users,setUsers] = useState<Users[]>([])

    const [recipesTime, setRecipesTime] = useState<Recipes[]>([]);

    const {getItem} = useLocalStorage('email','password','isSignedIn')

    const [email,setEmail] = useState<string>(getItem())


    const [val,setVal] = useState<number>(0)


    const [isOpen, setIsOpen] = useState(false);

    const [isOpenTime, setIsOpenTime] = useState(false);

    const [val2,setVal2] = useState<number>(0);

    const toggleModal = (index:number) => {
        setVal(index)
        setIsOpen(prevState => !prevState);
    }

    const toggleModal2 = (index:number) => {
        setVal2(index)
        setIsOpenTime(prevState => !prevState);
    }

    const [images,setImages] = useState<{[key:string]:string}>({})

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/recipes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error("No recipes found");
                }

                const data = await res.json();

                console.log(data);

                setRecipes(data.topics);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipes();
    }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/topics', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                if (!res.ok) {
                    throw new Error("No users found");
                }

                const data = await res.json();

                setUsers(data.topics);


            }
            
            catch (error) {
                console.log(error);
            }
        }

        fetchUsers()
    },[])


    
    useEffect(() => {
        const fetchRecipesTime = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/recipes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error("No recipes found");
                }

                const data = await res.json();

                console.log(data);

                setRecipesTime(data.topics.filter((element: Recipes) => {
                    let extractNum = "0";

                    if (element.cookingMinutes === undefined || element.cookingMinutes === null) {
                        extractNum = "-1";

                    }
                    else if (element.cookingMinutes.includes(" ")) {
                        extractNum = element.cookingMinutes.split(" ")[0];
                        console.log(extractNum);
                    }
                    else {
                        extractNum = element.cookingMinutes;
                        console.log(extractNum);
                    }
                    // const extractNum = element.cookingMinutes.split(" ")[0];
                  
                    return parseInt(extractNum) < 60 ;
                }));
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipesTime();
    }, []);


    

    const signOut = () => {
        const {removeItem,removeItem2,removeItem3} = useLocalStorage('email','password','isSignedIn')

        setSignedIn(false)

        removeItem()
        removeItem2()
        removeItem3()
        Router.push('/Login')
    }
    

    return (
        <>
            {/* Flexible grid container with dynamic columns */}
           <div>
            <button className="w-28" onClick={() => signOut()}>Sign out</button>
            <div
                    className={`grid gap-4 ${isAppearing ? "grid-cols-3" : "grid-cols-5"} w-full`}
                    style={{ width: isAppearing ? "100%" : "70%" }}
                >
                    
                    {recipes.length > 0 ? (
                        recipes.map((recipe, index) => (
                            <div className="m-4 p-4 border-2 border-gray-300 rounded-lg" key={index}>
                                <Recipe title={recipe.title} extendedIngredients={recipe.extendedIngredients} analyzedInstructions={recipe.analyzedInstructions} servings={recipe.servings} cookingMinutes={recipe.cookingMinutes} email={recipe.email} summary={recipe.summary} sourceUrl={recipe.sourceUrl} image={recipe.image} />
                                <button onClick={() => toggleModal(index)}>More</button>

                                {
                                    isOpen && index === val ? <RecipeModal title={recipe.title} extendedIngredients={recipe.extendedIngredients} analyzedInstructions={recipe.analyzedInstructions} servings={recipe.servings} cookingMinutes={recipe.cookingMinutes} email={recipe.email} summary={recipe.summary} sourceUrl={recipe.sourceUrl} image={recipe.image} onClose={() => toggleModal(index)} value={val} index={index} />:null
                                }
                            </div>
                        ))
                    ) : (
                        <div className="check">
                            <h2>Add some recipes for display</h2>
                        </div>
                    )}
                   
                   
                </div>
                <div className={`grid gap-4 ${isAppearing ? "grid-cols-3" : "grid-cols-5"} w-full my-20 mt-20 users`}>
                {
                        users.length > 0 ? (
                            <ul className="flex flex-row gap-40 w-80 ">
                                {
                                    users.map((user, index) => (
                                        <li key={index} className="w-96 boxed">
                                            <img src={user.image} className="rounded-full imaged w-80" alt="" />
                                            <Link href={`/${user.email}`} >
                                                <ProfileCard email={user.email}></ProfileCard>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        ):(
                            <div>
                                <h2>No users found</h2>
                            </div>
                        )
                    }
                </div>
                <div className={`grid gap-4 ${isAppearing ? "grid-cols-3" : "grid-cols-5"} w-full`}>
                {
                        recipesTime.length > 0 ? (
                            recipesTime.map((recipe, index) => (
                                <div className="m-4 p-4 border-2 border-gray-300 rounded-lg" key={index}>
                                    <Recipe title={recipe.title} extendedIngredients={recipe.extendedIngredients} analyzedInstructions={recipe.analyzedInstructions} servings={recipe.servings} cookingMinutes={recipe.cookingMinutes} email={recipe.email} summary={recipe.summary} sourceUrl={recipe.sourceUrl} image={recipe.image} />
                                    <button onClick={() => toggleModal2(index)}>More</button>

                                    {
                                        isOpenTime && index === val2 ? <RecipeModal title={recipe.title} extendedIngredients={recipe.extendedIngredients} analyzedInstructions={recipe.analyzedInstructions} servings={recipe.servings} cookingMinutes={recipe.cookingMinutes} email={recipe.email} summary={recipe.summary} sourceUrl={recipe.sourceUrl} image={recipe.image} onClose={() => toggleModal(index)} value={val} index={index} />:null
                                    }
                            </div>
                            ))
                        ):(
                            <div>
                                <h2>No recipes found</h2>
                            </div>
                        )
                    }
                </div>
           </div>
        </>
    );
}

export default Recipes1;
