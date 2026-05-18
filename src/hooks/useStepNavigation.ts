import { useEffect } from "react";

export function useStepNavigation(args: {
  total: number;
  current: number;
  setCurrent: (i: number) => void;
}) {
  const { total, current, setCurrent } = args;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Don't intercept while typing in inputs
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (current < total - 1) setCurrent(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (current > 0) setCurrent(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrent(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrent(total - 1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, current, setCurrent]);
}
