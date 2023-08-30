import { handleSignInWithGoogle } from "../firebase/authentication";
import { useState } from "react";

const SignupPage: React.FC = () => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (): Promise<void> => {
    try {
      await handleSignInWithGoogle();
    } catch (error) {
      if(error instanceof Error){
        setErrorMessage(error.message)
      }else{
        setErrorMessage("Something's wrong try again :)")
      }
    }
  }

  return (
    <>
      <button onClick={handleSignIn}>Google</button>

      <span>{errorMessage}</span>
    </>
  );
}

export default SignupPage;
