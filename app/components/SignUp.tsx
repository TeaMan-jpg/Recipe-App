"use client";
import { use, useContext, useEffect, useState } from "react"

import { TypeExContext } from "../context/RecipeContext"
import { useLocalStorage } from "../hooks/useLocalStorage";
import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface Users {
    email:string,
    password:string,
    image:string
}


function SignUp() {
    
    const {isSignedIn,setSignedIn,email,setEmail,password,setPassword} = useContext(TypeExContext)


    const [image,setImage] = useState('')

    const {setItem,setItem2} = useLocalStorage('email','password','isSignedIn')

    const Router = useRouter()

    const [users,setUsers] = useState<Users[]>([])

    const [userExists,setUsersExists] = useState<boolean>(false)
    const [invalidPass,setInvalidPass] = useState<boolean>(false)
    const [invalidUser,setInvalidUser] = useState<boolean>(false)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch('https://randomuser.me/api/');
    
                if (!res.ok){
                    throw new Error("No user found")
                }
                const data = await res.json()
                const imageUrl = data.results[0].picture.large;

                setImage(imageUrl)
                
            }
            catch (error){
                console.log(error)
            }
        }

        fetchImage()
    },[])

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    function validatePassword(password: string) {
        return passwordRegex.test(password);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/topics',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

                if (!res.ok){
                    throw new Error("No user found")
                }

                const data = await res.json()
                setUsers(data.topics)
            }
            catch (error){
                console.log(error)
            }
            
        }

        fetchUsers()
    },[])
    

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async (e:React.FormEvent) => {
        e.preventDefault()

       let imageUrl = ''

       if (users.length > 0){
              users.forEach((element:Users) => {
                if (element.email === email){
                     setUsersExists(true)
                     return
                }
                else {
                    setUsersExists(false)
                }
              })
       }

       if (password.length === 0){
           setInvalidPass(true)
           return
       }
       if (email.length === 0){
           setInvalidUser(true)
           return
       }

       if (validatePassword(password) === false){

            setInvalidPass(true)
            return

       }


        try {
            const res = await fetch('https://randomuser.me/api/');

            if (!res.ok) {
                throw new Error('Failed to fetch random user');
            }

            const data = await res.json();

            imageUrl = data.results[0].picture.large
        } catch (error) {
            console.error('Error fetching random user:', error);
        }

        

        try {

            
            const res = await fetch('http://localhost:3000/api/topics',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password,image:imageUrl})
            })

            if (!res.ok){
                throw new Error("No topic found")
            }


            const data = await res.json()

            console.log(data)

            setSignedIn(true)
            setItem(email,password)
            setItem2(true)

           
            Router.push('/addRecipeURL')

       
        }
        catch (error){
            console.log(error)
        }

       

        
    }
    return (
        <>
        <div className="signUp">
            <h2 className="m-4">Sign up</h2>
            <form action="" onSubmit={handleSignUp} className="flex flex-col w-96 m-4">
                <label htmlFor="">Email</label>
                <input type="text" className="text-black" onChange={handleEmail} value={email} />
                <label htmlFor="">Password</label>
                <input type="text" className="text-black" onChange={handlePassword} value={password}/>
                <button type="submit">Sign up</button>
            </form>
            {
                userExists && <h5 className="m-4">User already exists</h5>
            }

            {
                invalidPass && <h5 className="m-4">Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character</h5>
            }
            <h5 className="m-4">
                    Already have an account? Click <Link href="/Login"className="underline">here</Link>
            </h5>
        </div>
        </>
    )
}

export default SignUp

