import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import style from "../styles/notepage.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

import NotePageSkeleton from "../components/notePageSkeleton";

import { getSingleNote } from "../firebase/notes";

import { singleNoteDataModel } from "../ts/noteDataModel";
import { formatDate } from "../ts/formatDate";

const NotePage: React.FC = () => {
  const { id } = useParams();

  //loading statement
  const [loading, setLoading] = useState<boolean>(false);
  const [note, setNote] = useState<singleNoteDataModel | null>(null);
  const fetchSingleNote = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const note = await getSingleNote(id);
      setNote(note);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log("can't fetch data (:");
      }
    }
  }, [id]);

  useEffect(() => {
    fetchSingleNote();
  }, [fetchSingleNote]);
  return (
    <div className={style.main}>
      {!loading && (
        <Link to="/" className={style.back}>
          <IoMdArrowRoundBack />
        </Link>
      )}
      {loading ? (
        <NotePageSkeleton />
      ) : (
        <div
          className={style.main__note}
          style={{ backgroundColor: note?.color }}
        >
          <h1>{note?.title}</h1>
          <div className={style.content}>{note?.content}</div>
          <div className={style.footer}>
            {note && <span>{formatDate(note.lastEdit)}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
