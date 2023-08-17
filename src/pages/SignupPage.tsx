import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/main";
import { handleSignInWithGoogle } from "../firebase/authentication"


function SignupPage() {

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    const uid = user.displayName;
    console.log(uid);
  } else {
    // User is signed out
    console.log("no user");
  }
});
  }, [])

  return (
    <>
      <button onClick={handleSignInWithGoogle}>Google</button>
    </>
  )
}

export default SignupPage
