import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { handleSignOut } from "../firebase/authentication"

import style from "../styles/homepage.module.scss"

import Notes from "../components/notes";
import NewNoteModal from "../components/newNoteModal";

import { IoIosDocument } from "react-icons/io"
import { BiLogOutCircle, BiPlusCircle } from "react-icons/bi"

const HomePage: React.FC = () => {

  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const toggleModal = useCallback((): void =>{
    setDisplayModal((prev) => !prev)
  }, [])

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
    <div className={style.main}>
        <div className={style.main__sidebar}>
          <div>
            <div className={style.logo}>
              <Link to="/"><IoIosDocument /></Link>
            </div>

            <div>
              <button onClick={toggleModal} className={style.plus}>
                <BiPlusCircle />
              </button>
            </div>
          </div>

          <div>
            <button onClick={signOutUser} className={style.logout}><BiLogOutCircle /></button>
          </div>
        </div>

        <NewNoteModal toggleModal={toggleModal} displayModalValue={displayModal ? "flex" : "none"} />

        <div className={style.main__box}>
          <div className={style.brand}>
            <h1>
              CLEEP
            </h1>
          </div>

          <div className={style.notes}>
            <div className={style.header}><h2>Notes</h2></div>

            <div className={style.notes__box}>
              <Notes />
            </div>
          </div>
        </div>

        <div>
          {errorMessage}
        </div>
    </div>
  )
}

export default HomePage