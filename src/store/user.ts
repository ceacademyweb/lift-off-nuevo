import {create} from "zustand";
import {persist, createJSONStorage } from "zustand/middleware";

type State = {
  user: any;
  token: string;
  isAdmin: boolean;
  isAuth: boolean;
}

type Actions = {
  setUser: (user: object) => void;
  setToken: (token: string) => void;
  setAdmin: (isAdmin: boolean) => void;
  logout: () => void;
}

export const useUserStore = create(persist<State & Actions>(
  (set) => ({
    user: {},
    token: "",
    isAdmin: false,
    isAuth: false,
    setUser: (user: any) => set((state) => ({
      user
    })),
    setToken: (token: string) => set((state) => ({
      token,
      isAuth: true
    })),
    setAdmin: (isAdmin: boolean) => set((state) => ({
      isAdmin
    })),
    logout: ()=> set(state=>({
      token:"",
      isAuth:false,
      user:{}
    }))
  }), {
    name: "user",
    storage: createJSONStorage(() => sessionStorage)
  }
));
