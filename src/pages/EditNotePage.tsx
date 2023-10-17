import React, { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import style from '../styles/editnotepage.module.scss';

import { IoMdArrowRoundBack } from 'react-icons/io';

import NotePageSkeleton from '../components/notePageSkeleton';

import { Timestamp } from 'firebase/firestore';
import { getSingleNote, updateNotes } from '../firebase/notes';
import { updateNoteDataModel } from '../ts/noteDataModel';

const EditNotePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lastEdit = Timestamp.now().toDate().toISOString();

  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string | undefined>('');

  const [updateNote, setUpdateNote] = useState<updateNoteDataModel>({
    title: '',
    content: '',
    lastEdit: lastEdit,
  });

  const fetchSingleNote = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const note = await getSingleNote(id);
      //set data for note in value and color for th BG
      setUpdateNote((prev) => ({
        ...prev,
        title: note?.title,
        content: note?.content,
      }));
      setBgColor(note?.color);

      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log("can't fetch data (:");
      }
    }
  }, [id]);

  const handleSaving = async (): Promise<void> => {
    try {
      setIsSaving(true);

      await updateNotes(id, updateNote);

      setIsSaving(false);
      navigate(`/${id}`); //redirect to the note page
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log('An error occurred while trying to update data');
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
          style={{ backgroundColor: bgColor }}
        >
          <input
            className={style.title}
            type='text'
            value={updateNote.title}
            onChange={(e) =>
              setUpdateNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            className={style.content}
            value={updateNote.content}
            onChange={(e) =>
              setUpdateNote((prev) => ({ ...prev, content: e.target.value }))
            }
          ></textarea>

          <div className={style.footer}>
            <button onClick={handleSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditNotePage;
