import { useEffect, useState } from "react";

// Persists a set of completed ids (e.g. training/meal-plan days) to localStorage.
export function useChecklist(storageKey: string, ids: string[]) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([...checked]));
    } catch {
      // localStorage unavailable (e.g. private browsing) — progress just won't persist.
    }
  }, [storageKey, checked]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completedCount = ids.filter((id) => checked.has(id)).length;

  return { checked, toggle, completedCount, total: ids.length };
}
