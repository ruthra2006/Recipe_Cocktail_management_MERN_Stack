import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Register = () => {
    const navigate2 = useNavigate()
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")


    async function handlesubmit(e) {
       e.preventDefault();

       try{

        const response = await axios.post(
            "http://localhost:3000/auth/register",
            {
                name,
                email,
                password

            }

        );

        
        setname("");
        setemail("")
        setpassword("")
        console.log("done")
        navigate2("/")

       }catch(err){
alert(err.response.data.message)
       }
        
    }

    console.log(name,password)

  return (
   <>
   
   <h2>Register</h2>


   <form onSubmit={handlesubmit}>

    <input onChange={(e)=>setname(e.target.value)} value={name} placeholder='enter ur name' />

   <input onChange={(e)=>setemail(e.target.value)} value={email} placeholder='enter ur email'/>

   <input onChange={(e)=>setpassword(e.target.value)} value={password} placeholder='enter ur pswrd' type='password'/>

   <button type='submit'>
    submit
   </button>
   </form>
   <p className="switch-page">
        Already have an account?

        <Link to="/"> Login</Link>

    </p>

 
   
   
   </>
  )
}

export default Register
