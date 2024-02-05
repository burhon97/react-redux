import { useEffect, useState } from "react";
import { Post, RootState } from "../types/types";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addPost, editPost } from "../redux/reducer";
import "./form.style.css";

const defaultInput = {
  id: uuid(),
  image: "",
  name: "",
  surname: "",
  date: "",
  numberphone: "",
  statusEdit: false,
};

export function Form() {
  const [input, setInput] = useState<Post>(defaultInput);
  const [statusBtn, setStatusBtn] = useState<boolean>(false);

  const posts = useSelector((state: RootState) => state.todoList.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const foundEditPost = posts.find((post) => post.statusEdit === true);
    if (foundEditPost) {
      setStatusBtn(true);
      setInput(foundEditPost);
    }
  }, [posts]);

  function onChangeImage(file: React.ChangeEvent<HTMLInputElement>): void {
    if (!file.target.files) {
      throw new Error("Missing image file");
    }

    const readerImage = new FileReader();
    readerImage.onload = (file) => {
      if (!file.target) {
        throw new Error("Missing image file");
      }

      if (!file.target.result) {
        throw new Error("Missing image file");
      }

      const img = file.target.result;
      setInput((prev) => ({ ...prev, image: img as string }));
    };
    readerImage.readAsDataURL(file.target.files[0]);
  }

  function onChangeName(name: React.ChangeEvent<HTMLInputElement>): void {
    setInput((prev) => ({ ...prev, name: name.target.value }));
  }

  function onChangeSurname(surname: React.ChangeEvent<HTMLInputElement>): void {
    setInput((prev) => ({ ...prev, surname: surname.target.value }));
  }

  function onChangeDate(date: React.ChangeEvent<HTMLInputElement>): void {
    setInput((prev) => ({ ...prev, date: date.target.value }));
  }

  function onChangeNumberphone(
    numberphone: React.ChangeEvent<HTMLInputElement>
  ): void {
    setInput((prev) => ({
      ...prev,
      numberphone: numberphone.target.valueAsNumber.toString(),
    }));
  }

  return (
    <div className="form">
      <h1 className="form_header">Form</h1>

      <div
        className="form_inputs"
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <input type="file" className="form_input" onChange={onChangeImage} />
        <input
          type="text"
          value={input.name}
          placeholder="Name"
          className="form_input"
          onChange={onChangeName}
        />
        <input
          type="text"
          value={input.surname}
          placeholder="Surname"
          className="form_input"
          onChange={onChangeSurname}
        />
        <input
          type="date"
          value={input.date}
          placeholder="Date of your birthday"
          className="form_input"
          onChange={onChangeDate}
        />
        <input
          type="number"
          value={input.numberphone}
          placeholder="Number phone"
          className="form_input"
          onChange={onChangeNumberphone}
        />

        <button
          className="form_btn"
          onClick={() => {
            if (!statusBtn) {
              dispatch(addPost(input));
            } else {
              dispatch(editPost(input));
            }
            navigate("/");
          }}
        >
          {!statusBtn ? "Add" : "Edit"}
        </button>
      </div>
    </div>
  );
}
