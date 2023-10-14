import { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import style from '../styles/notepage.module.scss';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import NotePageSkeleton from '../components/notePageSkeleton';

import { getSingleNote, deleteSingleNote } from '../firebase/notes';

import { singleNoteDataModel } from '../ts/noteDataModel';
import { formatDate } from '../ts/formatDate';

const NotePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //loading statement
  const [loading, setLoading] = useState<boolean>(false);
  //note
  const [note, setNote] = useState<singleNoteDataModel | null>(null);

  //note fetching function
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

  //delete note function
  const deleteNote = async (): Promise<void> => {
    try {
      await deleteSingleNote(id);
      //redirect to home
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log('Error while deleting note');
      }
    }
  };

  useEffect(() => {
    fetchSingleNote();
  }, [fetchSingleNote]);
  return (
    <div className={style.main}>
      {!loading && (
        <Link
          to='/'
          className={style.back}
        >
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
            {note && <span>{formatDate(note.lastEdit)}</span>}{' '}
            <span>
              <button onClick={deleteNote}>
                <MdOutlineDeleteOutline />
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
