import { useState } from 'react';
import Axios from 'axios';
import Input from "../Input/Input";
import { signupFields } from "../../constants/formFields"
import FormAction from "../FormAction";
import { Link, useNavigate } from "react-router-dom";


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function SignUp(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});
  const navigate = useNavigate()


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount2()
  }
  const createAccount2=()=>{
    
    const username = signupState["username"];
    const password = signupState["password"];
    const email = signupState["email-address"];
    Axios.post("http://localhost:8000/auth/SignUp", {
      username,
      email,
      password,
    }).then(response => {
        if(response.data.status) {
            navigate('/Login2')
        }
    }).catch(err => {
        console.log(err)
    })
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    Axios.post(
      'http://localhost:4000/auth/signup' , {signupState}
    ).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}