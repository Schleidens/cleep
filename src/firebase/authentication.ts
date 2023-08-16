import { auth } from "./main";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const handleSignInWithGoogle = async () => {
  const googleAuthProvider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (e) {
    console.error(e);
  }
};