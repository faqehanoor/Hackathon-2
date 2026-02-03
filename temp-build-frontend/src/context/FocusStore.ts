'use client';

import { create } from 'zustand';

interface FocusState {
  focusedCardId: string | null;
  setFocus: (id: string | null) => void;
  clearFocus: () => void;
}

export const useFocusStore = create<FocusState>((set) => ({
  focusedCardId: null,
  setFocus: (id) => set({ focusedCardId: id }),
  clearFocus: () => set({ focusedCardId: null }),
}));
