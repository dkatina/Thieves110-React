import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import AuthState from "./AuthState";
import { AppContext } from "../context/AppContext";


export default function Nav(){
    const {favPoke} = useContext(AppContext)

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pokemon">
                    Pokemon
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">
                    Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/test">
                    Functional Component
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/champions">
                    League Champions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Register
                  </Link>
                </li>
              <li className="nav-item">
                <AuthState/>
              </li>
            </ul>
          </div>
          <div>
            {favPoke ? 
            <p>My fav Champ is {favPoke}</p>: <></>
              }
          </div>

        </nav>
      </div>
    );
}
