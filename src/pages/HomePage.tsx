import { useState } from "react";
import { handleSignOut } from "../firebase/authentication"

const HomePage: React.FC = () => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signOutUser = async (): Promise<void> =>{
    try {
      await handleSignOut();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      }else{
        setErrorMessage("An error happened (: try again")
      }
    }
  }

  return (
    <div>
        CLEEP

        <button onClick={signOutUser}>Sign Out</button>

        <div>
          {errorMessage}
        </div>
    </div>
  )
}

export default HomePage