import connectToDB from "@/app/libs/mongodb";
import Meals from "@/app/models/mealSchema";

import { NextResponse } from "next/server";



export async function POST(request:Request){
    const {email,meal,dates} = await request.json()   
    await connectToDB()

    await Meals.create({email,meal,dates})


    return NextResponse.json({message:"complete",status:201})
}


export async function GET() {
    await connectToDB()
    const topics = await Meals.find()
    return NextResponse.json({topics})
}