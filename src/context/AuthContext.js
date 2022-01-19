import React, {createContext, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import checkTokenExpiration from "../helpers/checkTokenExpiration";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    // ** STATE AND OTHER VARIABLES **
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    // ** PERSIST ON REFRESH **
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        console.log('Decoded na refresh: ', decodedToken)

        if (token && checkTokenExpiration(decodedToken.exp)) {
            const fetchUserData = async () => {
                try {
                    const result = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    console.log(result.data);

                    // ** PLACE INFORMATION IN STATE **
                    setAuth({
                        ...auth,
                        isAuth: true,
                        status: 'done',
                        user: {
                            username: result.data.username,
                            email: result.data.email,
                            id: result.data.id
                        }
                    });
                } catch (e) {
                    console.error(e.response);
                    setAuth({
                       ...auth,
                       isAuth: false,
                       status: 'done',
                       user: null,
                    });
                }
            }

            fetchUserData();
        } else {
            console.log('Token has expired, please log in')

            setAuth({
                ...auth,
                status: 'done',
                user: null
            });
        }

    }, [])

    // ** LOGIN FUNCTION **
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

    // ** LOGOUT FUNCTION **
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

    // ** CONTEXT DATA **
    const data = {
        auth: auth,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={ data }>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

// STAPPENPLAN PERSIST ON REFRESH
// - [ ] Check of er een token in de local storage staat
// - [ ] BONUS: Schrijf een functie die checkt of de token nog geldig is:
//    - [ ] Decode de token en haal daar de expiratiedatum (UNIX timestamp) uit
//    - [ ] Maak een "nu" punt in JavaScript
//    - [ ] Zet deze JavaScript timestamp om naar een UNIX timestamp
//    - [ ] Trek deze data van elkaar af om te bepalen of de token nog geldig is
//    - [ ] Token nog geldig? Return true. Niet meer geldig? Return false.
// - [ ] Wanneer blijkt dat de token geldig is, halen we de gebruikersdata opnieuw op:
//    - [ ] Roep de bestaande functie fetchUserData aan en geef de token en id hieraan mee
//    - [ ] In die functie hebben we al geïmplementeerd dat de status op done komt te staan
// - [ ] Geen gebruikersdata en ook geen geldige token? Dan zetten de we status op 'done'
// - [ ] Puntjes op de i: onze functie is een helper-functie, dus die mag naar een apart mapje!