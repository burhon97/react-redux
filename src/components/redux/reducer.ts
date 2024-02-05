import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, Post } from "../types/types";
import { v4 as uuid } from "uuid";

const initialState: InitialState = {
  posts: [],
};

const reducerSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push({ ...action.payload, id: uuid() });
    },
    deletePost: (state, action: PayloadAction<{ id: string }>) => {
      const filteredPosts = state.posts.filter(
        (post) => post.id !== action.payload.id
      );
      state.posts = filteredPosts;
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const editedPost = action.payload;
      const editedPosts = state.posts.filter((post) => {
        if (post.statusEdit === true) {
          post.image = editedPost.image;
          post.name = editedPost.name;
          post.surname = editedPost.surname;
          post.date = editedPost.date;
          post.numberphone = editedPost.numberphone;
          post.statusEdit = false;
        }

        return post;
      });

      state.posts = editedPosts;
    },
    editStatusPost: (state, action: PayloadAction<{ id: string }>) => {
      const statusEditedPosts = state.posts.filter((post) => {
        if (post.id === action.payload.id) {
          post.statusEdit = true;
        } else {
          post.statusEdit = false;
        }
        return post;
      });

      state.posts = statusEditedPosts;
    },
  },
});

export const { addPost, deletePost, editPost, editStatusPost } =
  reducerSlice.actions;
export default reducerSlice.reducer;
