import React, {createContext, useState} from 'react';
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    const signIn = () => {
        toggleIsAuth(true);
        console.log('Gebruiker is ingelogd');
        history.push('/profile');
    }

    const signOut = () => {
        toggleIsAuth(false);
        console.log('Gebruiker is uitgelogd');
        history.push('/')
    }

    const data = {
        isAuth: isAuth,
        signIn: signIn,
        signOut: signOut,
    };

    return (
        <AuthContext.Provider value={ data }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;