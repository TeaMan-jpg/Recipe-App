"use client"
import SignUp from "../components/SignUp";
import { TypeExProvider } from "../context/RecipeContext";



function SignUpPage() {
    return (
        <TypeExProvider>
             <div>
                <SignUp></SignUp>
            </div>
        </TypeExProvider>
       
    );
}

export default SignUpPage;