import LoginHeader from "../../components/LoginHeader/LoginHeader"
import Login from "../../components/Login/Login"
import "./LoginPage.css"
export default function LoginPage(){
    return(
        <div className="wrap">
             <LoginHeader
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
                <Login/>
            
        </div>
    )
}