import { get } from "http"

export const useLocalStorage = (key: string,key2:string,key3:string) => {  
    const setItem = (value: unknown,value2:unknown) => {
       if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(key,JSON.stringify(value))
                window.localStorage.setItem(key2,JSON.stringify(value2))
         
            }
            catch(err) {
                console.log(err)
            }
       }
    }

    const setItem2 = (value: unknown) => {
        if (typeof window !== 'undefined') {
             try {
                 window.localStorage.setItem(key3,JSON.stringify(value))
             }
                catch(err) {
                    console.log(err)
                }
            }
    }

    // const setItem3 = (value: unknown) => {
    //     if (typeof window !== 'undefined') {
    //          try {
    //              window.localStorage.setItem(keyOpen,JSON.stringify(value))
    //          }
    //             catch(err) {
    //                 console.log(err)
    //             }
    //         }
    // }

    const getItem = () => {
        if (typeof window !== 'undefined') {
            try {
                const item = window.localStorage.getItem(key)
                return item ? JSON.parse(item) : undefined
            }
            catch(err) {
                console.log(err)
            }
        }
    }


    const getItem2 = () => {
        if (typeof window !== 'undefined') {
            try {
                const item = window.localStorage.getItem(key2)
                return item ? JSON.parse(item) : undefined
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    const getItem3 = () => {
        if (typeof window !== 'undefined') {
            try {
                const item = window.localStorage.getItem(key3)
                return item ? JSON.parse(item) : undefined
            }
            catch(err) {
                console.log(err)
            }
        }
    }


    const removeItem = () => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.removeItem(key)
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    const removeItem2 = () => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.removeItem(key2)
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    const removeItem3 = () => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.removeItem(key3)
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    return {setItem,getItem,getItem2,removeItem,removeItem2,getItem3,removeItem3,setItem2}
}