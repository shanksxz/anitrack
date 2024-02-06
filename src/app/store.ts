import { create } from 'zustand'
import { storeState } from '../types'
import { MediaType } from '../types/index.ts'


const useStore = create<storeState>((set) => ({
    animeId: 0,
    accessToken: localStorage.getItem('accessToken') || '',
    mediaType : localStorage.getItem('mediaType') as MediaType,
    setMediaType : (type) => set(() => ({mediaType : type})),
    setAnimeId: (id) => set(() => ({ animeId: id })),
    setAccessToken: (token) => set(() => ({ accessToken: token })),
}))


type uiState = {
    currentTab: string,
    setCurrentTab: (tab: string) => void
}


const currentUI = create<uiState>((set) => ({
    currentTab: localStorage.getItem('defaultTab') || 'SETTINGS',
    setCurrentTab: (tab) => set(() => ({ currentTab: tab })),
}))


type userState = {
    userId : number,
    userName : string,
    setUserId : (id : number) => void,
    setUserName : (name : string) => void
}

const useUserStore = create<userState>((set) => ({
    userId : JSON.parse(localStorage.getItem('userDetail') || '{}').Viewer?.id || 0,
    userName : JSON.parse(localStorage.getItem('userDetail') || '{}').Viewer?.name || '',
    setUserId : (id) => set(() => ({userId : id})),
    setUserName : (name) => set(() => ({userName : name}))
}))

export { useStore, currentUI, useUserStore }