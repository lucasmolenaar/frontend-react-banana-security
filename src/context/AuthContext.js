import React, {createContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null
    });
    const history = useHistory();

    const login = (jwt) => {
        console.log('Encoded token: ' , jwt);

        localStorage.setItem('token', jwt)

        const decodedToken = jwt_decode(jwt);

        console.log('Decoded token: ', decodedToken);


        setAuth({
            ...auth,
            user: {
              email: decodedToken.email,
              id: decodedToken.sub
            },
            isAuth: true,
        });
        console.log('user email: ', auth.user.email)
        console.log('Gebruiker is ingelogd');
        history.push('/profile');
    }

    const logout = () => {
        localStorage.clear();

        setAuth({
            ...auth,
            user: null,
            isAuth: false
        });
        console.log('Gebruiker is uitgelogd');
        history.push('/')
    }

    const data = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={ data }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;