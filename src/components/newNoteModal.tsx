import React, { useState } from "react";
import style from "./styles/newnotemodal.module.scss";

import { MdClose, MdOutlineCheckCircleOutline } from "react-icons/md";

import { useAuth } from "../authContext/context";

import { createNotes } from "../firebase/notes";
import { Timestamp } from "firebase/firestore";

import { noteDataModel } from "../ts/noteDataModel";

interface Modal {
  displayModalValue: string;
  toggleModal: () => void;
  updateData: () => void;
}

const NewNoteModal: React.FC<Modal> = ({
  displayModalValue,
  toggleModal,
  updateData,
}) => {
  const radioColorList = [
    "#fec871",
    "#fd9a71",
    "#e3ed8e",
    "#b490fb",
    "#00d3fe",
  ];

  const [selectedColor, setSelectedColor] = useState<string>("#fff");

  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }): void => {
    setSelectedColor(event.target.value);
  };

  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  //get the current user from context
  const { user } = useAuth();

  const lastEdit = Timestamp.now().toDate().toISOString();

  // list of all data
  const noteData: noteDataModel = {
    id: "",
    title,
    content,
    color: selectedColor,
    lastEdit: lastEdit,
    userId: user?.uid,
  };

  //clear the value of input also radio color
  const clearInputValue = (): void => {
    setTitle("");
    setContent("");
    setSelectedColor("#fff");
  };

  //disable the modal state
  const [disableModal, setDisableModal] = useState<boolean>(false);

  // create new note using firebase firestore with a custom function in notes.ts
  const handleCreateNewNote = async (): Promise<void> => {
    try {
      //disable the modal when sending data to the server
      setDisableModal(true);

      //send the data
      await createNotes(noteData);

      //call the toggleModal func from the parent component to unDisplay the modal
      toggleModal();

      //clear the input value
      clearInputValue();

      //update data in homepage by recalling the fetchNote function
      updateData();

      /* re-enable the modal again,
      imagine user wanna add new notes no need to refresh the entire state */
      setDisableModal(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log("wrong :)");
      }
    }
  };

  return (
    <div
      className={` ${style.main} ${disableModal ? style.disable : ""}`}
      style={{ display: displayModalValue }}
    >
      <div
        className={style.main__modal}
        style={{ backgroundColor: selectedColor }}
      >
        {/* CLOSE BTN */}
        <button onClick={toggleModal} className={style.exit__btn}>
          <MdClose />
        </button>

        <div className={style.form}>
          {/* INPUT FORM */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write a new note...."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {/* END */}

          {/* FOOTER */}
          <div className={style.footer}>
            {/* RADIO BTN LIST */}
            <div className={style.radios}>
              {radioColorList.map((color, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="colorValue"
                    id={color}
                    value={color}
                    checked={selectedColor === color}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor={color}>
                    <div
                      className={style.ball}
                      style={{ backgroundColor: color }}
                    >
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
              <button onClick={handleCreateNewNote}>SAVE</button>
            </div>
            {/* END OF SAVE BTN */}
          </div>
          {/* END */}
        </div>
      </div>
    </div>
  );
};

export default NewNoteModal;
