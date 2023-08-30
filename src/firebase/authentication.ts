import { auth } from "./main";
import { GoogleAuthProvider, UserCredential, signInWithPopup, signOut } from "firebase/auth";

export const handleSignInWithGoogle = async (): Promise<UserCredential> => {
  const googleAuthProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleAuthProvider);
};

export const handleSignOut = async (): Promise<void> => {
  return await signOut(auth)
}