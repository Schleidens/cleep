import React, { useCallback, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import style from '../styles/editnotepage.module.scss';

import { IoMdArrowRoundBack } from 'react-icons/io';

import NotePageSkeleton from '../components/notePageSkeleton';

import { getSingleNote } from '../firebase/notes';
import { singleNoteDataModel } from '../ts/noteDataModel';

const EditNotePage: React.FC = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

  //loading statement
  const [loading, setLoading] = useState<boolean>(false);
  //note
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
          <input
            className={style.title}
            type='text'
            name=''
            value={note?.title}
            id=''
          />
          <textarea
            className={style.content}
            name=''
            id=''
            value={note?.content}
          ></textarea>

          <div className={style.footer}>
            <button>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditNotePage;
