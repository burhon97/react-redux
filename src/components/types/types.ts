import { store } from "../redux/store";

export type Post = {
  id: string;
  image: string;
  name: string;
  surname: string;
  date: string;
  numberphone: string;
  statusEdit: boolean;
};

export type InitialState = {
  posts: Post[];
};

export type RootState = ReturnType<typeof store.getState>;

export type ApiDispatch = typeof store.dispatch;
