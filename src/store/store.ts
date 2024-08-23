import { create } from "zustand";
interface OtpStoreTypes {
  email: string;
  setEmail: (email: string) => void;
}
interface TokenStore {
  token: string;
  setToken: (token: string) => void;
}

interface FirstCommentStore {
  comment: string;
  setComment: (comment: string) => void;
}
export const useStore = create<OtpStoreTypes>(set => ({
  email: "",
  setEmail: email => set(state => ({ ...state, email }))
}));
export const useTokenStore = create<TokenStore>(set => ({
  token: "",
  setToken: token => set(state => ({ ...state, token }))
}));

//First Comment on User Comment

export const useFirstCommentStore = create<FirstCommentStore>(set => ({
  comment: "",
  setComment: comment => set(state => ({ ...state, comment }))
}));
