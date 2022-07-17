import { useState } from 'react';

export default function useUser() {
  const [name, setName] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  return {
    name,
    isAuth,
    setName: (newName) => {
      localStorage.setItem('username', newName);
      setName(newName);
    },
    setIsAuth,
  };
}
