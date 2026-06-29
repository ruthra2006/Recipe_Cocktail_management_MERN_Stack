import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
   
    const navigate = useNavigate()

    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")


    async function handlesubmit(e) {
       e.preventDefault();

       try{

        const response = await axios.post(
            "http://localhost:3000/auth/login",
            {
               
                email,
                password

            }

        );

        localStorage.setItem("token",response.data.token)



        navigate("/home")

       
        setemail("")
        setpassword("")
       console.log("done")

       }catch(err){
alert(err.response.data.message)
       }
        
    }

    console.log(name,password)

  return (
   <>
   
   <h2>Login</h2>


   <form onSubmit={handlesubmit}>

  
   <input onChange={(e)=>setemail(e.target.value)} value={email} placeholder='enter ur email'/>

   <input onChange={(e)=>setpassword(e.target.value)} value={password} placeholder='enter ur pswrd' type='password'/>

   <button type='submit'>
    submit
   </button>
   </form>
   <p className="switch-page">

    Don't have an account?

    <Link to="/register"> Register</Link>

   </p>
 
   
   
   </>
  )
}

export default Login
