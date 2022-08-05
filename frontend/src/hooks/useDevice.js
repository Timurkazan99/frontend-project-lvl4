import { useState } from 'react';

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(false);

  return {
    isMobile,
    setIsMobile,
  };
}
