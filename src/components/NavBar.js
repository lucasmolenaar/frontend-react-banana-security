import React, { useContext } from 'react';
import logo from '../assets/banana-01.png';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const history = useHistory();
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      {
        !auth.isAuth ?
            <div>
              <button
                  type="button"
                  onClick={() => history.push('/signin')}
              >
                Log in
              </button>
              <button
                  type="button"
                  onClick={() => history.push('/signup')}
              >
                Registreren
              </button>
            </div>
            :
            <div>
              <button
                  type="button"
                  onClick={logout}
              >
                Log uit
              </button>
            </div>
      }

    </nav>
  );
}

export default NavBar;