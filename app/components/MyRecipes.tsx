"use client";
import { useContext, useEffect, useState } from "react";
import { TypeExContext } from "../context/RecipeContext";
import Recipe from "./Recipe";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import RecipeModal from "./RecipeModal";

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

function Recipes() {
    const Router = useRouter();
    const { isAppearing,setSignedIn } = useContext(TypeExContext);
    const [recipes, setRecipes] = useState<Recipes[]>([]);

    const {getItem} = useLocalStorage('email','password','isSignedIn')

    const [email,setEmail] = useState<string>(getItem())


    const [val,setVal] = useState<number>(0)


    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (index:number) => {
        setVal(index)
        setIsOpen(prevState => !prevState);
    }

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

                setRecipes(data.topics.filter((element: Recipe) => element.email === email));
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipes();
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
                            <div className="p-4" key={index}>
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
            </div>
        </>
    );
}

export default Recipes;
