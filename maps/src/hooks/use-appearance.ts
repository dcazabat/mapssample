import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark';

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const storedAppearance = window.localStorage.getItem('theme');

    if (storedAppearance === 'light' || storedAppearance === 'dark') {
      return storedAppearance;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.toggle('dark', appearance === 'dark');
    body.classList.toggle('dark', appearance === 'dark');
    window.localStorage.setItem('theme', appearance);
  }, [appearance]);

  return {
    appearance,
    updateAppearance: setAppearance,
  };
}