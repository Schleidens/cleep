import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { handleSignOut } from "../firebase/authentication";
import { getNotes } from "../firebase/notes";

import style from "../styles/homepage.module.scss";

import Notes from "../components/notes";
import NewNoteModal from "../components/newNoteModal";

import { useAuth } from "../authContext/context";

import { IoIosDocument } from "react-icons/io";
import { BiLogOutCircle, BiPlusCircle, BiPlus } from "react-icons/bi";

import { noteDataModel } from "../ts/noteDataModel";

const HomePage: React.FC = () => {
  //state for the modal
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  //toggle the model function
  const toggleModal = useCallback((): void => {
    setDisplayModal((prev) => !prev);
  }, []);

  //show an error message when errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //signOut user function with export func from authentication
  const signOutUser = async (): Promise<void> => {
    try {
      await handleSignOut();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error happened (: try again");
      }
    }
  };

  //function to format date notes from firebase timestamp
  const formatDate = (incomingDate: string | number | Date) => {
    return new Date(incomingDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  //notes array
  const [notes, setNotes] = useState<noteDataModel[] | null>([]);
  //get the User info from context
  const { user } = useAuth();
  //fetch the notes with useCallback to prevent re-render infinite
  const fetchNotes = useCallback(async (): Promise<void> => {
    try {
      const notes = await getNotes(user?.uid);
      setNotes(notes);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log("Wrong :)");
      }
    }
  }, [user?.uid]);
  //call fetchNotes on component mounted
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className={style.main}>
      <div className={style.main__sidebar}>
        <div>
          <div className={style.logo}>
            <Link to="/">
              <IoIosDocument />
            </Link>
          </div>

          <div>
            <button onClick={toggleModal} className={style.plus}>
              <BiPlusCircle />
            </button>
          </div>
        </div>

        <div>
          <button onClick={signOutUser} className={style.logout}>
            <BiLogOutCircle />
          </button>
        </div>
      </div>

      <NewNoteModal
        toggleModal={toggleModal}
        displayModalValue={displayModal ? "flex" : "none"}
      />

      <div className={style.main__box}>
        <div className={style.brand}>
          <h1>CLEEP</h1>

          <button onClick={signOutUser} className={style.brand__logout}>
            <BiLogOutCircle />
          </button>
        </div>

        <div className={style.notes}>
          <div className={style.header}>
            <h2>Notes</h2>
          </div>

          <div className={style.notes__box}>
            {notes?.map((note) => (
              <Notes
                key={note.id}
                title={note.title}
                bgColor={note.color}
                lastEdit={formatDate(note.lastEdit)}
              />
            ))}
          </div>

          <div className={style.notes__new}>
            <button onClick={toggleModal} className={style.plus}>
              <BiPlus />
            </button>
          </div>
        </div>
      </div>

      <div>{errorMessage}</div>
    </div>
  );
};

export default HomePage;
