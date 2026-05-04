import { create } from "zustand";

interface ModalState {
  closeAll: () => void;
  isSearchOpen: boolean;
  isSignInOpen: boolean;
  openSearch: () => void;

  openSignIn: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  closeAll: () =>
    set({
      isSearchOpen: false,
      isSignInOpen: false,
    }),
  isSearchOpen: false,
  isSignInOpen: false,

  openSearch: () =>
    set({
      isSearchOpen: true,
      isSignInOpen: false,
    }),

  openSignIn: () =>
    set({
      isSearchOpen: false,
      isSignInOpen: true,
    }),
}));
