import create from "zustand";

export const useUserStore = create(set => ({
  userDetails: {
    email: "",
    id: "",
    username: ""
  },
  setUserDetails: details => set(state => ({ userDetails: details }))
}));