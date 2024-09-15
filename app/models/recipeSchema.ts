import mongoose,{mongo, Schema} from "mongoose";
import { Tulpen_One } from "next/font/google";
import { TypeExContext } from "../context/RecipeContext";
import { use, useContext } from "react";


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

const recipeSchema = new Schema<Recipe>({
    extendedIngredients:Array,
    title:String,
    summary:String,
    cookingMinutes:String,
    servings:Number,
    analyzedInstructions: Array,
    image:String,
    sourceUrl:String,
    email:String
}
,{
    timestamps:true
})


const Recipes = mongoose.models.Recipes || mongoose.model("Recipes",recipeSchema)

export default Recipes