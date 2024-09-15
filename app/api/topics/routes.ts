import connectToDB from "@/app/libs/mongodb"
import Topic from "@/app/models/topic"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    const {title,description} = await request.json()

    console.log("cokck")

    await connectToDB()
    await Topic.create({title,description})

    return NextResponse.json({message:"complete",status:201})

}

export async function GET() {
    await connectToDB()
    const topics = await Topic.find()
    return NextResponse.json({topics})
}

export async function getAllEntries() {
    await connectToDB()
    const topics = await Topic.find({}, '_id');

    // Extract the IDs into an array
    const ids = topics.map(topic => topic._id);

    // Return the list of IDs
    return NextResponse.json({topics})
}

export async function DELETE(request:Request) {
   

    // const url = new URL(request.url); // Extract the URL from the request
    // const id = url.pathname.split('/').pop(); // Extract the ID from the URL path
    // const{_id } = request.query

    const url = new URL(request.url);
    const id = url.searchParams.get('_id');

    
    await connectToDB()
    await Topic.findByIdAndDelete(id)
    const topic = await Topic.findById(id);
    console.log(topic)
    return NextResponse.json({message:url,status:201,topics:topic})
    
}