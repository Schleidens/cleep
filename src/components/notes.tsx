import style from "./styles/notes.module.scss"

import { FiEdit } from "react-icons/fi"

const Notes: React.FC = () => {
    return(
        <div className={style.main}>
            <h3>I'm the title of this doc</h3>

            <div className={style.main__details}>
                <div>Sept, 01, 2023</div>
                <button><FiEdit /></button>
            </div>
        </div>
    )
}

export default Notes;