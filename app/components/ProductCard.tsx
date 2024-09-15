"use client"

import { useState } from "react"

function ProductCard() {

    const [clicked,setClicked] = useState<boolean>(false)

    const handleClick = () => {
        setClicked(prevState => !prevState)
    }
    return (
        <>
        <div className="click" onClick={handleClick}>
            {clicked ? "Clicked":"Not Clicked"}
        </div>
        </>
    )
}

export default ProductCard