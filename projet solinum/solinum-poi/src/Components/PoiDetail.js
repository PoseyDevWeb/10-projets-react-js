import React, { useEffect, useState } from "react";

import { Link, redirect } from "react-router-dom";

const PoiDetail = (props) => {
  let url = `http://localhost:8000/POI/${props.value}`;
  const [Poi, setPoi] = useState([]);
  const [Delete, setDelete] = useState();
  const [show, setShow] = useState(true);

  const getDetailPoi = () => {
    fetch(url)
      .then((responses) => responses.json())
      .then((data) => {
        setPoi(data);
      });
  };

  const HandeleDelete = () => {
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      console.log("suprimé avec succé");
      setDelete(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    });
  };
  useEffect(() => {
    getDetailPoi();
  }, [url]);

  if (!show) {
    return (window.location = "/");
  }
  return (
    <div>
      {Poi.id && !Delete && (
        <div className="vrai">
          <h4>Detail du point d'interet numero : {Poi.id}</h4>
          <br />
          <br />
          <div>
            <p className="label">
              Nom = <b>{Poi.nom}</b>{" "}
            </p>
            <p className="label">
              Email = <b>{Poi.email}</b>
            </p>
            <p className="label">
              Adresse = <b>{Poi.adresse.slice(0, Poi.adresse.length - 32)}</b>
            </p>
            <p className="label">
              Nom = <b>{Poi.nom}</b>
            </p>
            <p className="label">
              Nom = <b>{Poi.nom}</b>
            </p>
            <p className="label">
              Statut = <b>{Poi.statut}</b>
            </p>
            <p className="label">
              Type du POI = <b>{Poi.typePoi}</b>
            </p>
          </div>
          <div className="btn-detail">
            <Link
              to={`/modifier/${Poi.id}`}
              className="btn btn-primary"
              id="edit"
            >
              Modifier
            </Link>
            <Link
              to="/"
              className="btn btn-primary"
              id="delete"
              onClick={HandeleDelete}
            >
              Supprimer
            </Link>
          </div>
        </div>
      )}
      {!Poi.id && !Delete && (
        <div className="faux">
          <h1>Cliquez pour voir les details</h1>
        </div>
      )}
      {Delete && show && (
        <div className="faux">
          <h1>POI suprimé avec succé</h1>
        </div>
      )}
    </div>
  );
};

export default PoiDetail;
