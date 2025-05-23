import { Account } from '@/types/types';
import { create } from 'zustand';

type AppState = {
  user: Account | null;
  setUser: (user: Account | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
