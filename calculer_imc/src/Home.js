import React, { useState } from "react";

const Home = () => {
  let reponse = [
    {
      start: 1,
      end: 18.5,
      value: "Insuffisance pondérale (maigreur)",
    },
    {
      start: 18.5,
      end: 25,
      value: "Corpulence normale",
    },
    {
      start: 25,
      end: 30,
      value: "Surpoids",
    },
    {
      start: 30,
      end: 35,
      value: "Obésité modérée",
    },
    {
      start: 35,
      end: 40,
      value: "Obésité sévère",
    },
    {
      start: 40,
      end: 10000,
      value: "Obésité morbide ou massive",
    },
  ];
  const [taille, setTaille] = useState("");
  const [poids, setPoids] = useState("");
  const [valeur, setValeur] = useState(0);
  const [apreciation, setApreciation] = useState("En attente de resultat");

  const HandeleCalculer = (e) => {
    e.preventDefault();
    if (taille && poids) {
      let tailleEnMettre = taille / 100;
      let imc = poids / (tailleEnMettre * tailleEnMettre);
      setValeur(imc);
      for (let i = 0; i < reponse.length; i++) {
        let start = reponse[i].start;
        let end = reponse[i].end;
        if (imc >= start && imc < end) {
          let analyse = reponse[i].value;
          setApreciation(analyse);
        }
      }
    }
  };
  return (
    <div className="imc">
      <h2>Calcul IMC</h2>
      <form className="form" onSubmit={HandeleCalculer}>
        <div className="form-groupe">
          <li>
            <label htmlFor="taille">Entert votre Taille en Cm</label>
          </li>
          <li>
            <input
              type="number"
              id="title"
              value={taille}
              className="form-control"
              required
              onChange={(event) => {
                setTaille(event.target.value);
              }}
            />
          </li>
        </div>
        <div className="form-groupe">
          <li>
            <label htmlFor="poids">Entert votre Poids en Kg</label>
          </li>

          <li>
            <input
              type="number"
              id="poids"
              value={poids}
              className="form-control"
              required
              onChange={(event) => {
                setPoids(event.target.value);
              }}
            />
          </li>
        </div>

        <button type="submit" className="btn-calculer">
          Calculer IMC
        </button>

        <div className="resultat">
          <div className="valeur">
            <p>{valeur.toFixed(0)}</p>
          </div>
          <div className="appreciation">
            <p>{apreciation}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
