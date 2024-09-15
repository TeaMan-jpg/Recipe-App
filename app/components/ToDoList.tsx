"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import "./page.css"
import { Router, useRouter } from 'next/router'

interface Task{
    _id:string,
    title:string, 
    description:string
}

function ToDoList() {



  const [tasks,setTasks] = useState<Task[]>([])
  const [task,setTask] = useState<string>('')
  const [number,setNumber] = useState<number>(0)

  const [title,setTitle] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null);


  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)

  }

  const handleTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleDescription = (event:React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const addUser = async () => {

    const res = await fetch("localhost:3000/api/topics", {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({title,description})
    })


  }


  useEffect(() => {
        const getFetch = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/topics", {
                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }
                 
                })

                if (!res.ok) {
                    throw new Error("No tasks")
                } 


                const data = await res.json()

                console.log(data.topics)

                setTasks(data.topics)
            }
            catch(err){
                console.log(err)
            }
            


        }

        getFetch()
  },[])

  const handleSubmit = async (e:React.FormEvent) => {

    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({title,description})
        })

        if (!res.ok){
            throw new Error('No post')
        }
      


    }
    catch(err){
        console.log(err)
    }

  }

  const deleteUser = async (id:string) => {

    
      
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method:"DELETE"
             
            })

            if (!res.ok) {
                throw new Error("No tasks")
            } 


            const data = await res.json()

            console.log(data)

            setTasks(tasks.filter(task => task !== data.topics));

         
    
  }
  

  const swapDown = (index: number) => {
    // Swaps the current task with the next one
    if (index < tasks.length - 1) {
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]]; // Swap the items
        setTasks(newTasks);
    }
  };

  const swapUp = (index: number) => {
    // Swaps the current task with the previous one
    if (index > 0) {
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]]; // Swap the items
        setTasks(newTasks);
    }
  };
  return (
    <>
    <div className="todo">

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Title</label>
        <input type="text" onChange={handleTitle} />
        <label htmlFor="">Description</label>
        <input type="text" onChange={handleDescription}/>
        <button type="submit">Add</button>
      </form>

      <p>{tasks.length}</p>

      <ul>

        {
          tasks.map((task,index) => (
            <>
            <li key={index} className='task'>
              <div className="item">
                <p>{task.title}</p>
                <p>{task.description}</p>
                <button onClick={() => deleteUser(task._id)}>Delete</button>
              </div>
            </li>
            </>
          ))
        }

      </ul>

    </div>
    </>
  )
}

export default ToDoList