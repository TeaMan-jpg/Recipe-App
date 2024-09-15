import './RecipeModal.css'

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

function RecipeModal({summary,extendedIngredients,analyzedInstructions,servings,value,cookingMinutes,sourceUrl,title,image,email,index,onClose}:({summary:string,extendedIngredients:Ingredient[],analyzedInstructions:Instruction[],servings:Number,cookingMinutes:String,sourceUrl:String,title:String,image:string,email:string,value:number,index:number, onClose: () => void})) {
    console.log(`instructed: ${analyzedInstructions}`)


    function trimAfterPhrase(text:string, phrase:string) {
        // Check if the phrase exists in the text
        const index = text.indexOf(phrase);
        if (index !== -1) {
            // Return the text up to the phrase
            return text.substring(0, index);
        }
        return text; // Return the original text if phrase is not found
    }
    
    function convertTextToHtml(text: string) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        return trimAfterPhrase(tempDiv.innerText,"If you") || '';
    }

   
    
    return (
        <div className="modal"> 
            <div className="overlay">
                <div className="modalbox text-sm">
                        
                    <h3>{title}</h3>
                    <img src={image === "flour.png" ? "https://www.foodista.com/sites/default/files/styles/recype/public/DSC01604.jpg" : image} alt="" />
                    <h4 className='my-3'>Summary</h4>
                    <p>{convertTextToHtml(summary)}</p>
                    <h4 className='my-3'>Ingredients</h4>
                    {
                        extendedIngredients.map((ingredient, index) => {
                            return (
                                <p key={index} className='flex '>
                                    <p>{index + 1}.</p>
                                    <p className='ml-1'>{ingredient.name}</p>
                                </p>
                            )
                        })
                    }
                    <h4 className='my-3'>
                        <p>Instructions</p>
                        <p>{image}</p>
                    </h4>
                    {
                        analyzedInstructions.map((instruction, index) => {
                            return (
                                <div className="step" key={index}>
                                    <h4>{instruction.name}</h4>
                                    {
                                        instruction.steps.length > 0 ? (
                                            instruction.steps.map((step, index) => {
                                                return (
                                                    <div key={index} className='flex'>
                                                        <p>{index + 1}.</p>
                                                        <p className='ml-1'>{step.step}</p>
                                                    </div>
                                                )
                                            })
                                        )
                                        : <h2>No instructions available</h2>
                                    }
                                </div>
                            )
                        })
                    }

                    <h4 className='my-3'>Miscellaneous</h4>
                
                    <p>Servings: {servings.toString()}</p>
                
                    {
                           cookingMinutes === null ? "-" :  cookingMinutes.includes("min") ? <h6 className="">Cooking Time: {cookingMinutes}</h6> : <h6 className="">Cooking Time: {cookingMinutes} min</h6>
                    }
                   
                    <p>Source: {sourceUrl}</p>
                    

                    <button onClick={onClose}>Close</button>
                </div>
            </div>
            
        </div>
    )
}

export default RecipeModal