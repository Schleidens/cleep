import style from "./styles/notesskeleton.module.scss"

const NotesSkeleton: React.FC = () =>{
    return(
        <div className={style.main}>
            <div className={style.main__boxes}></div>
            <div className={style.main__boxes}></div>
            <div className={style.main__boxes}></div>
            <div className={style.main__boxes}></div>
            <div className={style.main__boxes}></div>
        </div>
    )
}

export default NotesSkeleton;