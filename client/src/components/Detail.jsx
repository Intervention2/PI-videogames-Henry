import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../actions";

export default function Details(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const vgDetail = useSelector((state) => state.videogameDetails);
  console.log(vgDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [dispatch]);
  console.log(vgDetail);

  return (
    <div className="detalless">
      <div className="iniciobtn">
        <Link to="/home">
          <button className="homebutton">Volver al inicio</button>
        </Link>
      </div>

      <div className="header">
        <h2>{vgDetail.name}</h2>
        <div className="genress">
          {vgDetail.createdInDb
            ? vgDetail.Genres?.map((el) => <h3>{el.name}</h3>)
            : vgDetail.genres?.map((el) => <h3>{el.name}</h3>)}
        </div>
      </div>

      <div className="lel">
        <div className="lasplataformas">
          {vgDetail.createdInDb
            ? vgDetail.platforms?.map((el) => <h5>{el}</h5>)
            : vgDetail.platforms?.map((el) => <h5>{el.platform.name}</h5>)}
        </div>
      </div>
      <div className="cajas">
        <div className="texto">
          <div dangerouslySetInnerHTML={{ __html: vgDetail.description }} />
        </div>
        <div className="imagenes">
          {vgDetail.createdInDb ? (
            <img src={vgDetail.img} width="500px" height="300px" />
          ) : (
            <img src={vgDetail.background_image} width="500px" height="300px" />
          )}
          <div>
            <h1>Puntuación: {vgDetail.rating}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
