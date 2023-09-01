import style from "./styles/loader.module.scss"

const Loader: React.FC = () => {
    return(
        <div className={style.main}>
            <div className={style.main__dot}></div>
            <div className={style.main__dot}></div>
            <div className={style.main__dot}></div>
            <div className={style.main__dot}></div>
            <div className={style.main__dot}></div>
        </div>
    )
}

export default Loader;