"use client"
import { set } from "mongoose";
import { createContext,useState } from "react";



type ContainerProps = {
    children:React.ReactNode
}

interface Recipe {
   
    extendedIngredients:object[]
    title:string,
    summary:string,
    cookingMinutes:string,
    servings:Number,
    analyzedInstructions:object[]
    image:string,
    sourceUrl:string


}

type TypeExContextType = {
    isAppearing:boolean,
    width:number,
    setIsAppearing: React.Dispatch<React.SetStateAction<boolean>>
    setWidth: React.Dispatch<React.SetStateAction<number>>
    datas:Recipe[],
    setData:React.Dispatch<React.SetStateAction<Recipe[]>>,
    isSignedIn:boolean,
    setSignedIn:React.Dispatch<React.SetStateAction<boolean>>,
    email:string,
    setEmail:React.Dispatch<React.SetStateAction<string>>
    password:string,
    setPassword:React.Dispatch<React.SetStateAction<string>>,
    image:string,
    setImage:React.Dispatch<React.SetStateAction<string>>

  
}


const TypeExContextState = {
    isAppearing:true,
    setIsAppearing:() => false,
    width:0,
    setWidth:() => 0,
    datas:[],
    setData:() => [],
    isSignedIn:false,
    setSignedIn:() => false,
    email:'',
    setEmail:() => {},
    password:'',
    setPassword:() => {},
    image:'',
    setImage:() => {}
}
const TypeExContext = createContext<TypeExContextType>(TypeExContextState)
const TypeExProvider = (props:ContainerProps) => {
    const [isAppearing,setIsAppearing] = useState<boolean>(true)
    const [width,setWidth] = useState<number>(0)
    const [datas,setData] = useState<Recipe[]>([])
    const [isSignedIn,setSignedIn] = useState<boolean>(false)
    const [email,setEmail] = useState<string>(TypeExContextState.email)
    const [password,setPassword] = useState<string>(TypeExContextState.password)
    const [image,setImage] = useState<string>(TypeExContextState.image)

  

    
    return (
        <TypeExContext.Provider value={{isAppearing,setIsAppearing,width,setWidth,datas,setData,isSignedIn,setSignedIn,email,setEmail,password,setPassword,image,setImage}}>
            {props.children}
        </TypeExContext.Provider>
    )
}

export {TypeExContext,TypeExProvider}