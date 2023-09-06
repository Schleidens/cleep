import style from "./styles/notes.module.scss";

import { FiEdit } from "react-icons/fi";

interface noteModel {
  title: string | undefined;
  bgColor: string | undefined;
  lastEdit: string | undefined;
}

const Notes: React.FC<noteModel> = ({ title, bgColor, lastEdit }) => {
  return (
    <div className={style.main} style={{ backgroundColor: bgColor }}>
      <h3>{title}</h3>

      <div className={style.main__details}>
        <div>{lastEdit}</div>
        <button>
          <FiEdit />
        </button>
      </div>
    </div>
  );
};

export default Notes;
