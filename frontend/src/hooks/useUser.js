import {useState} from "react";

export default function useUser() {
    const [name, setName] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    return {
        name,
        isAuth,
        setName: (name) => {
            localStorage.setItem('username', name);
            setName(name);
        },
        setIsAuth
    }
}