"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RecipeModal from "./RecipeModal";
import { useRouter } from "next/navigation";


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
function ProfileRecipes() {


    const [recipes, setRecipes] = useState<Recipes[]>([]);


    const Router = useRouter();
    
    const pathname = usePathname();

    const lastSegment:string = pathname.split('/').filter(Boolean).pop() || '';

 

    const [email, setEmail] = useState<string>('');

    const [isOpen, setIsOpen] = useState(false);

    const [isOpenTime, setIsOpenTime] = useState(false);

    const [val2,setVal2] = useState<number>(0);

    const [val,setVal] = useState<number>(0)

    const toggleModal = (index:number) => {
        setVal(index)
        setIsOpen(prevState => !prevState);
    }

    const toggleModal2 = (index:number) => {
        setVal2(index)
        setIsOpenTime(prevState => !prevState);
    }


    useEffect(() => {
        setEmail(lastSegment);
    }, [lastSegment]);


    const goBack = () => {
        Router.push('/Recipes');
    }



    useEffect(() => {




        const fetchRecipes = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/recipes', {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error("No recipes found");
                }

                const data = await res.json();

                console.log(data.topics)


                setRecipes(data.topics.filter((element:Recipes) => {
                    console.log(element.email)
                    const lastSegment:string = pathname.split('/').filter(Boolean).pop() || ''
                    console.log(lastSegment)
                    return element.email === lastSegment;
                }));


            }

            catch (error) {
                console.log(error);
            }
        }

        fetchRecipes();
    }, []);


    return (
        <div>
            <h1 className="text-4xl text-center font-bold">My Recipes</h1>
            <div className="flex flex-row flex-wrap justify-center">
                {recipes.map((recipe: Recipes, index: number) => {
                    return (
                        <div key={index} className="m-4 p-4 border-2 border-gray-300 rounded-lg">
                            <img src={recipe.image} alt={recipe.title} className="w-64 h-64 object-cover" />
                            <h2 className="text-xl font-bold">{recipe.title}</h2>
                            <button onClick={() => toggleModal(index)}>More</button>

                            {
                                isOpen && index === val ? <RecipeModal title={recipe.title} extendedIngredients={recipe.extendedIngredients} analyzedInstructions={recipe.analyzedInstructions} servings={recipe.servings} cookingMinutes={recipe.cookingMinutes} email={recipe.email} summary={recipe.summary} sourceUrl={recipe.sourceUrl} image={recipe.image} onClose={() => toggleModal(index)} value={val} index={index} />:null
                            }
                         
                        </div>
                    );
                })}
            </div>

            <button onClick={goBack}>Back</button>
        </div>
    );
}

export default ProfileRecipes;