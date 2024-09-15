import connectToDB from "@/app/libs/mongodb";
import Recipes from "@/app/models/recipeSchema";
import { NextResponse } from "next/server";



export async function POST(request:Request){
    const {extendedIngredients,analyzedInstructions,title,summary,cookingMinutes,servings,image,sourceUrl,email} = await request.json()   
    await connectToDB()

    await Recipes.create({extendedIngredients,analyzedInstructions,title,summary,cookingMinutes,servings,image,sourceUrl,email})


    return NextResponse.json({message:"complete",status:201})
}


export async function GET() {
    await connectToDB()
    const topics = await Recipes.find()
    return NextResponse.json({topics})
}