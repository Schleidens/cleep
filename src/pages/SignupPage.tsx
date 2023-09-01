import { useState } from "react";
import { handleSignInWithGoogle } from "../firebase/authentication";

import style from "../styles/signup.module.scss"

import { FcGoogle } from "react-icons/fc"

const SignupPage: React.FC = () => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSignIn = async (): Promise<void> => {
    try {
      setIsDisabled(true)
      await handleSignInWithGoogle();
    } catch (error) {
      if(error instanceof Error){
        setErrorMessage(error.message)
      }else{
        setErrorMessage("Something's wrong try again :)")
      }

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } finally{
      setIsDisabled(false)
    }
  }

  return (
    <>
      <div className={style.main}>
        <div onClick={handleSignIn} className={style.main__button} style={isDisabled ? {opacity: '0.5', pointerEvents: 'none'} : {}}>
          {!isDisabled && <div><FcGoogle /> <div>SignUp with Google</div></div>}
          {isDisabled && <div>SignUp.....</div>}
        </div>
        {errorMessage && <div className={style.main__error}>{errorMessage}</div>}
      </div>
    </>
  );
}

export default SignupPage;
