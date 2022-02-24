import create from "zustand";

export const useUserStore = create(set => ({
  username: "",
  setUsername: username => set(state => ({ ...state, username }))
}));