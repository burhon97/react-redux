import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Post } from "./components/post/post";
import { Form } from "./components/form/form";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Link to="/" className="link">
          Post
        </Link>
        <Link to="/add-post" className="link">
          Add Post
        </Link>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/add-post" element={<Form />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
