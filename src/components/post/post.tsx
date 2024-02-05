import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../types/types";
import { deletePost, editStatusPost } from "../redux/reducer";
import "./post.style.css";

export function Post() {
  const posts = useSelector((state: RootState) => state.todoList.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="post">
      <h1 className="post_header">Posts</h1>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post_content" key={post.id}>
              <div className="post_image">
                <img
                  src={typeof post.image === "string" ? post.image : undefined}
                  alt="No image"
                  className="image"
                />
              </div>
              <div className="post_info">
                <p>
                  Full name:{" "}
                  <b>
                    {post.name} {post.surname}
                  </b>
                </p>
                <p>
                  Phone: <b>{post.numberphone}</b>
                </p>
                <p>
                  Birth: <b>{post.date}</b>
                </p>
              </div>
              <div className="post_btns">
                <button
                  className="post_btn"
                  onClick={() => {
                    dispatch(editStatusPost({ id: post.id }));
                    navigate("/add-post");
                  }}
                >
                  Edit
                </button>
                <button
                  className="post_btn"
                  onClick={() => dispatch(deletePost({ id: post.id }))}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
