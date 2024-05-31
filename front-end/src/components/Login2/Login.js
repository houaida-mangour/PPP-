import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import Input from "../Input/Input";
import FormAction from "../FormAction";
import FormExtra from "../FormExtra";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Axios from "axios";
let useridresponse= null;

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');


function Login() {
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }


    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();

        //navigate("/ParticipantDashboard");
    }

    const authenticateUser = () => {

        const email = loginState["email-address"];
        const password = loginState["password"];

        Axios.post("http://localhost:8000/auth/Login", {
            email,
            password,
        }).then(response => {
            console.log(response)
            if (response.data.status) {
                navigate('/')
            }
            useridresponse = response.data.userId
            console.log("this is the id", useridresponse);
        }).catch(err => {
            console.log(err)
        })
    }

    return (

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>

    )
}


export   {Login,useridresponse};