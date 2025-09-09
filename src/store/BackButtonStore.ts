import { create } from 'zustand';

type BackButtonStore = {
  actions: (() => void)[];
  addAction: (action: () => void) => void;
  removeAction: (action: () => void) => void;
  popAction: () => void;
};

export const useBackButtonStore = create<BackButtonStore>((set) => ({
  actions: [],
  addAction: (action) =>
    set((state) => ({ actions: [...state.actions, action] })),
  removeAction: (action) =>
    set((state) => ({ actions: state.actions.filter((a) => a !== action) })),
  popAction: () =>
    set((state) => ({ actions: state.actions.slice(0, -1) })),
}));
