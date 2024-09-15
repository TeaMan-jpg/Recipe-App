"use client";
import { use, useContext, useState } from "react"
import { TypeExContext } from "../context/RecipeContext"
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Link from "next/link";

function Login() {

    const Router = useRouter()

    const {isSignedIn,setSignedIn,email,setEmail,password,setPassword} = useContext(TypeExContext)

    const {setItem,setItem2} = useLocalStorage('email','password','isSignedIn')

   

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }


    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault()


        try {
            const res = await fetch('http://localhost:3000/api/topics',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })

            if (!res.ok){
                throw new Error("No topic found")
            }

            const data = await res.json()


            console.log(data)

            console.log(email)

            data.topics.forEach((element:any) => {
                if (element.email === email && element.password === password){
                    console.log("logged in")
                    setSignedIn(prevState => true)
                    setItem(email,password)
                    setItem2(true)
                    Router.push('/addRecipeURL')
                  
                }
            })

            
        }
        catch (error){
            console.log(error)
        }


        
    }
    return (
        <>
       <div className="Login">
            <h2 className="m-4">Login</h2>
            <form action="" onSubmit={handleLogin} className="flex flex-col w-96 m-4">
                <label htmlFor="">Email</label>
                <input type="text" onChange={handleEmail} value={email}/>
                <label htmlFor="">Password</label>
                <input type="text" onChange={handlePassword} value={password}/>
                <button type="submit">Login</button>
            </form>
            <h5 className="m-4">
                Don't have an account? Click <Link href="/signUp"className="underline">here</Link>
            </h5>
       </div>
        </>
    )
}

export default Login