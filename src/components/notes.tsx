import { Link } from 'react-router-dom';

import style from './styles/notes.module.scss';

import { FiEdit } from 'react-icons/fi';

interface noteModel {
  id: string | undefined;
  title: string | undefined;
  bgColor: string | undefined;
  lastEdit: string | undefined;
}

const Notes: React.FC<noteModel> = ({ id, title, bgColor, lastEdit }) => {
  return (
    <div
      className={style.main}
      style={{ backgroundColor: bgColor }}
    >
      <Link to={`/${id}`}>
        {title ? <h3>{title}</h3> : <h3>Untitled Note</h3>}
      </Link>

      <div className={style.main__details}>
        <div>{lastEdit}</div>
        <Link
          to={`/edit/${id}`}
          style={{ color: bgColor === '#fff' ? '#000' : '#fff' }}
        >
          <FiEdit />
        </Link>
      </div>
    </div>
  );
};

export default Notes;
