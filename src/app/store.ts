import { create } from "zustand";
import browser from "webextension-polyfill";

const getStorageData = async (key: string, defaultValue: any) => {
  try {
    const result = await browser.storage.local.get(key);
    return result[key] ?? defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from storage:`, error);
    return defaultValue;
  }
};

const setStorageData = async (key: string, value: any) => {
  try {
    await browser.storage.local.set({ [key]: value });
  } catch (error) {
    console.error(`Error setting ${key} in storage:`, error);
  }
};

interface StoreState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

interface UIState {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

interface UserDetail {
  user: { id: number; name: string };
  setUser: (user: { id: number; name: string }) => void;
}

// Stores
const createStore = create<StoreState>((set) => ({
  accessToken: "",
  setAccessToken: async (token: string) => {
    await setStorageData("accessToken", token);
    set({ accessToken: token });
  },
}));

const createUIStore = create<UIState>((set) => ({
  currentTab: "SETTINGS",
  setCurrentTab: async (tab: string) => {
    await setStorageData("defaultTab", tab);
    set({ currentTab: tab });
  },
}));

const createUserStore = create<UserDetail>((set) => ({
  user: { id: 0, name: "" },
  setUser: async (user: { id: number; name: string }) => {
    await setStorageData("userDetail", JSON.stringify({ Viewer: user }));
    set({ user });
  },
}));

const initializeStores = async () => {
  const accessToken = await getStorageData("accessToken", "");
  const defaultTab = await getStorageData("defaultTab", "SETTINGS");
  const userDetailString = await getStorageData("userDetail", "{}");
  const userDetail = JSON.parse(userDetailString).Viewer || {};

  createStore.setState({ accessToken });
  createUIStore.setState({ currentTab: defaultTab });
  createUserStore.setState({ user: { id: userDetail.id || 0, name: userDetail.name || "" } });
};

// Call this function when your app starts
initializeStores();

export const useStore = createStore;
export const currentUI = createUIStore;
export const useUserStore = createUserStore;