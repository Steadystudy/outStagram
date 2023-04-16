import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
      return () => clearTimeout(handler);
    }, delay);
  }, [value, delay]);

  return debounced;
}
