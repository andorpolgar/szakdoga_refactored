import { create } from "zustand";
import { getMySaveResumeSummary } from "../api/savesApi";

const ACTIVE_SAVE_KEY = "activeSaveId";

export const useGameStore = create((set, get) => ({
  activeSaveId: localStorage.getItem(ACTIVE_SAVE_KEY) || null,
  activeSaveSummary: null,

  setActiveSave: async (saveId) => {
    localStorage.setItem(ACTIVE_SAVE_KEY, saveId);
    set({ activeSaveId: saveId });

    try {
      const summary = await getMySaveResumeSummary(saveId);
      set({ activeSaveSummary: summary });
    } catch {
      set({ activeSaveSummary: null });
    }
  },

  clearActiveSave: () => {
    localStorage.removeItem(ACTIVE_SAVE_KEY);
    set({
      activeSaveId: null,
      activeSaveSummary: null,
    });
  },

  loadActiveSaveSummary: async () => {
    const saveId = get().activeSaveId;
    if (!saveId) return null;

    const summary = await getMySaveResumeSummary(saveId);
    set({ activeSaveSummary: summary });
    return summary;
  },
}));