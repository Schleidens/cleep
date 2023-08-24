import { Navigate } from "react-router-dom";

import { handleSignInWithGoogle } from "../firebase/authentication";

function SignupPage() {
  const isUserAuthenticated = localStorage.getItem("token");

  if (isUserAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <button onClick={handleSignInWithGoogle}>Google</button>
    </>
  );
}

export default SignupPage;
