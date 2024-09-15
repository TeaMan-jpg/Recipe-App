import connectToDB from "@/app/libs/mongodb";
import Topic from "@/app/models/accountSchema";

import { NextResponse } from "next/server";


export async function POST(request:Request){
    const {email,password,image} = await request.json()

    console.log(email,password,image)

    await connectToDB()
    await Topic.create({email,password,image})

    return NextResponse.json({message:"complete",status:201})

}


export async function GET() {
    await connectToDB()
    const topics = await Topic.find()
    return NextResponse.json({topics})
}