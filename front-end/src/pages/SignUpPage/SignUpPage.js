import LoginHeader from "../../components/LoginHeader/LoginHeader"
import SignUp from "../../components/SignUp"
import "./SignUpPage.css"


export default function SignupPage(){
    return(
        <div class="wrap">
            <LoginHeader
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/Login"
            />
            <SignUp/>
        </div>
    )
}