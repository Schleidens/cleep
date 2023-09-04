import React, { useState } from "react";
import style from "./styles/newnotemodal.module.scss"

import { MdClose, MdOutlineCheckCircleOutline } from "react-icons/md"

interface Modal {
    displayModalValue: string,
    toggleModal: () => void
}

const NewNoteModal: React.FC<Modal> = ({displayModalValue, toggleModal}) => {
    const radioColorList = ["#fec871", "#fd9a71", "#e3ed8e", "#b490fb", "#00d3fe",]

    const [selectedColor, setSelectedColor] = useState<string>("#fff");

    const handleRadioChange = (event: { target: { value: React.SetStateAction<string>; }; }): void => {
    setSelectedColor(event.target.value);
  };


    return (
        <div className={style.main} style={{display: displayModalValue}}>
            <div className={style.main__modal} style={{backgroundColor: selectedColor}}>

                {/* CLOSE BTN */}
                <button onClick={toggleModal} className={style.exit__btn}><MdClose /></button>

                <div className={style.form}>
                    {/* INPUT FORM */}
                        <input type="text" placeholder="Title" />
                        <textarea placeholder="Write a new note...."></textarea>
                    {/* END */}

                    {/* FOOTER */}
                    <div className={style.footer}>
                        {/* RADIO BTN LIST */}
                        <div className={style.radios}>
                            {radioColorList.map((color, index)=>(
                                <div key={index}>
                                    <input type="radio" name="colorValue" id={color} value={color} checked={selectedColor === color} onChange={handleRadioChange} />
                                    <label  htmlFor={color}>
                                        <div className={style.ball} style={{backgroundColor: color}}>
                                            <span className={style.check}>
                                                <MdOutlineCheckCircleOutline />
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {/* END RADIO */}

                        {/* SAVE BTN */}
                        <div className={style.save}>
                            <button>SAVE</button>
                        </div>
                        {/* END OF SAVE BTN */}
                    </div>
                    {/* END */}
                </div>
            </div>
        </div>
    )
}

export default NewNoteModal;