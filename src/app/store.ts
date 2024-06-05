//TODO: integrate chrome api in production
import { create } from "zustand";


const useStore = create<storeState>((set) => {
  const initialState = {
    accessToken: localStorage.getItem("accessToken") || "",
    setAccessToken: (token: string) => set(() => ({ accessToken: token })),
  };

  return initialState;
});


const currentUI = create<uiState>((set) => {
  const defaultTab = localStorage.getItem("defaultTab") || "SETTINGS";

  const initialState = {
    currentTab: defaultTab,
    setCurrentTab: (tab: string) => set(() => ({ currentTab: tab })),
  };

  return initialState;
});


const useUserStore = create<userDetail>((set) => {
  const userDetail = JSON.parse(localStorage.getItem("userDetail") || "{}").Viewer || {};

  const initialState = {
    user: {
      id: userDetail.id || 0,
      name: userDetail.name || "",
    },
    setUser: (user: {id: number, name: string}) => set(() => ({ user })),
  };

  return initialState;
});

export { useStore, currentUI, useUserStore };
