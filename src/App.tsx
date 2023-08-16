import { handleSignInWithGoogle } from "./firebase/authentication"

function App() {
  return (
    <>
      <button onClick={handleSignInWithGoogle}>Google</button>
    </>
  )
}

export default App
