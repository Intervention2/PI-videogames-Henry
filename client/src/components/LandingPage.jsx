import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <h1 className="titulolp">Proyecto individual de Henry</h1>
      <Link to="/home">
        <button className="enterbtn" name="hola">
          Ingresar
        </button>
      </Link>
    </div>
  );
}
