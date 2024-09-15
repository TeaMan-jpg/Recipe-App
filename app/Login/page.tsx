"use client"
import Login from "../components/Login";
import { TypeExContext, TypeExProvider } from "../context/RecipeContext";



function LoginPage() {
  return (
    <TypeExProvider>
      <div>
      
        <Login></Login>
      </div>
    </TypeExProvider>
    
    
  );
}

export default LoginPage;