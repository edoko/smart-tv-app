import { create } from 'zustand'

interface SideBarState {
  isOpenSideBar: boolean
  isOpenPage: boolean
  selected: number
  open: () => void
  close: () => void
  selectMenu: (id: number) => void
}

export const useSideBarStore = create<SideBarState>((set) => ({
  isOpenSideBar: false,
  isOpenPage: true,
  selected: 0,
  open: () => set(() => ({ isOpenSideBar: true, isOpenPage: false })),
  close: () => set(() => ({ isOpenSideBar: false, isOpenPage: true })),
  selectMenu: (id: number) => set(() => ({ selected: id })),
}))
