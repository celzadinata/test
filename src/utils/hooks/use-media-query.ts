"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update state with current match
    const updateMatches = () => {
      setMatches(media.matches);
    };

    // Initial check
    updateMatches();

    // Add listener with debounce
    const debouncedUpdate = debounce(updateMatches, 100);
    media.addEventListener("change", debouncedUpdate);

    // Clean up
    return () => {
      media.removeEventListener("change", debouncedUpdate);
    };
  }, [query]);

  return matches;
}

// Simple debounce function
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
